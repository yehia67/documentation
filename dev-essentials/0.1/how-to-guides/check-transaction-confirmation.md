# Check if a transaction is confirmed

**Before IOTA tokens can be transferred, the bundle that transfers them must be confirmed. Transactions in a bundle remain in a pending state until the tail transaction is referenced and approved by a milestone.**

:::info:First time using a client library?
[Try our quickstart guide](root://getting-started/0.1/tutorials/get-started.md) for getting started with the official client libraries.
:::

:::info:
If you're unfamiliar with the terms Coordinator, milestone, or confirmation, we recommend that you [read about the Tangle](root://dev-essentials/0.1/concepts/the-tangle.md).
:::

## Prerequisites

To complete this guide, you need the following:

* Node.js 8, or Node.js 10 or higher. We recommend the [latest LTS](https://nodejs.org/en/download/).
* A code editor such as [Visual Studio Code](https://code.visualstudio.com/Download)
* Access to a command prompt
* An Internet connection

## Check if a transaction is confirmed

In this example, we check if a transaction is confirmed on the [Devnet](root://getting-started/0.1/references/iota-networks.md#devnet). The Devnet is similar to the Mainnet, except the tokens are free. Any transactions that you send to the Devnet do not exist on other networks such as the Mainnet.

1. Require the IOTA client library

    ```js
    const Iota = require('@iota/core');
    ```

2. Create an instance of the IOTA object and use the `provider` field to connect to a node

    ```js
    const iota = Iota.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
    });
    ```

3. Go to [devnet.thetangle.org](https://devnet.thetangle.org/) and find a confirmed transaction

    :::info:Can't find a confirmed transaction?
    Click a transaction hash in the Latest milestones box, then click the branch transaction hash. This transaction is referenced and approved by the milstone, so it is in a confirmed state.
    :::

4. Pass the transaction hash to the [`getLatestInclusion()`](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.getLatestInclusion) method to check if the IRI node's latest solid subtangle milestone approves it

    ```js
    iota.getLatestInclusion(['TRANSACTION HASH'])
    .then(states => console.log(states));
    ```

    When you execute the file, you should see an array that contains the `true` boolean, meaning that the transaction is confirmed.

    :::info:
    You could also use the `getInclusionStates()` method to check if a transaction is approved by an array of your own chosen transactions.
    :::

5. Go to [devnet.thetangle.org](https://devnet.thetangle.org) and find a pending transaction

    :::info:Can't find a pending transaction?
    Click a transaction hash in the Latest transactions box. This transaction is a tip, so it is in a pending state.
    :::

6. Pass the transaction hash to the `getLatestInclusion()` method to check if the IRI node's latest solid subtangle milestone approves it

    ```js
    iota.getLatestInclusion(['TRANSACTION HASH'])
    .then(states => console.log(states));
    ```

    When you execute the file, you should see an array that contains the `false` boolean, meaning that the transaction is not yet confirmed.

## Run the code

Click the green button to run the sample code in this guide and see the results in the web browser.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Check-transaction-confirmation?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Next steps

[Increase the likelihood of a pending transaction being confirmed](../how-to-guides/confirm-pending-bundle.md)

