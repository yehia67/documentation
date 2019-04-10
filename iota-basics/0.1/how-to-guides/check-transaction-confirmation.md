# Check if a transaction is confirmed

**Before IOTA tokens can be transferred, the bundle that transfers them must be confirmed. Transactions in a bundle remain in a pending state until the tail transaction is approved by a milestone.**

:::info:
If you're unfamiliar with the terms Coordinator, milestone, or confirmation, we recommend that you [read about the Tangle](root://the-tangle/0.1/introduction/overview.md).
:::

## Prerequisites

To complete this guide, you need the following:

* [Node.js (8+)](https://nodejs.org/en/)
* A code editor such as [Visual Studio Code](https://code.visualstudio.com/Download)
* Access to a command prompt
* An Internet connection

---

1. Create a new directory called `iota-basics`

2. In the command prompt, change into the `iota-basics` directory, and install the [IOTA Core library](https://github.com/iotaledger/iota.js/tree/next/packages/core)

    ```bash
    cd iota-basics
    npm install --save @iota/core
    ```

3. In the `iota-basics` directory, create a new file called `check-confirmation.js`

4. In the check-confirmation.js file, require the IOTA libraries

    ```js
    const Iota = require('@iota/core');
    ```

5. Create an instance of the IOTA object and use the `provider` field to connect to an IRI node

    ```js
    const iota = Iota.composeAPI({
    provider: 'https://nodes.thetangle.org:443'
    });
    ```

6. Go to [thetangle.org](https://thetangle.org), click **Live** and find a transaction that's in a confirmed state

7. Pass the transaction hash to the [`getLatestInclusion()`](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.getLatestInclusion) method to check if the IRI node's latest solid subtangle milestone approves it

    ```js
    iota.getLatestInclusion(['TRANSACTION HASH'])
    .then(states => console.log(states));
    ```

    When you execute the file, you should see an array that contains the `true` boolean, meaning that the transaction is confirmed.

    :::info:
    You could also use the `getInclusionStates()` method to check if a transaction is approved by an array of your own chosen transactions.
    :::

8. Go to [thetangle.org](https://thetangle.org), click **Live** and find a transaction that's in a pending state

9. Pass the transaction hash to the `getLatestInclusion()` method to check if the IRI node's latest solid subtangle milestone approves it

    ```js
    iota.getLatestInclusion(['TRANSACTION HASH'])
    .then(states => console.log(states));
    ```

    When you execute the file, you should see an array that contains the `false` boolean, meaning that the transaction is not yet confirmed.

## Final code

```js
// Require the IOTA libraries
const Iota = require('@iota/core');

// Create a new instance of the IOTA object
// Use the `provider` field to specify which IRI node to connect to
const iota = Iota.composeAPI({
provider: 'https://nodes.thetangle.org:443'
});

iota.getLatestInclusion(['QJYYXR9QQGEQJIIEMYJVVTZODQFXFFZNHHOKMTDBKJ9LLKCYJKSUWBHGHUFCKFQGD9WCXBJ9HRAFZ9999'])
.then(states => console.log(states));
```



