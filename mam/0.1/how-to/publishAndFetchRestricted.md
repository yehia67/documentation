# Publishing restricted messages

**Using this example you can publish a restricted message.** Restricted is the MAM privacy mode used by publishers to limit which subscribers may view their messages.**

First, import the MAM client library and the ascii to tryte and tryte to ascii converters
```
const Mam = require('../lib/mam.client.js')
const { asciiToTrytes, trytesToAscii } = require('@iota/converter')
```
Set the privacy mode to restricted.  Set the secretKey.  In this example, it is 'VERYSECRETKEY'.  Configure the provider.  This example uses the IOTA testbed, called "Devnet".  Configure the mamExplorerLink.  This example uses the IOTA MAM explorer.
```
const mode = 'restricted'
const secretKey = 'VERYSECRETKEY'
const provider = 'https://nodes.devnet.iota.org'

const mamExplorerLink = `https://mam-explorer.firebaseapp.com/?provider=${encodeURIComponent(provider)}&mode=${mode}&key=${secretKey.padEnd(81, '9')}&root=`
```
Tell MAM to use the provider
```
// Initialise MAM State
let mamState = Mam.init(provider)
```
Tell MAM to use the secret key when encrypting the message
```
// Set channel mode
mamState = Mam.changeMode(mamState, mode, secretKey)
```
Convert the ascii data to trytes and store it in json.  Create your MAM message
```
// Publish to tangle
const publish = async packet => {
    // Create MAM Payload - STRING OF TRYTES
    const trytes = asciiToTrytes(JSON.stringify(packet))
    const message = Mam.create(mamState, trytes)

    // Save new mamState
    mamState = message.state
```
Send your message to the Tangle. You will get the message root which is the MAM channel ID for this MAM stream
```
    // Attach the payload
    await Mam.attach(message.payload, message.address, 3, 9)

    console.log('Published', packet, '\n');
    return message.root
}
```
Publish three messages
```
const publishAll = async () => {
  const root = await publish({
    message: 'Message from Alice',
    timestamp: (new Date()).toLocaleString()
  })

  await publish({
    message: 'Message from Bob',
    timestamp: (new Date()).toLocaleString()
  })

  await publish({
    message: 'Message from Charlie',
    timestamp: (new Date()).toLocaleString()
  })

  return root
}
```
Fetch each message
```
// Callback used to pass data out of the fetch
const logData = data => console.log('Fetched and parsed', JSON.parse(trytesToAscii(data)), '\n')

publishAll()
  .then(async root => {

    // Output asyncronously using "logData" callback function
    await Mam.fetch(root, mode, secretKey, logData)

    // Output syncronously once fetch is completed
```
You need the secretKey to decode the message
```
    const result = await Mam.fetch(root, mode, secretKey)
    result.messages.forEach(message => console.log('Fetched and parsed', JSON.parse(trytesToAscii(message)), '\n'))
```
Print the command for viewing these messages in the MAM Explorer
```
    console.log(`Verify with MAM Explorer:\n${mamExplorerLink}${root}\n`);
  })
```