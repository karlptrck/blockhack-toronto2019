var ethers = require('ethers');
let privateKey = "0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d";

// Connect a wallet to localhost
let httpProvider = new ethers.providers.JsonRpcProvider();
let walletWithProvider = new ethers.Wallet(privateKey, httpProvider);

class Erc20{
    
    constructor(){}

    // expecting _amount to be a String
    send(address, _amount){
        console.log('Sending ETH to ' + address)

        let airdropAmount = ethers.utils.parseEther(_amount);

        let tx = {
            to: address,
            value: airdropAmount,
            gasLimit: 21000,
        };
        
        let sendPromise = walletWithProvider.sendTransaction(tx);
        
        sendPromise.then((txRct) => {
            console.log("Ethereum Transaction Receipt");
            console.log(txRct);
        });
        
    }
}

module.exports = Erc20