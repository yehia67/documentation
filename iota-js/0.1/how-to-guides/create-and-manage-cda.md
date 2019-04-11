# Send and receive transactions

**To send and receive transactions in an account, you must use conditional deposit addresses (CDA). CDAs are special addresses that allow you to specify the conditions in which they may be used in account withdrawals and deposits.**

Accounts use CDAs to avoid address reuse. Without CDAs, recipients have no way of knowing whether a sender is about to withdraw tokens from an address before they deposit tokens into it. With CDAs, recipients can create an address that expires after a certain time, allowing senders to make a judgement about whether to deposit tokens into it. If senders aren't sure if a bundle will confirm in time, they can ask the recipient for another CDA.

:::info:
CDAs can be used only in an account and not in the generic [client library methods](root://client-libraries/0.1/introduction/overview.md). As a result, both you and the sender must have an account to be able to use CDAs.
:::

CDAs can be in either an active or expired state. Active addresses are part of the seed state, so you can't withdraw tokens from them, but depositors can deposit tokens into them. Expired addresses are removed from the seed state, so you can withdraw tokens from them, but depositors can't deposit tokens into them.

The workflow of a CDA should be the following:

1. You create a CDA
2. You send the CDA to a depositor
3. Based on the address's state, the depositor must decide whether a bundle will be confirmed in the given timeframe. If depositors decide the timeframe is too small, they should request a new CDA.

## Create a CDA

To create a CDA you specify the following conditions, which are used to determine if it's active or expired:

* **address (required):** An address
* **timeoutAt (required):** The time at which the address expires

And one of the following, recommended fields:

* **multiUse (recommended):** A boolean that specifies if the address may be sent more than one deposit. Cannot be used in combination with `expectedAmount` in the same CDA.
* **expectedAmount (recommended):** The amount of IOTA tokens that the address is expected to contain. When this amount is reached, the address is considered expired. We highly recommend using this condition. Cannot be used in combination with `multiUse` in the same CDA.

:::info:
The combination of both `expectedAmount` and `multiUse` in the same CDA is not supported. Both fields are designed for different scenarios. Please refer to the [CDA FAQ](../references/cda-faq.md) for more information.
:::

|  **Combination of fields** | **Withdrawal conditions**
| :----------| :----------|
|`timeoutAt` |The CDA can used in withdrawals as long as it contains IOTA tokens|
|`timeoutAt` and `multiUse` (recommended) |The CDA can be used in withdrawals as soon as it expires, regardless of how many deposits were made to it. See the [CDA FAQ](../references/cda-faq.md) on when to use addressess with the `multiUse` field set. |
|`timeoutAt` and `expectedAmount` (recommended) | The CDA can be used in withdrawals as soon as it contain the expected amount. See the [CDA FAQ](../references/cda-faq.md) on when to use addressess with the `multi_use` field set.|

:::warning:Warning
If a CDA was created with only the `timeoutAt` field, it can be used in withdrawals as soon as it has a non-zero balance even if it hasn't expired. 

To avoid address reuse, we recommend creating CDAs with either the `multiUse` field or with the `expectedAmount` field whenever possible.
:::

1. Pass the CDA fields to the `generateCDA()` method

    ```js
    account.generateCDA({
        timeoutAt: Math.floor(new Date('7-16-2186').getTime() / 1000), // Date in seconds
        multiUse: true,
        security: 2
    })
        .then(cda => {
            // Do something with the CDA
            console.log(JSON.stringify(cda, null, 1));
        })
        .catch(error => {
            // Handle errors here
            console.log(error);
        })
    ```

:::info:
If you created an account with a `timeSource()` method, you can call that method in the `timeoutAt` field.
:::

## Distribute a CDA

The `generateCDA()` method returns a CDA object with the following fields. You can serialize a CDA into any format before distributing it to senders:

```js
{
   address, // The last 9 trytes are the checksum
   timeoutAt,
   multiUse,
   expectedAmount
}
```

1. To serialize a CDA into a magnet link, use the `serializeCDAMagnet()` method in the `@iota/cda` module

    ```js
    const CDA = require('@iota/cda');
    
    const magnetLink = CDA.serializeCDAMagnet(cda);
    // iota://MBREWACWIPRFJRDYYHAAME…AMOIDZCYKW/?timeout_at=1548337187&multi_use=1
    ```

## Deposit IOTA tokens into a CDA

1. After making sure that the CDA is still active, use the `sendToCDA()` method to deposit IOTA tokens into it

    ```js   
    account.sendToCDA({
        address: 'AT9GOVPQDDKAJ...ADFA9IRSV', // must include the checksum
        multiUse: false,
        timeoutAt: 6833278800,
        expectedAmount: 10000000,
        value: 10000000
    })
         .then((trytes) => {
            console.log('Successfully prepared transaction trytes:', trytes)
        })
        .catch(err => {
            // Handle errors here...
        });

    // Start attaching transactions to the Tangle
    account.startAttaching({
        depth: 3,
        minWeightMagnitude(14),
        delay: 30 * 1000 // 30 second delay
    });
    
    // Or stop attaching
    account.stopAttaching();
    ```

2. **Optional:** To use a magnet link, use `parseCDAMagnet()` and pass the results to the`sendToCDA()` method

    ```js
     const magnetLink = 'iota://MBREWACWIPRFJRDYYHAAME…AMOIDZCYKW/?timeout_at=1548337187&multi_use=1&expected_amount=0'
     const { address, timeoutAt, multiUse, expectedAmount } = parseCDAMagnet(
        magnetLink
    );

    account.sendToCDA({
        address,
        timeoutAt,
        multiUse,
        expectedAmount,
        value: 1 // Value to send to the CDA
    })
        .then((trytes) => {
            console.log('Successfully prepared transaction trytes:', trytes)
        })
        .catch(err => {
            // Handle errors here...
        });

    // Start attaching transactions to the Tangle
    account.startAttaching({
        depth: 3,
        minWeightMagnitude(14),
        delay: 30 * 1000 // 30 second delay
    });
    
    // Or stop attaching
    account.stopAttaching();
    ```
