const { transfer } = require('@waves/waves-transactions');
const { broadcast } =  require('@waves/waves-transactions');
const nodeUrl = 'https://testnodes.wavesnodes.com';
var signedTranserTx;

const seed = 'uncle virtual hero moral door glue two ill fiscal lizard fault valley pistol leg enforce'

// Account 1
// 3MtrxjR26m9GrWxShSojeRHjBzLcXKdXLA4
// uncle virtual hero moral door glue two ill fiscal lizard fault valley pistol leg enforce

// Account 2
// 3MpVUtNmLbb8r5x9k81hqqzTXH7xN8JxFTd
// next danger ignore abandon ahead fly garbage group inner rich october garbage keen tide zero

// https://wavesexplorer.com/testnet/address/3MtrxjR26m9GrWxShSojeRHjBzLcXKdXLA4
// https://wavesexplorer.com/testnet/address/3MpVUtNmLbb8r5x9k81hqqzTXH7xN8JxFTd


class Waves{
    
    constructor(){}

    async send(address, _amount){

        signedTranserTx = transfer({ 
          amount: _amount,
          recipient: address
        }, seed)
      
        try{
          await broadcast(signedTranserTx, nodeUrl).then(resp => {
            console.log("Waves Transaction Receipt");
            console.log(resp);
        })
        }catch(err){
            console.log(err)
        }
    }

}

module.exports = Waves