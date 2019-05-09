# Check if a transaction is confirmed

**Before IOTA tokens can be transferred, the bundle that transfers them must be confirmed. Transactions in a bundle remain in a pending state until the tail transaction is referenced and approved by a milestone.**

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

4. In the `check-confirmation.js` file, require the IOTA client library

    ```js
    const Iota = require('@iota/core');
    ```

5. Create an instance of the IOTA object and use the `provider` field to connect to a node

    ```js
    const iota = Iota.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
    });
    ```

6. Go to [devnet.thetangle.org](https://devnet.thetangle.org/) and find a confirmed transaction

    :::info:Can't find a confirmed transaction?
    Click a transaction hash in the Latest milestones box, then click the branch transaction hash. This transaction is referenced and approved by the milstone, so it is in a confirmed state.
    :::

7. Pass the transaction hash to the [`getLatestInclusion()`](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.getLatestInclusion) method to check if the IRI node's latest solid subtangle milestone approves it

    ```js
    iota.getLatestInclusion(['TRANSACTION HASH'])
    .then(states => console.log(states));
    ```

    When you execute the file, you should see an array that contains the `true` boolean, meaning that the transaction is confirmed.

    :::info:
    You could also use the `getInclusionStates()` method to check if a transaction is approved by an array of your own chosen transactions.
    :::

8. Go to [devnet.thetangle.org](https://devnet.thetangle.org) and find a pending transaction

    :::info:Can't find a pending transaction?
    Click a transaction hash in the Latest transactions box. This transaction is a tip, so it is in a pending state.
    :::

9. Pass the transaction hash to the `getLatestInclusion()` method to check if the IRI node's latest solid subtangle milestone approves it

    ```js
    iota.getLatestInclusion(['TRANSACTION HASH'])
    .then(states => console.log(states));
    ```

    When you execute the file, you should see an array that contains the `false` boolean, meaning that the transaction is not yet confirmed.

## Run the code

Click the green button to run the sample code in this guide and see the results in the web browser.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Check-transaction-confirmation?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>



