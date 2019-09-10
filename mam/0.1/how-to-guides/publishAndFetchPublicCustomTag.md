# Publishing with a custom tag

**Using this example you can publish a message with a custom tag**

Import the MAM client library and the ascii to tryte and tryte to ascii converters

```js
const Mam = require('../lib/mam.client.js')
const { asciiToTrytes, trytesToAscii } = require('@iota/converter')
```
Set the privacy mode to public.  Configure the provider.  This example uses the IOTA testbed, called "Devnet".  Configure the mamExplorerLink.  This example uses the IOTA MAM explorer.

```js
const mode = 'public'
const provider = 'https://nodes.devnet.iota.org'

const mamExplorerLink = `https://mam-explorer.firebaseapp.com/?provider=${encodeURIComponent(provider)}&mode=${mode}&root=`
```
Tell MAM to use the provider
```
// Initialise MAM State
let mamState = Mam.init(provider)
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
Set the tag to 'CUSTOMTAG' when you send the message to the Tangle.  You will get the message root which is the MAM channel ID for this MAM stream
```
    // Attach the payload
    await Mam.attach(message.payload, message.address, 3, 9, 'CUSTOMTAG')

    console.log('Published', packet, '\n');
    return message.root
}

```
Publish three messages
```

const publishAll = async () => {
  const root = await publish({
    message: 'Message from Alice',
    customTag: 'CUSTOMTAG',
    timestamp: (new Date()).toLocaleString()
  })

  await publish({
    message: 'Message from Bob',
    customTag: 'CUSTOMTAG',
    timestamp: (new Date()).toLocaleString()
  })

  await publish({
    message: 'Message from Charlie',
    customTag: 'CUSTOMTAG',
    timestamp: (new Date()).toLocaleString()
  })

  return root
}
```
Fetch each message and decode it
```
// Callback used to pass data out of the fetch
const logData = data => console.log('Fetched and parsed', JSON.parse(trytesToAscii(data)), '\n')

publishAll()
  .then(async root => {

    // Output asyncronously using "logData" callback function
    await Mam.fetch(root, mode, null, logData)

    // Output syncronously once fetch is completed
    const result = await Mam.fetch(root, mode)
    result.messages.forEach(message => console.log('Fetched and parsed', JSON.parse(trytesToAscii(message)), '\n'))
```
Print the command line for viewing these messages in the MAM Explorer
```
    console.log(`Verify with MAM Explorer:\n${mamExplorerLink}${root}\n`);
  })
```

## Example output

You should see three messages

![screen capture verifying publishing and fetching](../images/customTag.png)

