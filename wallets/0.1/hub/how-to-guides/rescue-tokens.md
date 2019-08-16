# Rescue IOTA tokens from a swept address

**After Hub sweeps an address, that address is spent, so it must never be withdrawn from again. But, sometimes users later send tokens to that same address. In this case, the address is at risk of an attacker trying to brute force its signature to steal its tokens. To rescue the tokens from the swept address, you can create a signed bundle that attempts to withdraw those tokens before a potential attacker can.**

To rescue tokens from a swept address, you must create a bundle outside of Hub, then use Hub to sign it.

In this guide, we use the JavaScript client library to create and send the bundle, but we also have other official and community libraries, including Go, Java, and Python.

## Prerequisites

To complete this tutorial, you need the following:

* Node.js 8, or Node.js 10 or higher. We recommend the [latest LTS](https://nodejs.org/en/download/).
* A code editor such as [Visual Studio Code](https://code.visualstudio.com/Download)
* Access to a command prompt
* An Internet connection
* The [`@iota/bundle`](https://github.com/iotaledger/iota.js/tree/next/packages/bundle), [`@iota/core`](https://github.com/iotaledger/iota.js/tree/next/packages/core), [`@iota/converter`](https://github.com/iotaledger/iota.js/tree/next/packages/converter), and [`@iota/transaction`](https://github.com/iotaledger/iota.js/tree/next/packages/transaction) packages

:::info:
If you've never used the IOTA client libraries before, we recommend completing [the getting started tutorial](root://getting-started/0.1/tutorials/send-a-zero-value-transaction-with-nodejs.md)
:::

---

## Step 1. Create a function that returns an unsigned bundle

Before Hub can sign a bundle to transfer tokens from a swept address to new address, you need to create an unsigned one for it to sign. To do this, create a function that returns an unsigned bundle.

1. Require the packages

    ```js
    const Iota = require('@iota/core');
    const Bundle = require('@iota/bundle');
    const Transaction = require('@iota/transaction');
    const Converter = require('@iota/converter');
    ```

2. Create a `createSweepBundle()` function to return an unsigned bundle

    ```js
    function createSweepBundle({ outputAddress, inputAddress, securityLevel, value }) {
    const bundle = new Int8Array();
    const issuanceTimestamp = Math.floor(Date.now() / 1000);

    bundle.set(Bundle.addEntry(bundle, {
        address: outputAddress,
        value,
        issuanceTimestamp,
    }));

    // Create enough zero-value transaction in which to add the rest of the signature fragments
    for (let i = 0; i < securityLevel; i++) {
        bundle.set(Bundle.addEntry(bundle, {
            address: inputAddress,
            value: i == 0 ? -value : 0,
            issuanceTimestamp,
        }));
    }

    return Bundle.finalizeBundle(bundle);
    }
    ```

    :::info:
    You need the security level of the swept address so that the function can create enough zero-value transactions to which you can add the signature fragments.
    :::

## Step 2. Use Hub to sign the unsigned bundle

Now that you have a function to create an unsigned bundle, you need to call that function, get the signature from Hub, then add that signature to the bundle.

1. Get the following values from Hub and add them to the `parameters` object:

|**Field**|**Description**|**Hub endpoint to use**|
|:----|:----------|:-----------|
|`outputAddress`|The new address to which you want to transfer the tokens|`GetDepositAddress` or create a new address outside of Hub. For example, you may want to send the tokens to an address on a hardware wallet. |
|`inputAddress`|The swept address| |
|`securityLevel`| The security level of the swept address| |
|`value`|The total balance of the swept address| |

    ```js
    const parameters = {
    outputAddress: , // Address in trits to send the tokens from the swept address,
    inputAddress: , // Swept address in trits
    securityLevel: , // Security level of the swept address
    value: , // Total amount of IOTA tokens to withdraw from the swept address
    }
    ```

2. Call the `createSweepBundle()` function, and pass it the parameters you got from Hub

    ```js
    const bundle = createSweepBundle(parameters);
    const bundleHash = bundle[0].bundle;
    ```

    This function returns an array of transactions that are in the unsigned bundle.

3. In Hub, pass the result of the `createSweepBundle()` function to the ` ` endpoint to sign the bundle

4. Add the signature that Hub created to the `signature` constant (is it in trits?)

    ```js
    const signature = // Replace with the signature from Hub in trits
    ```


```js
bundle.set(Bundle.addSignatureOrMessage(bundle, signature, 1));

const trytes = []
for (let offset = 0; offset < bundle.length; offset += Transaction.TRANSACTION_LENGTH) {
    trytes.push(Converter.tritsToTrytes(bundle.subarray(offset, offset + Transaction.TRANSACTION_LENGTH)));
}

const { sendTrytes } = Iota.composeAPI({
    provider: '' // Replace with the URI of the IRI node
});

const depth = 3;
const minWeightMagnitude = 14;

Iota.sendTrytes(trytes.reverse() /*we need the bundle to be in order head to tail before sending it to the node*/, depth, minWeightMagnitude)
   .then(trytes => {
   })
   .catch(error => {
   })
```

## Sample code

```js
const Iota = require('@iota/core');
const Bundle = require('@iota/bundle');
const Transaction = require('@iota/transaction');
const Converter = require('@iota/converter');

function createSweepBundle({ outputAddress, inputAddress, securityLevel, value }) {
   const bundle = new Int8Array();
   const issuanceTimestamp = Math.floor(Date.now() / 1000);

   bundle.set(Bundle.addEntry(bundle, {
      address: outputAddress,
      value,
      issuanceTimestamp,
   }));

    // For every security level, we need a new zero-value transaction in which to add the rest of the signature fragments
   for (let i = 0; i < securityLevel; i++) {
       bundle.set(Bundle.addEntry(bundle, {
          address: inputAddress,
          value: i == 0 ? -value : 0,
          issuanceTimestamp,
       }));
   }

   return Bundle.finalizeBundle(bundle);
}

//---DO THIS IN HUB

const params = {
   outputAddress: , // Address in trits to send the tokens from the swept address,
   inputAddress: , // Swept address in trits
   securityLevel: , // Security level of the swept address
   value: , // Total amount of IOTA tokens to withdraw from the swept address
}

// Feed this to Hub to get the signature
const bundle = createSweepBundle(params);
const bundleHash = bundle[0].bundle;

//---

const signature = // Replace with the signature from Hub in trits

bundle.set(Bundle.addSignatureOrMessage(bundle, signature, 1));

const trytes = []
for (let offset = 0; offset < bundle.length; offset += Transaction.TRANSACTION_LENGTH) {
    trytes.push(Converter.tritsToTrytes(bundle.subarray(offset, offset + Transaction.TRANSACTION_LENGTH)));
}

const { sendTrytes } = Iota.composeAPI({
    provider: '' // Replace with the URI of the IRI node
});

const depth = 3;
const minWeightMagnitude = 14;

Iota.sendTrytes(trytes.reverse() /*we need the bundle to be in order head to tail before sending it to the node*/, depth, minWeightMagnitude)
   .then(trytes => {
   })
   .catch(error => {
   })
```

