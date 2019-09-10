const Mam = require('@iota/mam')
const { trytesToAscii } = require('@iota/converter')
const mamType = 'public'
const mamSecret = 'DONTSHARETHIS'
let root = null
let nextRoot = process.argv[2]
function showData (raw) {
  const data = JSON.parse(trytesToAscii(raw))
  console.log(data.ts, '-', data.test)
}
async function initMam () {
  console.log('\r\n\r\n')
  console.log('Listening to MAM stream test...')
  console.log('\r\n')
  await Mam.init('https://nodes.devnet.iota.org:443')
}
async function checkMam () {
  if (root !== nextRoot) {
    root = nextRoot
  }

  // The showData callback will be called in order for each message found
  const data = await Mam.fetch(root, mamType, mamSecret, showData)
  nextRoot = data.nextRoot

  // Check again in 5 seconds
  setTimeout(checkMam, 5000)
}
initMam()
checkMam()

