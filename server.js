const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const Stellar = require('./protocols/Stellar')

const stellar = new Stellar()

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

    switch(protocol){
        case protocols.AI_BE : 

        case protocols.AI_BX :
            stellar.send(address)

        case protocols.AI_BO :

        case protocols.AI_BW :

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
  console.log('JSON Server is running')
})