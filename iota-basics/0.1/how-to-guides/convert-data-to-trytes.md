# Convert data to trytes

**The values of transaction fields must be represented in trytes. To facilitate data conversion, the IOTA client libraries have built-in converters to convert data to/from trytes, trits, and ASCII characters.**

:::info:
If you're unfamiliar with the terms trytes, trits, or trinary, we recommend that you [read about these concepts](../concepts/trinary.md).
:::

## Prerequisites

To complete this guide, you need the following:

* Node.js 8, or Node.js 10 or higher. We recommend the [latest LTS](https://nodejs.org/en/download/).
* A code editor such as [Visual Studio Code](https://code.visualstudio.com/Download)
* Access to a command prompt
* An Internet connection

---

1. Create a new directory called `iota-basics`

2. In the command prompt, change into the `iota-basics` directory, and install the [IOTA converter library](https://github.com/iotaledger/iota.js/tree/next/packages/converter)

    ```bash
    cd iota-basics
    npm install --save @iota/converter
    ```

3. In the `iota-basics` directory, create a new file called `convert-to-trytes.js`

4. In the `convert-to-trytes.js` file, require the IOTA client library

    ```js
    const Iota = require('@iota/converter');
    ```

5. Create a variable to hold a message

    ```js
    var data = "Hello World!";
    ```

6. Pass the `data` variable to the `asciiToTrytes()` method to convert the message to trytes

    ```js
    var trytes = Converter.asciiToTrytes(data);

    console.log(`${data} converted to trytes: ${trytes}`);
    ```

7. Pass the returned trytes to the `trytesToAscii()` method to convert them to ASCII characters

    ```js
    var message = Converter.trytesToAscii(trytes);

    console.log(`${trytes} converted back to ASCII: ${message}`);
    ```
    
    When you execute the file, you should see the converted strings in the output:

    ```console
    Hello World! converted to trytes: RBTC9D9DCDEAFCCDFD9DSCFA
    RBTC9D9DCDEAFCCDFD9DSCFA converted back to ASCII: Hello World!
    ```

:::info:
The `asciiToTrytes()` method supports only [basic ASCII characters](https://en.wikipedia.org/wiki/ASCII#Printable_characters). As a result, diacritical marks such as accents and umlauts aren't supported and result in an `INVALID_ASCII_CHARS` error.
:::

## Run the code

Click the green button to run the sample code in this guide and see the results in the web browser.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Convert-data-to-trytes?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
