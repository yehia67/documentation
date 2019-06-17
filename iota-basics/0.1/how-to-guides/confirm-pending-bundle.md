# Confirm a pending bundle

**To be approved by a milestone, a transaction must be selected during tip selection, which favors new transactions over old ones. Therefore, the longer a bundle is stuck in a pending state, the less likely it is to be confirmed. To increase the chances of a bundle being confirmed, you can reattach and promote it, depending on the circumstances.**

:::info:First time using a client library?
[Try our quickstart guide](root://getting-started/0.1/tutorials/get-started.md) for getting started with the official client libraries.
:::

:::info:
If you're unfamiliar with the terms reattach, rebroadcast, or promote, we recommend that you [read about these concepts](../concepts/reattach-rebroadcast-promote.md).
:::

## Prerequisites

To complete these guides, you need the following:

* Node.js 8, or Node.js 10 or higher. We recommend the [latest LTS](https://nodejs.org/en/download/).
* A code editor such as [Visual Studio Code](https://code.visualstudio.com/Download)
* An Internet connection
* A tail transaction hash ([`currentIndex` 0](../references/structure-of-a-bundle.md)) from any pending bundle. You can create one by following the ['Send a bundle of zero-value transactions' guide](../how-to-guides/send-bundle.md)

## Confirm a pending bundle

A bundle can be stuck in a pending state for many reasons, for example if it's too old to be selected during tip selection or if it's attached to a part of the Tangle that leads to an invalid state such as a double-spend (inconsistent subtangle).

In this guide, you'll create a script that does the following every 30 seconds:

* Check if the tail transaction of a bundle on the [Devnet](root://getting-started/0.1/references/iota-networks.md#devnet) has been confirmed
* If the transaction is still pending, promote or reattach it

### Step 1. Create a timer function

If you want to know how long it took for a bundle to be confirmed, create a timer function.

1. In the pending-to-confirmed.js file, require the IOTA library

    ```js
    const Iota = require('@iota/core');
    ```

2. Create a variable to store the tail transaction hash of the pending bundle that you want to confirm as well as the tail transaction hashes of any future reattached bundles

    ```js
    const tails = ["tail transaction hash"];
    ```

3. Create a variable to store the number of seconds for the timer

    ```js
    var seconds = 0;
    ```

4. Set the timer to measure how long it takes for the bundle to be confirmed. Every second, the timer will increment the `seconds` variable by one.

    ```js
    var timer = setInterval(stopWatch, 1000);
    function stopWatch (){
    seconds++
    }
    ```

### Step 2. Create a function to auto-promote and auto-reattach bundles

To promote and reattach a bundle, you need to pass its tail transaction hash to the relevant function in the client library.

The [`isPromotable()`](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.isPromotable) method checks if the tail transaction is consistent and was not attached to the Tangle before the most recent 6 milestones.

If the tail transaction is promotable, the [`promoteTransaction()`](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.promoteTransaction) method promotes it.

If the tail transaction isn't promotable, the [`replayBundle()`](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.replayBundle) method reattaches the bundle, then the new reattached bundle's tail transaction hash is added to the `tails` array so that it can be checked for confirmation later on.

```js
function autoPromoteReattach (tail) {
  iota.isPromotable(tail)
    .then(promote => promote
    ? iota.promoteTransaction(tail, 3, 14)
        .then(()=> {
            console.log(`Promoted transaction hash: ${tail}`);
        })
    : iota.replayBundle(tail, 3, 14)
        .then(([reattachedTail]) => {
            const newTailHash = reattachedTail.hash;

            console.log(`Reattached transaction hash: ${tail}`);

            // Keep track of all reattached tail transaction hashes to check for confirmation
            tails.push(newTailHash);
        })
    )
    .catch((error)=>{
         console.log(error);
    });
}
```

### Step 3. Create a function to check for confirmation at regular intervals

To be able to check the array of tail transactions for confirmation at regular intervals, you need a function that can be passed to a `setInterval()` function.

The [`getLatestInclusion()`](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.getLatestInclusion) method checks if any of the tail transactions in the array have been confirmed. If any of the transactions have been confirmed this method returns `true`.

The `tail` variable stores the last tail transaction in the array so that the latest reattachment can be promoted or reattached.

If none of the tail transactions have been confirmed yet, the `tail` variable is passed to the [`autoPromoteReattach()`](#create-a-function-to-auto-promote-and-auto-reattach-bundles) function.

If a tail transaction has been confirmed, it's logged to the console along with the number of minutes it took to confirm.

```js
function autoConfirm(tails){
console.log(tails);
    iota.getLatestInclusion(tails)
        .then(states => {
            // Check that none of the transactions have been confirmed
            if (states.indexOf(true) === -1) {
                // Get latest tail hash
                const tail = tails[tails.length - 1]
                autoPromoteReattach(tail);
            } else {
                console.log(JSON.stringify(states,null, 1));
                clearInterval(interval);
                clearInterval(timer);
                var minutes = (seconds / 60).toFixed(2);
                var confirmedTail = tails[states.indexOf(true)];
                console.log(`Confirmed transaction hash in ${minutes} minutes: ${confirmedTail}`);
                return;
            }
        }).catch(error => {
            console.log(error);
        }
    );
}
```


## Run the code

Click the green button to run the sample code in this guide and see the results in the web browser.

Before you run this sample code, find a pending tail transaction hash and store it in the `tails` array.

    :::info:Can't find a pending transaction?
    Go to [devnet.thetangle.org](https://devnet.thetangle.org) and click a transaction hash in the Latest transactions box. This transaction is a tip, so it is in a pending state.
    :::

<iframe height="500px" width="100%" src="https://repl.it/@jake91/Confirm-pending-bundle?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

:::info:
This sample code may take a few minutes to complete. If you see `Started autoConfirm() function => undefined`, the code is running in the background. Wait until the code finishes. You should see messages appear in the console.
:::
