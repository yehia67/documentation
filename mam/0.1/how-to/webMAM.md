# Publishing to a webpage with MAM

**You can build a webpage to publish and fetch MAM messages.**  

Publish three messages

```
Published: ALICE
Published: BOB
Published: CHARLIE
```

Fetch and decode three messages

```
Fetched and parsed ALICE
Fetched and parsed BOB
Fetched and parsed CHARLIE
```

Use the MAM Explorer to verify


![screen capture showing these three MAM messages](images/webMAM.png)

## Adding MAM in HTML

Use the ```<html>``` tag to create your HTML page.  Set the character set to "utf-8".  In the ```<head>``` section, give your page a title.  Start the body of your webpage using the ```<body``` tag.  Set a division within the body using the ```<div>``` tag and give it an ID="output" so your script knows where to send the output.

```
<html>
<meta charset="utf-8" />

<head>
    <title>MAM Example Publish and Fetch</title>
</head>

<body>
    <div id="output"></div>
```

Tell the script where to find mam.web.min.js

```
    <script src="../lib/mam.web.min.js"></script>
```

Define the tryte alphabet.  Add functions to convert ascii characters to trytes and trytes to ascii

```
    <script>
        const TRYTE_ALPHABET = '9ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        const asciiToTrytes = (input) => {
            let trytes = '';
            for (let i = 0; i < input.length; i++) {
                var dec = input[i].charCodeAt(0);
                trytes += TRYTE_ALPHABET[dec % 27];
                trytes += TRYTE_ALPHABET[(dec - dec % 27) / 27];
            }
            return trytes;
        };

        const trytesToAscii = (trytes) => {
            let ascii = '';
            for (let i = 0; i < trytes.length; i += 2) {
                ascii += String.fromCharCode(TRYTE_ALPHABET.indexOf(trytes[i]) + TRYTE_ALPHABET.indexOf(trytes[i + 1]) * 27);
            }
            return ascii;
        };
```
Configure the provider.  This example uses the IOTA testbed, called "Devnet".  Configure the mamExplorerLink.  This example uses the IOTA MAM explorer.  Set the HTML output to ```output```

```
        (async function () {
            const mode = 'public'
            const provider = 'https://nodes.devnet.iota.org'

            const mamExplorerLink = `https://mam-explorer.firebaseapp.com/?provider=${encodeURIComponent(provider)}&mode=${mode}&root=`

            const outputHtml = document.querySelector("#output");

```
Tell MAM to use the provider

```
            // Initialise MAM State
            let mamState = Mam.init(provider)
```
For each message, convert to trytes, then send it.  You will get the message root which is the MAM channel ID for this MAM stream

```
            // Publish to tangle
            const publish = async packet => {
                // Create MAM Payload - STRING OF TRYTES
                const trytes = asciiToTrytes(JSON.stringify(packet))
                const message = Mam.create(mamState, trytes)

                // Save new mamState
                mamState = message.state

                // Attach the payload
                await Mam.attach(message.payload, message.address, 3, 9)

                outputHtml.innerHTML += `Published: ${packet}<br/>`;
                return message.root
            }
```
Publish three messages
```
            const publishAll = async () => {
                const root = await publish('ALICE')

                await publish('BOB')

                await publish('CHARLIE')

                return root
            }

```
Fetch three messages
```
            // Callback used to pass data out of the fetch
            const logData = data => outputHtml.innerHTML += `Fetched and parsed ${JSON.parse(trytesToAscii(data))}<br/>`;

            const root = await publishAll();

            // Output asyncronously using "logData" callback function
            await Mam.fetch(root, mode, null, logData)

            // Output synchronously once fetch is completed
            const result = await Mam.fetch(root, mode)
            result.messages.forEach(message => {
                outputHtml.innerHTML += `Fetched and parsed ${JSON.parse(trytesToAscii(message))}<br/>`
            });

```
Provide a link so these transactions can be verified using the MAM Explorer
```
            outputHtml.innerHTML += `Verify with MAM Explorer:<br/><a target="_blank" href="${mamExplorerLink}${root}">${mamExplorerLink}${root}</a>`;
        })();
    </script>

```
End the script by close the body and the HTML tags

```
</body>

</html>
```
