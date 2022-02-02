class NFTFactory{
	// this smart contract calls ArmenCoin contract 
	
	constructor(ArmenCoin_input){
		this.ArmenCoin_obj=ArmenCoin_input;
		// initially total value equals to zero
		this.total_value=0;
		
		// list of cards and their properties
		this.deck=new Array(54);
		this.deck[0]={name:'Burnt card',qty:0,scarcity:'N/A',value:0.00000000};
		this.deck[1]={name:'2 of Diamonds',qty:25000,scarcity:'Common',value:0.00001000};
		this.deck[2]={name:'2 of Spades',qty:25000,scarcity:'Common',value:0.00001000};
		this.deck[3]={name:'2 of Hearts',qty:25000,scarcity:'Common',value:0.00001000};
		this.deck[4]={name:'2 of Clubs',qty:25000,scarcity:'Common',value:0.00001000};
		this.deck[5]={name:'3 of Diamonds',qty:15000,scarcity:'Uncommon',value:0.00004000};
		this.deck[6]={name:'3 of Spades',qty:15000,scarcity:'Uncommon',value:0.00004000};
		this.deck[7]={name:'3 of Hearts',qty:15000,scarcity:'Uncommon',value:0.00004000};
		this.deck[8]={name:'3 of Clubs',qty:15000,scarcity:'Uncommon',value:0.00004000};
		this.deck[9]={name:'4 of Diamonds',qty:6250,scarcity:'Uncommon',value:0.00008000};
		this.deck[10]={name:'4 of Spades',qty:6250,scarcity:'Uncommon',value:0.00008000};
		this.deck[11]={name:'4 of Hearts',qty:6250,scarcity:'Uncommon',value:0.00008000};
		this.deck[12]={name:'4 of Clubs',qty:6250,scarcity:'Uncommon',value:0.00008000};
		this.deck[13]={name:'5 of Diamonds',qty:2500,scarcity:'Rare',value:0.00016000};
		this.deck[14]={name:'5 of Spades',qty:2500,scarcity:'Rare',value:0.00016000};
		this.deck[15]={name:'5 of Hearts',qty:2500,scarcity:'Rare',value:0.00016000};
		this.deck[16]={name:'5 of Clubs',qty:2500,scarcity:'Rare',value:0.00016000};
		this.deck[17]={name:'6 of Diamonds',qty:750,scarcity:'Rare',value:0.00032000};
		this.deck[18]={name:'6 of Spades',qty:750,scarcity:'Rare',value:0.00032000};
		this.deck[19]={name:'6 of Hearts',qty:750,scarcity:'Rare',value:0.00032000};
		this.deck[20]={name:'6 of Clubs',qty:750,scarcity:'Rare',value:0.00032000};
		this.deck[21]={name:'7 of Diamonds',qty:200,scarcity:'Rare',value:0.00064000};
		this.deck[22]={name:'7 of Spades',qty:200,scarcity:'Rare',value:0.00064000};
		this.deck[23]={name:'7 of Hearts',qty:200,scarcity:'Rare',value:0.00064000};
		this.deck[24]={name:'7 of Clubs',qty:200,scarcity:'Rare',value:0.00064000};
		this.deck[25]={name:'8 of Diamonds',qty:125,scarcity:'Ultra Rare',value:0.00125000};
		this.deck[26]={name:'8 of Spades',qty:125,scarcity:'Ultra Rare',value:0.00125000};
		this.deck[27]={name:'8 of Hearts',qty:125,scarcity:'Ultra Rare',value:0.00125000};
		this.deck[28]={name:'8 of Clubs',qty:125,scarcity:'Ultra Rare',value:0.00125000};
		this.deck[29]={name:'9 of Diamonds',qty:90,scarcity:'Ultra Rare',value:0.00250000};
		this.deck[30]={name:'9 of Spades',qty:90,scarcity:'Ultra Rare',value:0.00250000};
		this.deck[31]={name:'9 of Hearts',qty:90,scarcity:'Ultra Rare',value:0.00250000};
		this.deck[32]={name:'9 of Clubs',qty:90,scarcity:'Ultra Rare',value:0.00250000};
		this.deck[33]={name:'10 of Diamonds',qty:55,scarcity:'Ultra Rare',value:0.00500000};
		this.deck[34]={name:'10 of Spades',qty:55,scarcity:'Ultra Rare',value:0.00500000};
		this.deck[35]={name:'10 of Hearts',qty:55,scarcity:'Ultra Rare',value:0.00500000};
		this.deck[36]={name:'10 of Clubs',qty:55,scarcity:'Ultra Rare',value:0.00500000};
		this.deck[37]={name:'Jack of Diamonds',qty:15,scarcity:'Epic',value:0.01500000};
		this.deck[38]={name:'Jack of Spades',qty:15,scarcity:'Epic',value:0.01500000};
		this.deck[39]={name:'Jack of Hearts',qty:15,scarcity:'Epic',value:0.01500000};
		this.deck[40]={name:'Jack of Clubs',qty:15,scarcity:'Epic',value:0.01500000};
		this.deck[41]={name:'Queen of Diamonds',qty:8,scarcity:'Epic',value:0.03000000};
		this.deck[42]={name:'Queen of Spades',qty:8,scarcity:'Epic',value:0.03000000};
		this.deck[43]={name:'Queen of Hearts',qty:8,scarcity:'Epic',value:0.03000000};
		this.deck[44]={name:'Queen of Clubs',qty:8,scarcity:'Epic',value:0.03000000};
		this.deck[45]={name:'King of Diamonds',qty:4,scarcity:'Epic',value:0.07000000};
		this.deck[46]={name:'King of Spades',qty:4,scarcity:'Epic',value:0.07000000};
		this.deck[47]={name:'King of Hearts',qty:4,scarcity:'Epic',value:0.07000000};
		this.deck[48]={name:'King of Clubs',qty:4,scarcity:'Epic',value:0.07000000};
		this.deck[49]={name:'Ace of Diamonds',qty:2,scarcity:'Legendary',value:0.12500000};
		this.deck[50]={name:'Ace of Spades',qty:2,scarcity:'Legendary',value:0.12500000};
		this.deck[51]={name:'Ace of Hearts',qty:2,scarcity:'Legendary',value:0.12500000};
		this.deck[52]={name:'Ace of Clubs',qty:2,scarcity:'Legendary',value:0.12500000};
		this.deck[53]={name:'Joker',qty:4,scarcity:'Wild',value:0.12500000};
		
		this.JOKER_VALUE=this.deck[53].value;

		let n_card=0; 
		let value_53_cards=0;
		let nft_deck_value=0;
		
		// this is data structure for generating deck
		this.NFT_deck=[];
		
		for(let i=this.deck.length-1;i>=1;i--){
			n_card=n_card+this.deck[i].qty;
			value_53_cards+=this.deck[i].value;
			nft_deck_value+=this.deck[i].value*this.deck[i].qty;
			
			for(let j=0;j<this.deck[i].qty;j++){
				this.NFT_deck.push(i);
			}
			// Number of cards those have index not less than 
			// index of this card
			this.deck[i].NL_qty=n_card;
			// Average value of cards those have index not less than 
			// index of this card
			this.deck[i].NL_value=Math.round(nft_deck_value/n_card*1e8)/1e8;
		}

		// Cost price of card is the expected value of 
		this.CARD_COST_PRICE=Math.round(nft_deck_value/n_card*1e8)/1e8;

		// Total number of cards 
		this.N_CARD=n_card
		// Value of 53 cards 2-A of all suits and Joker
		// (calculated in algorithm below)
		this.VALUE_53_CARDS=value_53_cards
		// Value of whole NFT deck based on number of cards
		this.NFT_DECK_VALUE=nft_deck_value


		// this is main function generating random card
		// with index not less than index
		// allowed number of index if integer value in range 0,52

		// 0 means that ANY card will be generated
		// 52 means that only card with index 52 will be generated 
		// it is actually Joker only. 

		// in practics following indexes should be allowed: 
		// 1,5,9,13,17,21,25,29,33,37
		// it means that player will get card not less than 
		// 2,3,4,5 ,6 ,7 ,8 ,9 ,10,J

		// generates cards from deck depending on purchase option
		// set in index and gives it to player 
		// it also allows to buy multiple cards without price recalculating 
		// (otherwise after every card cost would change)
		
		this.requestPrice=function(index){
				return(this.ArmenCoin_obj.calculateMultiplier(this.total_value)*this.deck[index].NL_value*ArmenCoin_obj.calculate_HEP());
		}
		this.buyCard=function(player,index,count){
			// prevent abusing system buying
			// negative or fractional number of cards
			count=Math.max(0,Math.floor(count)); 
			// basic cards value 
			let cards_value=this.deck[index].NL_value*count;
			if(!(index==1||index==5||index==9||index==13||index==17||index==21||
			index==25||index==29||index==33||index==37)){
				console.log('Wrong index')
				return;
			}
			
			if(ArmenCoin_obj.acceptValue_HP(player,cards_value,this.total_value)){
				for(let ii=0;ii<count;ii++){
					//console.log(ii);
					// generate number of card in NFT deck
					let numb=Math.floor(Math.random()*this.deck[index].NL_qty)
					//index of card to give
					let card_index=this.NFT_deck[numb]
					// give card to player
					player.cards.push(card_index)
					// add minted card to statistics
					this.deck[card_index].minted+=1;
					// add generated card value to total value
					this.total_value+=this.deck[card_index].value
				}
			}else{
				console.log('Purchasing cards by '+player.id+' declined. Not enough funds');
				return;
			}
		}

		// purchasing deck by player.
		// Returns successfulness of purchase
		this.buyDeck=function(player){
			
			// !!! add here additional conditions to buy DROP0
			// cost = value 
			if(ArmenCoin_obj.acceptValue(player,this.VALUE_53_CARDS,this.total_value)){
				for(let i=1;i<this.deck.length;i++){
					//give card to player
					player.cards.push(i);
					// add to statistic of minted card
					this.deck[i].minted+=1;
				}
				this.total_value=this.total_value+this.VALUE_53_CARDS
				//console.log(drop0_cost)
				return true;
			}else{
				console.log('Purchasing DROP0 deck by '+player.id+' declined. Not enough funds');
				return false;
			}
		}
		// This method is necessary for testing only, because after every action giving or burning cards
		// summary value of all cards have to be changed only by it
		this.calcSumCardsValue=function(){
			let result=0
			for(let i=0;i<playerList.length;i++){
				for(let j=0;j<playerList[i].cards.length;j++){
					result+=this.deck[playerList[i].cards[j]].value
				}
			}
			if (Math.abs(this.total_value-result)>1e-8){
				console.log("sumCardsValue test failed")
				console.log("Actual value of cards="+result)
				console.log("this.total_value="+this.total_value)	
			}else{
				//console.log("sumCardsValue test passed")
				//console.log("Actual value of cards="+result)
				//console.log("total_value="+this.total_value)	
			}
			return result;
		}
		/*
		this.onlyUnique=function(value, index, self) {
		  return self.indexOf(value) === index;
		}
*/
		// exchange options

		// exchange options interpretation: 
		// negative values means that player should submit ccards of this rank 
		// positive values means hpw how many cards player should get in exchange (fractional values means random)
		// player should not submit 2 cards with same index

		// ranks sequence [2,3,4,5,6,7,8,9,T,J,Q,K,A,Prize]
		// There is no rank for Jo, because player can't get Jo in exchanges, however he can put Jo instead of any card
		// Putting Jo instead of any card except Ace causes to value lose, which distributed among all players
		this.exchange_option=new Array(44);
		this.exchange_option[0]={rank:[-4,1,0,0,0,0,0,0,0,0,0,0,0,0],put_cards:4,payout:0,efficiency:1}
		this.exchange_option[1]={rank:[-4,-4,2.5,0,0,0,0,0,0,0,0,0,0,0],put_cards:8,payout:0,efficiency:1}
		this.exchange_option[2]={rank:[-4,-4,-4,3.25,0,0,0,0,0,0,0,0,0,0],put_cards:12,payout:0,efficiency:1}
		this.exchange_option[3]={rank:[-4,-4,-4,-4,3.625,0,0,0,0,0,0,0,0,0],put_cards:16,payout:0,efficiency:1}
		this.exchange_option[4]={rank:[-4,-4,-4,-4,-4,3.8125,0,0,0,0,0,0,0,0],put_cards:20,payout:0,efficiency:1}
		this.exchange_option[5]={rank:[-4,-4,-4,-4,-4,-4,4,0,0,0,0,0,0,0],put_cards:24,payout:0,efficiency:1}
		this.exchange_option[6]={rank:[-4,-4,-4,-4,-4,-4,-4,4,0,0,0,0,0,0],put_cards:28,payout:0,efficiency:1}
		this.exchange_option[7]={rank:[-4,-4,-4,-4,-4,-4,-4,-4,4,0,0,0,0,0],put_cards:32,payout:0,efficiency:1}
		this.exchange_option[8]={rank:[-4,-4,-4,-4,-4,-4,-4,-4,-4,2.666666667,0,0,0,0],put_cards:36,payout:0,efficiency:1}
		this.exchange_option[9]={rank:[-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,3.333333333,0,0,0],put_cards:40,payout:0,efficiency:1}
		this.exchange_option[10]={rank:[-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,3.142857143,0,0],put_cards:44,payout:0,efficiency:1}
		this.exchange_option[11]={rank:[-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,4,0],put_cards:48,payout:0,efficiency:1}
		this.exchange_option[12]={rank:[-4,0.09090909091,0.04545454545,0.02272727273,0.01136363636,0.005681818182,0.002909090909,0.001454545455,0.0007272727273,0.0002424242424,0.0001212121212,0.00005194805195,0,0],put_cards:4,payout:0,efficiency:1}
		this.exchange_option[13]={rank:[-4,-4,0.25,0.125,0.0625,0.03125,0.016,0.008,0.004,0.001333333333,0.0006666666667,0.0002857142857,0,0],put_cards:8,payout:0,efficiency:1}
		this.exchange_option[14]={rank:[-4,-4,-4,0.3611111111,0.1805555556,0.09027777778,0.04622222222,0.02311111111,0.01155555556,0.003851851852,0.001925925926,0.0008253968254,0,0],put_cards:12,payout:0,efficiency:1}
		this.exchange_option[15]={rank:[-4,-4,-4,-4,0.453125,0.2265625,0.116,0.058,0.029,0.009666666667,0.004833333333,0.002071428571,0,0],put_cards:16,payout:0,efficiency:1}
		this.exchange_option[16]={rank:[-4,-4,-4,-4,-4,0.5446428571,0.2788571429,0.1394285714,0.06971428571,0.02323809524,0.01161904762,0.004979591837,0,0],put_cards:20,payout:0,efficiency:1}
		this.exchange_option[17]={rank:[-4,-4,-4,-4,-4,-4,0.6666666667,0.3333333333,0.1666666667,0.05555555556,0.02777777778,0.0119047619,0,0],put_cards:24,payout:0,efficiency:1}
		this.exchange_option[18]={rank:[-4,-4,-4,-4,-4,-4,-4,0.8,0.4,0.1333333333,0.06666666667,0.02857142857,0,0],put_cards:28,payout:0,efficiency:1}
		this.exchange_option[19]={rank:[-4,-4,-4,-4,-4,-4,-4,-4,1,0.3333333333,0.1666666667,0.07142857143,0,0],put_cards:32,payout:0,efficiency:1}
		this.exchange_option[20]={rank:[-4,-4,-4,-4,-4,-4,-4,-4,-4,0.8888888889,0.4444444444,0.1904761905,0,0],put_cards:36,payout:0,efficiency:1}
		this.exchange_option[21]={rank:[-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,1.666666667,0.7142857143,0,0],put_cards:40,payout:0,efficiency:1}
		this.exchange_option[22]={rank:[-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,1.571428571,0.88,0],put_cards:44,payout:0,efficiency:1}
		this.exchange_option[23]={rank:[-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,4,0],put_cards:48,payout:0,efficiency:1}
		this.exchange_option[24]={rank:[-4,0,0,0,0,0,0,0,0,0.0008888888889,0.0004444444444,0.0001904761905,0,0],put_cards:4,payout:0,efficiency:1}
		this.exchange_option[25]={rank:[-4,-4,0,0,0,0,0,0,0,0.004444444444,0.002222222222,0.0009523809524,0,0],put_cards:8,payout:0,efficiency:1}
		this.exchange_option[26]={rank:[-4,-4,-4,0,0,0,0,0,0,0.01155555556,0.005777777778,0.002476190476,0,0],put_cards:12,payout:0,efficiency:1}
		this.exchange_option[27]={rank:[-4,-4,-4,-4,0,0,0,0,0,0.02577777778,0.01288888889,0.005523809524,0,0],put_cards:16,payout:0,efficiency:1}
		this.exchange_option[28]={rank:[-4,-4,-4,-4,-4,0,0,0,0,0.05422222222,0.02711111111,0.01161904762,0,0],put_cards:20,payout:0,efficiency:1}
		this.exchange_option[29]={rank:[-4,-4,-4,-4,-4,-4,0,0,0,0.1111111111,0.05555555556,0.02380952381,0,0],put_cards:24,payout:0,efficiency:1}
		this.exchange_option[30]={rank:[-4,-4,-4,-4,-4,-4,-4,0,0,0.2222222222,0.1111111111,0.04761904762,0,0],put_cards:28,payout:0,efficiency:1}
		this.exchange_option[31]={rank:[-4,-4,-4,-4,-4,-4,-4,-4,0,0.4444444444,0.2222222222,0.09523809524,0,0],put_cards:32,payout:0,efficiency:1}
		this.exchange_option[32]={rank:[-4,-4,-4,-4,-4,-4,-4,-4,-4,0.8888888889,0.4444444444,0.1904761905,0,0],put_cards:36,payout:0,efficiency:1}
		this.exchange_option[33]={rank:[-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,1.666666667,0.7142857143,0,0],put_cards:40,payout:0,efficiency:1}
		this.exchange_option[34]={rank:[-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,3.142857143,0,0],put_cards:44,payout:0,efficiency:1}
		this.exchange_option[35]={rank:[-4,-4,-4,-4,-4,-4,0,0,0,0,0,0,0,0],put_cards:24,payout:0.00465,efficiency:0.93}
		this.exchange_option[36]={rank:[-4,-4,-4,-4,-4,-4,-4,0,0,0,0,0,0,0],put_cards:28,payout:0.0094,efficiency:0.94}
		this.exchange_option[37]={rank:[-4,-4,-4,-4,-4,-4,-4,-4,0,0,0,0,0,0],put_cards:32,payout:0.019,efficiency:0.95}
		this.exchange_option[38]={rank:[-4,-4,-4,-4,-4,-4,-4,-4,-4,0,0,0,0,0],put_cards:36,payout:0.0384,efficiency:0.96}
		this.exchange_option[39]={rank:[-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,0,0,0,0],put_cards:40,payout:0.097,efficiency:0.97}
		this.exchange_option[40]={rank:[-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,0,0,0],put_cards:44,payout:0.2156,efficiency:0.98}
		this.exchange_option[41]={rank:[-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,0,0],put_cards:48,payout:0.495,efficiency:0.99}
		this.exchange_option[42]={rank:[-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,0],put_cards:52,payout:1,efficiency:1}
		this.exchange_option[43]={rank:[-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-1],put_cards:53,payout:1.125,efficiency:1}
		// verification of all exchanges balance
		// tolerance is relative error between value of cards player put and get (expected values)
		// efficiency causes reduction in prize
		var tol=1e-6;
		for(var i=0;i<this.exchange_option.length;i++){
			var put_val=0;
			var get_val=0;
			var put_val2=0;
			for(var j=1;j<=53;j+=4){
				var rank_ind=Math.floor((j-1)/4);
				if(this.exchange_option[i].rank[rank_ind]>=0){
					// verify that rank distribution of cards provides correct value
					get_val=get_val+this.exchange_option[i].rank[rank_ind]*this.deck[j].value
					// verify that sequence of cards provides correct value
				}else{
					put_val=put_val-this.exchange_option[i].rank[rank_ind]*this.deck[j].value
				}
			}	
			for(var j=1;j<=this.exchange_option[i].put_cards;j++){
				put_val2=put_val2+this.deck[j].value
			}

			//console.log(i+" "+get_val+" "+put_val);
			if(Math.abs((get_val+this.exchange_option[i].prize)/(put_val*this.exchange_option[i].efficiency)-1)>tol){
				console.log('Error in exchange #'+i+': Value of cards to put '+put_val
				+' Value of cards to get '+get_val+' Prize:'+this.exchange_option[i].prize+' Efficiency:'+this.exchange_option[i].efficiency)

			}
			if(Math.abs((get_val+this.exchange_option[i].prize)/(put_val2*this.exchange_option[i].efficiency)-1)>tol){
				console.log('Error in exchange #'+i+': Value of cards to put2 '+put_val2
				+' Value of cards to get '+get_val+' Prize:'+this.exchange_option[i].prize+' Efficiency:'+this.exchange_option[i].efficiency)
			}
		}

		// return possible prize for exchange option
		
		this.testExchange=function(ex_index){
			return ArmenCoin_obj.calculatePrize(this.total_value)*this.exchange_option[ex_index].payout
		}
		
		// We neglect information about cards distribution, instead of it 
		// check that player submitted sequence of cards with indexes
		// THIS OPTION POSSIBLE WILL NOT WORK WITH OTHER EXCHANGES

		// player - structure with all information about player,
		// indexes - number of his cards 
		// ex_index - index of exchange to perform
		

		
		this.makeExchange=function(player,indexes,ex_index){
			// number of cards to put
			var cards_required=this.exchange_option[ex_index].put_cards
			// indexes is array of cards numbers 
			if (indexes.length!=cards_required){
				console.log('Wrong number of cards. Exchange to player '+player.id+' declined')
				return;
			}
			/* This condition is not needed more, because if cards are not Unique, they are either Jokers
			// or position number will not match index of card for at least one card
			if (indexes.filter(this.onlyUnique).length!=cards_required){
				console.log('Each card should be put only once. Prize to player '+player.id+' declined')
				return;
			}
			*/			
			// Card in i-th place of excahnge should have index i
			// Joker can replace any card
			for(let i=0;i<cards_required;i++){
				if(!(i+1==player.cards[indexes[i]])&&player.cards[indexes[i]]<53){
					console.log('Card in position #'+i+' is wrong. Exchange to player '+player.id+' declined')
					return;
				}
			}
			
			// All verifications completed now give prize from reserve
			if(this.exchange_option[ex_index].payout>0){
				ArmenCoin_obj.givePrize(player,this.exchange_option[ex_index].payout,this.total_value);
			}
			//console.log(player);
			// burning exchanging cards
			for(let i=0;i<cards_required;i++){
				let cardindex=player.cards[indexes[i]]
				//console.log(cardindex);
				// deduct value of burnt card from sum value
				this.total_value-=this.deck[cardindex].value
				// deduct card from statistics
				this.deck[cardindex].minted-=1;
				// replacing card with burnt 
				player.cards[indexes[i]]=0
			}
			
			// giving new cards to players

			// iterate over card ranks except Jo
			for(let i=0;i<13;i++){
				// calculate number of cards to generate for exchange
				let card_number=Math.floor(this.exchange_option[ex_index].rank[i]+Math.random())
				console.log(card_number)
				for(let cn=0;cn<card_number;cn++){
					//index of card to give
					let card_index=i*4+Math.floor((Math.random()*4))
					// give card to player
					player.cards.push(card_index)
					// add generated card value to total value
					this.total_value+=this.deck[card_index].value
					// add generated card to statistics of minted cards				
					this.deck[card_index].minted+=1;
				}
			}
			i=13; // give Jo
			let card_number=Math.floor(this.exchange_option[ex_index].rank[i]+Math.random())
			for(let cn=0;cn<card_number;cn++){
				if(this.exchange_option[ex_index].rank>0){
					//index of card to give (Jo)
					card_index=53;
					// give card to player
					player.cards.push(card_index)
					// add generated card value to total value
					this.total_value+=this.deck[card_index].value
					// add generated card to statistics of minted cards				
					this.deck[card_index].minted+=1;
				}
			}
		}
	}
}

