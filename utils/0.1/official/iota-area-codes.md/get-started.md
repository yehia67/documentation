# Tag a transaction with a geo-location

**IOTA area codes (IAC) are a proposed standard for tagging IOTA transactions with a geo-location, which allows you to be filter them by location. You can use the IAC API to encode your own IAC from a latitude and longitude, then add it to the `tag` field of a transaction.**

In this example, we use the IOTA JavaScript library to create a zero-value transaction that's tagged with an address. Then, we send it to the Devnet, and use a Tangle explorer to check that the transaction is attached to the Tangle.

:::info:
If you've never used the IOTA client libraries before, we recommend completing [this tutorial](root://getting-started/0.1/tutorials/send-a-zero-value-transaction-with-nodejs.md)
:::

1. [Open the area code finder](https://utils.iota.org/area-codes)

2. Use the map to find a location

3. Copy the IAC for your location, paste it into the `tag` field of a transaction, and send it

    :::info:
    You can [run this sample code in your web browser](#run-the-code).
    :::

    ```js

    // Require the IOTA libraries
    const Iota = require('@iota/core');
    const Converter = require('@iota/converter');

    // Create a new instance of the IOTA object
    // Use the `provider` field to specify which IRI node to connect to
    const iota = Iota.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
    });

    const address = 'HELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDD';

    const seed = 'PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX';

    const message = Converter.asciiToTrytes('Hello World!');
    const transfers = [
    {
    value: 0,
    address: address,
    message: message,
    // Because the `tag` field must contain 27 trytes and the IAC is only 11 trytes long, we append 9s (null values) to the end of it.
    tag: "NPHTQORL9XK9999999999999999"
    }
    ];

    iota.prepareTransfers(seed, transfers)
    .then(trytes => {
    return iota.sendTrytes(trytes, 3/*depth*/, 9/*MWM*/)
    })
    .then(bundle => {
    var JSONBundle = JSON.stringify(bundle,null,1);
    console.log(`Bundle: ${JSONBundle}`)
    })
    .catch(err => {
    // Catch any errors
    console.log(err);
    });
    ```

4. Copy the transaction hash of the transaction you just sent and paste it into the [Devnet Tangle explorer](https://devnet.thetangle.org/)

    :::info:
    The Devnet Tangle explorer uses the iota-area-codes API to decode IACs for you.
    :::

5. Scroll down to see your transaction's tagged location in Google Maps

    ![Devnet Tangle explorer](../images/devnet-explorer.png)

## Run the code

Click the green button to run the sample code in this guide and see the results in the web browser.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/IOTA-area-codea?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Querying large areas

The original OLC protocol can represent areas of the globe in 6 pairs of digits. Each additional pair represents a 400 times increase in accuracy. As a result, we can remove pairs of characters from the right to expand the area.

For example, by querying the first four trytes of an IAC such as `NPHT`, you can find transactions in a 100 km by 100 km area (in this case an area covering Berlin and parts of Potsdam).

If you add a pair of trytes to the right such as `NPHTQO`, you can increase the accuracy to see transactions in a few suburbs of North Berlin.

## Next steps

If you want to build your own application that encodes coordinates into IACs, [read our quickstart instructions on using the iota-area-codes JavaScript API](https://github.com/iotaledger/iota-area-codes).




