// SPDX-License-Identifier: MIT
pragma solidity >=0.7.4;

import "./../_ERCs/ERC1155.sol";
import "../utils/Strings.sol";
import "./CardNFTAccessControls.sol";

contract CardNFT is ERC1155 {
    // last token ID
    uint256 private _currentTokenID;
    // Mapping from NFT token ID to owner
    mapping (uint256 => address) private _tokenOwner;
    mapping (uint256 => uint256) private _tokenSupply;

    // nft contract name
    string public symbol;
    // nft contract symbol
    string public name;

    // Base URI
    string private baseURI = "https://armencardnft.com/";

    /// @dev Required to govern who can call certain functions
    CardNFTAccessControls public accessControls;

    // @notice event emitted when token is minted
    // event CardNFTMinted(
    // );

    /**
     @notice Constructor
     @param _baseURI Base URI for CardNFT
    */
    constructor(
        string memory _name,
        string memory _symbol,
        string memory _baseURI,
        CardNFTAccessControls _accessControls
    ) ERC1155(_baseURI) {
        baseURI = _baseURI;
        name = _name;
        symbol = _symbol;
        accessControls = _accessControls;
    }

    /**
     @notice change name of nft
     @dev only NFT owner can change name
     @param _name name string
    */
    function changeName(string memory _name) public {
        require(accessControls.hasAdminRole(_msgSender()), "Sender must have Admin role");
        name = _name;
    }

    /**
     @notice change symbol of nft
     @dev only NFT owner can change symbole
     @param _symbol symbol string
     */
    function changeSymbol(string memory _symbol) public {
        require(accessControls.hasAdminRole(_msgSender()), "Sender must have Admin role");
        symbol = _symbol;
    }

    /**
     @notice get uri of NFT by id
     @param _id id of NFT
     */
    function uri(uint256 _id) public override view returns(string memory) {
        return Strings.strConcat(baseURI, Strings.uint2str(_id), ".json");
    }

    /**
     @notice get amount of token by id
     @param _id id of NFT
     */
    function tokenSupply(uint256 _id) public view returns(uint256) {
        return _tokenSupply[_id];
    }

    /**
     @notice Set token URI
     @dev Only NFT owner can set URI to the token
     @param _tokenUri URI for the token being minted
     */
    function setTokenUri(string memory _tokenUri) internal {
        require(
            accessControls.hasAdminRole(_msgSender()) || accessControls.hasMinterRole(_msgSender()),
            "Sender must have the admin or smart contract role"
        );
        _setURI(_tokenUri);
    }

    /**
     @notice Checks that the URI is not empty and the post creator is a real address
     @param _beneficiary Address supplied on minting
     */
    function _assertMintingParamsValid(address _beneficiary) pure internal {
        require(_beneficiary != address(0), "Address can't be zero");
    }

    /**
     @notice Mints a CardNFT
     @dev Only NFT owner can set URI to the token
     @param _beneficiary Recipient of the NFT
     @param _data additional data of mint
     @return id of NFT
     */
    function mint(address _beneficiary, bytes memory _data) external returns (uint256 id) {
        require(
            accessControls.hasAdminRole(_msgSender()) || accessControls.hasMinterRole(_msgSender()),
            "Sender must have the admin or smart contract role"
        );
        // Valid args
        _assertMintingParamsValid(_beneficiary);
        uint256 _id = _getNextTokenID();
        _incrementTokenId();
        _mint(_beneficiary, _id, 1, _data);
        _tokenSupply[_id] = 1;
        return _id;
    }

    /**
     @notice Mints multiple CardNFT
     @dev Only NFT owner can set URI to the token
     @param _beneficiary Recipient of the NFT
     @param _amount amount of NFT to mint
     @param _data additional data of mint
     @return ids ids of mint
     */
    function batchMint(address _beneficiary, uint256 _amount, bytes memory _data) external returns (uint256[] memory ids) {
        require(
            accessControls.hasAdminRole(_msgSender()) || accessControls.hasMinterRole(_msgSender()),
            "Sender must have the admin or smart contract role"
        );
        _assertMintingParamsValid(_beneficiary);
        
        uint256[] memory _ids = new uint256[](_amount);
        uint256[] memory _amounts = new uint256[](_amount);
        for (uint256 i = 0; i < _amount; i++) {
            uint256 _id = _getNextTokenID();
            _incrementTokenId();
            _ids[i] = _id;
            _amounts[i] = 1;
            _tokenSupply[_id] = 1;
        }
        _mintBatch(_beneficiary, _ids, _amounts, _data);
        return _ids;
    }

    /**
        * Burn token
        * Only NFT owner can burn
    */
    function burn(address _account, uint256 _id) external {
        require(
            accessControls.hasAdminRole(_msgSender()) || accessControls.hasMinterRole(_msgSender()),
            "Sender must have the admin or smart contract role"
        );

        uint256 balance = balanceOf(_account, _id);
        require(
            balance > 0,
            "Sender is not owner of NFT"
        );

        _burn(_account, _id, 1);
    }

    /**
        @notice Method burn batch cards - Only NFT owner can burn
     */
    function batchBurn(address _account, uint256[] memory _ids, uint256[] memory _amounts) external {
        require(
            accessControls.hasAdminRole(_msgSender()) || accessControls.hasMinterRole(_msgSender()),
            "Sender must have the admin or smart contract role"
        );
        require(_ids.length == _amounts.length, "NFT.batchBurn: index and amounts must have same length");
        
        for(uint256 i=0; i<_ids.length; i++) {
            uint256 balance = balanceOf(_account, _ids[i]);
            require(
                balance > 0,
                "Sender is not owner of NFT"
            );
        }

        _burnBatch(_account, _ids, _amounts);
    }

    /**
     @notice Method for updating the access controls contract used by the NFT
     @dev Only admin
     @param _accessControls Address of the new access controls contract
     */
    function updateAccessControls(CardNFTAccessControls _accessControls) external {
        require(accessControls.hasAdminRole(_msgSender()), "CardNFT.updateAccessControls: Sender must be admin");
        accessControls = _accessControls;
    }

    /**
     @notice get next token id
     */
    function _getNextTokenID() private view returns(uint256) {
        return _currentTokenID + 1;
    }

    /**
     @notice increase current token id
     */
    function _incrementTokenId() private {
        _currentTokenID ++;
    }
}