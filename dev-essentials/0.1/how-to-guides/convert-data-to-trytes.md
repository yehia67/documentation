# Convert data to trytes

**The values of transaction fields must be represented in trytes. To facilitate data conversion, the IOTA client libraries have built-in functions to convert data to/from trytes, trits, and ASCII characters.**

:::info:First time using a client library?
[Try our quickstart guide](root://getting-started/0.1/tutorials/get-started.md) for getting started with the official client libraries.
:::

## Prerequisites

To complete this guide, you need the following:

* Node.js 8, or Node.js 10 or higher. We recommend the [latest LTS](https://nodejs.org/en/download/).
* A code editor such as [Visual Studio Code](https://code.visualstudio.com/Download)


## Convert a message to trytes

In this example, we convert a message to trytes, then convert it back to ASCII characters using the [`converter` package](https://github.com/iotaledger/iota.js/tree/next/packages/converter) of the iota.js library.

1. Require the `converter` package

    ```js
    const Converter = require('@iota/converter');
    ```

2. Create a variable to hold a message

    ```js
    var data = "Hello World!";
    ```

3. Pass the `data` variable to the `asciiToTrytes()` method to convert the message to trytes

    ```js
    var trytes = Converter.asciiToTrytes(data);

    console.log(`${data} converted to trytes: ${trytes}`);
    ```

4. Pass the returned trytes to the `trytesToAscii()` method to convert them to ASCII characters

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
