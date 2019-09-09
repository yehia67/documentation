//require('./errorhandling')
// If using babel polyfill library
//global._babelPolyfill = false

const Mam = require('@iota/mam')
const { asciiToTrytes } = require('@iota/converter')

let mamState = Mam.init('https://nodes.devnet.iota.org:443')
const mamType = 'public'
const mamSecret = 'DONTSHARETHIS'

mamState = Mam.changeMode(mamState, mamType, mamSecret)
let toSend = JSON.stringify({ 'test': 'MAMTEST', 'ts': new Date() })
console.log(toSend)

const trytes = asciiToTrytes(toSend)
const message = Mam.create(mamState, trytes)

mamState = message.state

try {
    Mam.attach(message.payload, message.address)
    console.log('Attached to tangle!')
    console.log('Payload ', message.payload)
    console.log('Address ', message.address)
  } catch (e) {
    console.log(e)
}


if (mamState.channel.start === 1) {
    console.log('\r\nListen to this stream with\n\r\n\r   >  node recIT.js', message.root, '\r\n\r\n')
  } else {
    console.log('\r\nUpdated root: ', message.root, '\r\n')
  }

