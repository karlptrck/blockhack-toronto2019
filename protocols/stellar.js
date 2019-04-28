const StellarSdk = require('stellar-sdk');
StellarSdk.Network.useTestNetwork();
const fetch = require('node-fetch');
var airdropAmount = 10;


const server = new StellarSdk.Server('https://horizon-testnet.stellar.org')
const sourceKeys = StellarSdk.Keypair.fromSecret('SCPYS2JDV427RZJE2SAZRAOG5WO2AW7NEZZRK2FUJH4R2GHZV7QFRKLD'); 

class Stellar{
    
    constructor(){}

    send(destinationId){
        // Transaction will hold a built transaction we can resubmit if the result is unknown.
        var transaction;
        
        server.loadAccount(destinationId)
        // If the account is not found, surface a nicer error message for logging.
        .catch(StellarSdk.NotFoundError, function (error) {
            throw new Error('The destination account does not exist!');
        })
        // If there was no error, load up-to-date information on your account.
        .then(function() {
            return server.loadAccount(sourceKeys.publicKey());
        })
        .then(function(sourceAccount) {
            // Start building the transaction.
            transaction = new StellarSdk.TransactionBuilder(sourceAccount)
            .addOperation(StellarSdk.Operation.payment({
                destination: destinationId,
                // Because Stellar allows transaction in many currencies, you must
                // specify the asset type. The special "native" asset represents Lumens.
                asset: StellarSdk.Asset.native(),
                amount: airdropAmount
            }))
            // A memo allows you to add your own metadata to a transaction. It's
            // optional and does not affect how Stellar treats the transaction.
            .addMemo(StellarSdk.Memo.text('Test Transaction'))
            // Wait a maximum of three minutes for the transaction
            .setTimeout(180)
            .build();
            // Sign the transaction to prove you are actually the person sending it.
            transaction.sign(sourceKeys);
            // And finally, send it off to Stellar!
            return server.submitTransaction(transaction);
        })
        .then(function(result) {
            console.log('Success! Results:', result);
        })
        .catch(function(error) {
            console.error('Something went wrong!', error);
            // If the result is unknown (no response body, timeout etc.) we simply resubmit
            // already built transaction:
            // server.submitTransaction(transaction);
        });
        }
}

module.exports = Stellar