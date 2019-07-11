# Make payments to/from your account

**To make payments, both the sender and the receiver need to have a CDA. The sender needs an expired CDA that contains IOTA tokens, and the receiver needs an active CDA.**

:::info:Accounts only
CDAs can be used only in an account and not in the generic client library methods. As a result, both you and the sender must have an account to be able to use CDAs.
:::

:::info:Checksum
The last 9 characters of a CDA are the checksum, which includes the address and all of its conditions. This checksum is not compatible with Trinity because it doesn't yet support CDAs.
:::

1. Install the package

    ```bash
    npm install @iota/cda
    ```

2. Create a CDA and set it to expire tomorrow

    ```js
    const cda = account
        .generateCDA({
            timeoutAt: Date.now() + 24 * 60 * 60 * 1000,
            expectedAmount: 1000
        });
    ```

    :::info:
    If you created an account with a `timeSource()` method, you can call that method in the `timeoutAt` field.
    :::

3. After making sure that the CDA is still active, send a deposit to it

    ```js
    cda
        .tap(cda => console.log('Sending to:', cda.address))
        .then(cda =>
            account.sendToCDA({
                ...cda,
                value: 1000
            })
            .then((trytes) => {
            console.log('Successfully prepared transaction trytes:', trytes)
        })
        )
        .catch(err => {
            // Handle errors here...
        });
    ```

    :::info
    If you want to test this sample code with free test tokens, [request some](root://getting-started/0.1/tutorials/receive-test-tokens.md).

    Be aware that the last 9 characters of your address is the checksum, which is not compatible with the faucet. Remove these characters before pasting your address into the input field.
    :::

In the output, you should see an address and a tail transaction hash when the transaction is pending, and the same address and tail transaction hash when the transaction is confirmed.

The account's attachment routine will keep attaching unconfirmed transactions until they are confirmed.

You can start or stop the attachment routine by calling the `startAttaching()` and
`stopAttaching()` methods.

    ```js

    account.startAttaching({
        depth: 3,
        minWeightMagnitude: 9,
        delay: 30 * 1000

        // How far back in the Tangle to start the tip selection
        depth: 3,

        // The minimum weight magnitude is 9 on the Devnet
        minWeightMagnitude: 9,

        // How long to wait before the next attachment round
        delay: 1000 * 30,

        // The depth at which transactions are no longer promotable
        // Those transactions are automatically re-attached
        maxDepth: 6
    });

    account.stopAttaching();
    ```

## Send someone your CDA

If you want a depositer to send IOTA tokens to your account, you need to send them your CDA.

Because CDAs are descriptive objects, you can serialize them into any format before sending them. The `generateCDA()` method returns a CDA object with the following fields. You can serialize a CDA into any format before distributing it to senders.

```js
{
   address, // The last 9 trytes are the checksum
   timeoutAt,
   multiUse,
   expectedAmount
}
```

For example, you can serialize these fields to create a magnet link.

### Serialize a CDA into a magnet link

The built-in method for serializing a CDA is to create a magent link.

1. To serialize a CDA into a magnet link, use the `serializeCDAMagnet()` method in the [`@iota/cda` module](https://github.com/iotaledger/iota.js/tree/next/packages/cda)

    ```js
    const CDA = require('@iota/cda');
    
    const magnetLink = CDA.serializeCDAMagnet(cda);
    // iota://MBREWACWIPRFJRDYYHAAME…AMOIDZCYKW/?timeout_at=1548337187&multi_use=1
    ```

2. To send a transaction to a CDA that's been serialized into a magnet link, pass the magent link to the `parseCDAMagnet()` method, then and pass the result to the`sendToCDA()` method

    ```js
     const magnetLink = 'iota://MBREWACWIPRFJRDYYHAAME…AMOIDZCYKW/?timeout_at=1548337187&multi_use=1&expected_amount=0';
     const { address, timeoutAt, multiUse, expectedAmount } = parseCDAMagnet(
        magnetLink
    );

    account.sendToCDA({
        address,
        timeoutAt,
        multiUse,
        expectedAmount,
        value: 1000
    })
        .then((trytes) => {
            console.log('Successfully prepared the transaction:', trytes)
        })
        .catch(err => {
            // Handle errors here...
        });

    account.startAttaching({
        depth: 3,
        minWeightMagnitude : 9,
        delay: 30 * 1000 // 30 second delay
    });
    ```


