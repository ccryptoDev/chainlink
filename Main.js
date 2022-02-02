// this is main code dedicated for simulation

// not sure where to put this function
const ArmenCoin_obj = new ArmenCoin();
const NFTFactory_obj = new NFTFactory(ArmenCoin_obj);

createPlayer=function(name){
	playerList.push({id:name,cards:[],balance:0})
}

// calculate total balance to check that funds not lost
// because of bug of any sort

calculateBalance=function(){
	let sumbalance=0;
	for(let i=0;i<playerList.length;i++){
		sumbalance+=playerList[i].balance
	}
	sumbalance+=ArmenCoin_obj.reserve+ArmenCoin_obj.collected_HE
	return sumbalance
}
// generate line for debug 
playersBalanceLine=function(){
	line='';
	for(let i=0;i<playerList.length;i++){
		line=line+playerList[i].id+": "+playerList[i].balance+" "
	}
	return line;	
}

const NFT = new NFTFactory();
playerList=[];

createPlayer("Armen");
createPlayer("Yuri");
createPlayer("Player1");
createPlayer("Partial_claimer");
createPlayer("Exchanger");

playerList[0].balance=5;
playerList[1].balance=5;
playerList[2].balance=2;
playerList[3].balance=2;
playerList[4].balance=2;

NFTFactory_obj.buyDeck(playerList[0]);
NFTFactory_obj.buyDeck(playerList[0]);
NFTFactory_obj.buyDeck(playerList[1]);
NFTFactory_obj.buyDeck(playerList[3]);
NFTFactory_obj.buyDeck(playerList[4]);

for(let i=0;i<800;i++){
	ArmenCoin_obj.nextDay()
}

NFTFactory_obj.buyCard(playerList[2],1,10000)
playerList[2].cards=
playerList[2].cards.sort(function(a, b){return b-a});

let arr=[]
for(let i=0;i<53;i++){
	arr.push(i);
}
NFTFactory_obj.makeExchange(playerList[0],arr,43)


arr=[]
for(let i=0;i<48;i++){
	arr.push(i);
}
NFTFactory_obj.makeExchange(playerList[3],arr,41)

arr=[]
for(let i=0;i<48;i++){
	arr.push(i);
}
NFTFactory_obj.makeExchange(playerList[4],arr,23)

// request price of purchasing card with index not less than 1 (2 or higher)
console.log(NFTFactory_obj.requestPrice(1));
// request price of purchasing card with index not less than 37 (10 or higher)
console.log(NFTFactory_obj.requestPrice(37));

console.log(NFTFactory_obj.testExchange(42));