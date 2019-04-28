const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const Stellar = require('./protocols/Stellar')
const Erc20 = require('./protocols/ERC20')
const Waves = require('./protocols/WAVES')

const stellar = new Stellar()
const erc20 = new Erc20()
const waves = new Waves()

const protocols = {
    AI_BE : 'aibe',
    AI_BX : 'aibx',
    AI_BO : 'aibo',
    AI_BW : 'aibw'
}

server.use(middlewares)
server.use(jsonServer.bodyParser)


server.post('/airdrop', (req, res) => {
    var protocol = req.body.protocol
    var address = req.body.address
    var amount = req.body.amount

    switch(protocol){
        case protocols.AI_BE : 
            // Testing .. have "ganache-cli -d" running in command prompt
            // Amount in Ethers as String, Address as String
            erc20.send(address, "" + amount)
            break

        case protocols.AI_BX :
            stellar.send(address, "" + amount) 
            break
        case protocols.AI_BO :
            break
        case protocols.AI_BW :
            // Amount in Waves as String, Address as String
            waves.send(address, "" + amount)
            break

    }
  res.jsonp(req.body.id)
})

server.post('/airdropAll', (req, res) => {
  res.jsonp(req.body.id)
})

server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  next()
})

// Use default router
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running on port 3000')
})

// Testing .. have "ganache-cli -d" running in command prompt .. check balance in Metamask
// Amount in Ethers as String
// https://wavesexplorer.com/testnet/address/3MpVUtNmLbb8r5x9k81hqqzTXH7xN8JxFTd
// erc20.send("0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0","2.5")

// Amount in Waves as String, Address as String
// waves.send('3MpVUtNmLbb8r5x9k81hqqzTXH7xN8JxFTd','2500')
