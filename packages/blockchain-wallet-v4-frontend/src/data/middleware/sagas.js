import webSocket from './webSocket/sagas'

export default ({ api, coinsSocket, ratesSocket }) => ({
  webSocket: webSocket({
    api,
    coinsSocket,
    ratesSocket
  })
})
