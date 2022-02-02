//SPDX-License-Identifier: Unlicense
pragma solidity >=0.7.4;

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
import "../utils/Context.sol";
import "../utils/ReentrancyGuard.sol";
import "../utils/Address.sol";
import "../utils/SafeMath.sol";
import "../NFT/CardNFTAccessControls.sol";
import "../NFT/CardNFT.sol";

/**
 * @notice Factory contract for NFT handling payments on mint
 */
contract NFTFactory is Context, ReentrancyGuard, VRFConsumerBase {
  // using SafeMath for uint256;
  using Address for address payable;

  struct CardInfo {
    uint256 card;
    uint256 suit;
    uint256 value;
    uint256 qty;
  }

  struct NFTInfo {
    uint256 serial;
    uint256 cardInfoId;
    uint256 styleId;
    uint256 edition;
    uint256 status;
  }

  struct RequestNFTConfig {
    uint256 limit;
    bool kind;
    uint256 id;
    uint256 styleId;
  }

  struct ExchangeOption {
    int32[] rank;
    uint256 putCards;
    uint256 payout;
    uint256 efficiency;
  }

  event NFTCreated(
    uint256 id,
    uint256 card,
    string suit,
    uint256 serial,
    uint256 style,
    uint256 edition
  );

  event NFTDeleted(
    uint256 id,
    address burner,
    uint256 deletedAt
  );

  event CardUpgraded(
    uint256[] originals,
    uint256 newId,
    uint256 serial,
    uint256 card,
    string suit,
    uint256 style,
    uint256 edition
  );

  event RandomReturned(
    bytes32 requestId,
    uint256 randomness
  );

  /// @notice chainlink rng request value mapping
  mapping(bytes32 => RequestNFTConfig) private requestIds;

  /// @notice mapping for edition number
  mapping(uint256 => mapping(uint256 => uint256)) private serialMapping;

  /// @notice mapping for style
  mapping(uint256 => mapping(uint256 => mapping(uint256 => uint256))) private editionMapping;

  /// @notice mapping for const card suits
  mapping(uint256 => string) public SUITS;

  /// @notice mapping for exchange options
  mapping(uint256 => ExchangeOption) public exchangeOptions;

  /// @notice for switching off factory functionality
  bool public isPaused;

  /// @notice responsible for enforcing mint and admin role
  CardNFTAccessControls accessControls;

  /// @notice NFT contract
  CardNFT cardNFT;

  /// @notice platform  fee recipient address which will accept all fees and mint price
  address payable platformFeeRecipient;

  /// @notice keyhash for chainlink rng generator
  bytes32 internal keyHash;

  /// @notice fee for chainlink rng generator
  uint256 internal rngFee;

  /// @notice rng generator result
  uint256 public randomResult;

  /// @notice deck card information for calculation
  mapping(uint256 => CardInfo) deckInfo;

  /// @notice nft array
  mapping(uint256 => NFTInfo) nfts;

  modifier whenNotPaused() {
    require(!isPaused, "Function is currently paused");
    _;
  }

  constructor(
    CardNFTAccessControls _accessControls,
    CardNFT _cardNFT,
    address payable _platformFeeRecipient
  ) VRFConsumerBase(
    0xa555fC018435bef5A13C6c6870a9d4C11DEC329C,
    0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06
  ) {
    require(address(_accessControls) != address(0), "NFTFactory: Invalid Access Controls");
    require(address(_cardNFT) != address(0), "NFTFactory: Invalid NFT");
    require(_platformFeeRecipient != address(0), "NFTFactory: Invalid platform Fee recipient");
    
    accessControls = _accessControls;
    cardNFT = _cardNFT;
    platformFeeRecipient = _platformFeeRecipient;
    keyHash = 0xcaf3c3727e033261d383b315559476f48034c13b18f8cafed4d871abe5049186;
    rngFee = 0.1 * 10 ** 18; // 0.1 LINK

    /// @notice init suits const mapping
    SUITS[0] = "c";
    SUITS[1] = "s";
    SUITS[2] = "d";
    SUITS[3] = "h";

    generateCardInfos();
    initiateExchangeOptions();
  }
  
  /**
    @notice get nft info by id
    @param _id nft id
   */
  function getNFTInfo(uint256 _id) public view returns(uint256 id, uint256 card, string memory suit, uint256 serial, uint256 style, uint256 edition) {
    NFTInfo storage nft = nfts[_id];
    if(nft.cardInfoId < 8) {
      return (0, 0, "0", 0, 0, 0);
    }
    require(nft.cardInfoId >= 8, "NFT doesn't exist on this id");
    CardInfo storage cardNft = deckInfo[nft.cardInfoId];

    return (_id, cardNft.card, SUITS[cardNft.suit], nft.serial, nft.styleId, nft.edition);
  }

  /**
    @notice create one NFT
    @param _limit min or maximum number of card
    @param _kind limit kind with lower or higher
    @param _price price of NFT mint
    @param _amount amount of NFTs to mint
    @param _style style of nft
    @param _data additional data to leave
   */
  function create(uint256 _limit, bool _kind, uint256 _price, uint256 _amount, uint256 _style, bytes memory _data) external payable nonReentrant whenNotPaused {
    require(_msgSender().isContract() == false, "Factory.create: No contracts are permitted");
    require(_msgSender() != address(0), "Factory.create: sender address is ZERO");
    uint256 buyPrice = msg.value;
    require(buyPrice >= _price, "Factory.create: payment should be same to original price");

    // (bool platformTransferSuccess,) = platformFeeRecipient.call{value : buyPrice}("");
    // require(platformTransferSuccess, "Factory.mintPayment: Failed to send platform fee");

    address creator = _msgSender();
    if(_amount > 1) {
      uint256[] memory _ids = cardNFT.batchMint(creator, _amount, _data);
      require(_amount == _ids.length, "Factory.create: should batch mint same amount of nfts");
      for(uint256 i=0; i<_ids.length; i++) {
        getRandomNumber(_ids[i], _limit, _kind, _style);
      }
    } else {
      uint256 id = cardNFT.mint(creator, _data);
      getRandomNumber(id, _limit, _kind, _style);
    }
  }

  /**
    @notice burn card
    @param _id id of card nft
   */
  function burnCards(uint256 _id) external whenNotPaused {
    require(_msgSender().isContract() == false, "Factory.create: No contracts are permitted");
    require(_msgSender() != address(0), "Factory.create: sender address is ZERO");

    address burner = _msgSender();
    cardNFT.burn(burner, _id);

    nfts[_id].status = 1;

    uint256 deletedAt = _getNow();
    emit NFTDeleted(_id, burner, deletedAt);
  }

  /**
    @notice get edition number for each card/suit
    @param _card card number
    @param _suit suit of nft
   */
  function getSerialNumber(uint256 _card, uint256 _suit) public view returns(uint256) {
    return serialMapping[_card][_suit];
  }

  /**
    @notice upgrade card from multiple cards
    @param _ids ids of cards set
    @param _style style id to get upgraded
   */
  function upgradeCards(uint256[] memory _ids, uint256 _style, bytes memory _data) external whenNotPaused {
    require(_msgSender().isContract() == false, "Factory.create: No contracts are permitted");
    require(_msgSender() != address(0), "Factory.create: sender address is ZERO");
    address creator = _msgSender();
    uint256 totalSumPrize = 0;
    for(uint256 i=0; i<_ids.length; i++) {
      NFTInfo storage nftInfo = nfts[_ids[i]];
      CardInfo storage cardInfo = deckInfo[nftInfo.cardInfoId];
      totalSumPrize += cardInfo.value;
    }
    uint256 newCardInfoId = getNearestValueCard(totalSumPrize);
    uint256 id = cardNFT.mint(creator, _data);
    CardInfo storage newCardInfo = deckInfo[newCardInfoId];

    NFTInfo storage newNFT = nfts[id];
    newNFT.serial = _getNextSerialId(newCardInfo.card, newCardInfo.suit);
    _incrementSerialId(newCardInfo.card, newCardInfo.suit);

    newNFT.cardInfoId = newCardInfoId;
    newNFT.styleId = _style;

    newNFT.edition = _getNextEditionId(newNFT.styleId, newCardInfo.card, newCardInfo.suit);
    _incrementEditionId(newNFT.styleId, newCardInfo.card, newCardInfo.suit);

    for(uint256 i=0; i<_ids.length; i++) {
      nfts[_ids[i]].status = 2;
    }

    emit CardUpgraded(_ids, id, newNFT.serial, newCardInfo.card, SUITS[newCardInfo.suit], newNFT.styleId, newNFT.edition);
  }

  /**
    @notice claim cards
    @param _ids ids of card set
    @param _exchangeId index of exchange options
    @param _data additional data
   */
  function claimCards(uint256[] memory _ids, uint256 _exchangeId, bytes memory _data) external whenNotPaused {
    ExchangeOption storage option = exchangeOptions[_exchangeId];
    require(_ids.length == option.putCards, "Wrong number of cards submitted");
    address sender = _msgSender();
    for(uint256 i=0; i<_ids.length; i++) {
      uint256 _index = _ids[i];
      NFTInfo storage nft = nfts[_index];
      require(nft.cardInfoId == (i + 8), "Card for claim is not on right position");      
    }

    if(option.payout > 0) {
      /// @notice send prize to user
      (bool prizeTransferSuccess,) = sender.call{value : option.payout}("");
      require(prizeTransferSuccess, "Factory.claimCard: Failed to send sender rewards");
    }

    uint256[] memory amounts = new uint256[](_ids.length);
    for(uint256 i=0; i<_ids.length; i++) {
      amounts[i] = 1;
    }
    cardNFT.batchBurn(sender, _ids, amounts);
  }

  /**
    @notice generate actual NFT info
    @param _requestId request id for chainlink rng
    @param _randomness random number which return from chainlink org
   */
  function generateNFTInfo(bytes32 _requestId, uint256 _randomness) private {
    RequestNFTConfig storage config = requestIds[_requestId];
    uint256 total = getTotalQtyToNumber(config.limit);
    bool _kind = config.kind;
    uint256 rngResult = 0;
    if(_kind) {
      rngResult = SafeMath.mod(_randomness, 200000 - total) + total;
    } else {
      rngResult = SafeMath.mod(_randomness, total);
    }
    uint256 cardInfoId = getNearestQtyCard(rngResult);
    NFTInfo storage nft = nfts[config.id];
    nft.cardInfoId = cardInfoId;
    nft.styleId = config.styleId;
    CardInfo storage cardInfo = deckInfo[cardInfoId];
    
    nft.edition = _getNextEditionId(nft.styleId, cardInfo.card, cardInfo.suit);
    _incrementEditionId(nft.styleId, cardInfo.card, cardInfo.suit);

    nft.serial = _getNextSerialId(cardInfo.card, cardInfo.suit);
    _incrementSerialId(cardInfo.card, cardInfo.suit);

    emit NFTCreated(config.id, cardInfo.card, SUITS[cardInfo.suit], nft.edition, nft.styleId, nft.edition);
  }

  /** 
    * Requests randomness 
    */
  function getRandomNumber(uint256 _id, uint256 _limit, bool _kind, uint256 _styleId) private {
    require(LINK.balanceOf(address(this)) >= rngFee, "Not enough LINK - fill contract with faucet");
    bytes32 requestId = requestRandomness(keyHash, rngFee);
    RequestNFTConfig storage config = requestIds[requestId];
    config.id = _id;
    config.kind = _kind;
    config.limit = _limit;
    config.styleId = _styleId;
  }

  /**
    * Callback function used by VRF Coordinator
    */
  function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
    emit RandomReturned(requestId, randomness);
    generateNFTInfo(requestId, randomness);
  }

  /**
    @notice initiate cards information
   */
  function generateCardInfos() internal {
    for(uint256 i=2; i<14; i++) {
      for(uint256 j=0; j<4; j++) {
        CardInfo storage card = deckInfo[i * 4 + j];
        card.card = i;
        card.suit = j;
        if(i == 2) {
          card.value = 0.00001 * 10 ** 18;
          card.qty = 25000;
        } else if(i == 3) {
          card.value = 0.00004 * 10 ** 18;
          card.qty = 15000;
        } else if(i == 4) {
          card.value = 0.00008 * 10 ** 18;
          card.qty = 6250;
        } else if(i == 5) {
          card.value = 0.00016 * 10 ** 18;
          card.qty = 2500;
        } else if(i == 6) {
          card.value = 0.00032 * 10 ** 18;
          card.qty = 750;
        } else if(i == 7) {
          card.value = 0.00064 * 10 ** 18;
          card.qty = 200;
        } else if(i == 8) {
          card.value = 0.00125 * 10 ** 18;
          card.qty = 125;
        } else if(i == 9) {
          card.value = 0.0025 * 10 ** 18;
          card.qty = 90;
        } else if(i == 10) {
          card.value = 0.005 * 10 ** 18;
          card.qty = 55;
        } else if(i == 11) {
          card.value = 0.015 * 10 ** 18;
          card.qty = 15;
        } else if(i == 12) {
          card.value = 0.03 * 10 ** 18;
          card.qty = 8;
        } else if(i == 13) {
          card.value = 0.07 * 10 ** 18;
          card.qty = 4;
        }
      }
    }

    for(uint256 i=0; i<4; i++) {
      CardInfo storage aceCard = deckInfo[56 + i];
      aceCard.card = 1;
      aceCard.suit = i;
      aceCard.value = 0.125 * 10 ** 18;
      aceCard.qty = 2;
    }

    CardInfo storage jokerCard = deckInfo[60];
    jokerCard.card = 14;
    jokerCard.suit = 0;
    jokerCard.qty = 4;
    jokerCard.value = 0.125 * 10 ** 18;
  }

  /**
   */
  function initiateExchangeOptions() internal {
    ExchangeOption storage option0 = exchangeOptions[0];
    option0.rank = [-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,0,0,0,0,0,0,0,0];
    option0.putCards = 24;
    option0.payout = 465000;
    option0.efficiency = 9300;

    ExchangeOption storage option1 = exchangeOptions[1];
    option1.rank = [-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,0,0,0,0,0,0,0];
    option1.putCards = 28;
    option1.payout = 940000;
    option1.efficiency = 9400;

    ExchangeOption storage option2 = exchangeOptions[2];
    option2.rank = [-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,0,0,0,0,0,0,0];
    option2.putCards = 32;
    option2.payout = 1900000;
    option2.efficiency = 9500;

    ExchangeOption storage option3 = exchangeOptions[3];
    option3.rank = [-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,0,0,0,0,0];
    option3.putCards = 36;
    option3.payout = 3840000;
    option3.efficiency = 9600;

    ExchangeOption storage option4 = exchangeOptions[4];
    option4.rank = [-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,0,0,0,0];
    option4.putCards = 40;
    option4.payout = 9700000;
    option4.efficiency = 9700;

    ExchangeOption storage option5 = exchangeOptions[5];
    option5.rank = [-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,0,0,0];
    option5.putCards = 44;
    option5.payout = 21560000;
    option5.efficiency = 9800;


    ExchangeOption storage option6 = exchangeOptions[6];
    option6.rank = [-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,0,0];
    option6.putCards = 48;
    option6.payout = 49500000;
    option6.efficiency = 9900;

    ExchangeOption storage option7 = exchangeOptions[7];
    option7.rank = [-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,0];
    option7.putCards = 52;
    option7.payout = 100000000;
    option7.efficiency = 10000;

    ExchangeOption storage option8 = exchangeOptions[8];
    option8.rank = [-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,-400000000,-100000000];
    option8.putCards = 56;
    option8.payout = 112500000;
    option8.efficiency = 10000;
  }

  /**
    @notice get from rng value to qty card on mint logic
    @param rng rng value
   */
  function getNearestQtyCard(uint256 rng) public view returns (uint256 id) {
    uint256 sum = 0;
    for(uint256 i=8; i<61; i++) {
      uint256 newSum = sum + deckInfo[i].qty;
      if(rng >= sum && rng <= newSum) {
        return i;
      }
      sum = newSum;
    }
  }

  /**
    @notice get card info from rng upgrade logic
    @param rng rng value
   */
  function getNearestValueCard(uint256 rng) public view returns (uint256 id) {
    for(uint256 i=8; i<60; i++) {
      if(deckInfo[i].value <= rng && deckInfo[i + 1].value > rng) {
        return i;
      }
    }
    return 60;
  }

  /**
    @notice get total qty till to specific limit number
    @param limit limit number on mint logic
    @return total
   */
  function getTotalQtyToNumber(uint256 limit) private view returns (uint256 total) {
    if(limit == 1) {
      for(uint256 i=8; i<56; i++) {
        total += deckInfo[i].qty;
      }
    } else if(limit == 14) {
      for(uint256 i=8; i<60; i++) {
        total += deckInfo[i].qty;
      }
    } else {
      for(uint256 i=8; i<(4 * limit); i++) {
        total += deckInfo[i].qty;
      }
    }

    return total;
  }

  /**
    @notice get next serial id
    @param card card number
    @param suit card suit
    */
  function _getNextSerialId(uint256 card, uint256 suit) private view returns(uint256) {
    return serialMapping[card][suit] + 1;
  }

  /**
    @notice increase current serial id
    @param card card number
    @param suit card suit
    */
  function _incrementSerialId(uint256 card, uint256 suit) private {
    serialMapping[card][suit] ++;
  }

  /**
    @notice get next style edition id
    @param styleId style id
    @param card card id
    @param suit suit id
   */
  function _getNextEditionId(uint256 styleId, uint256 card, uint256 suit) internal view returns(uint256) {
    return editionMapping[styleId][card][suit] + 1;
  }

  /**
    @notice increase current edition id
    @param styleId style id
    @param card card id
    @param suit suit id
   */
  function _incrementEditionId(uint256 styleId, uint256 card, uint256 suit) internal {
    editionMapping[styleId][card][suit] ++;
  }

  /**
    @notice get current timestamp
   */
  function _getNow() internal virtual view returns (uint256) {
      return block.timestamp;
  }
}