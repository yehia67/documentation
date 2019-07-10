# Listen to events in an account

**An account object emits events when they happen. An example of an event is when you send funds to other accounts or receive a deposit. You can listen for these events and act on them.**

## Prerequisites

This guide assumes that you understand the concept of events in Node.js (https://nodejs.org/api/events.html). Event listeners are used to assign callbacks to specific event types. You should always [remove event listeners](https://nodejs.org/api/events.html#events_emitter_removelistener_eventname_listener) when you're finished with them.

## Listening to deposit and withdrawal events

Deposit and withdrawal events are emitted as soon as a deposit or withdrawal bundle is detected. Each of those bundles may trigger events in two steps: One for its **pending** state, and one for its **included** (confirmed) state.

Callbacks are given an object as an argument, which contains the relevant address and the complete deposit or withdrawal bundle.

1. Attach listeners for deposit and withdrawal events

    ```js
    account.on('pendingDeposit', ({ address, bundle }) => {
        console.log('Address:', address, 'Tail transaction hash:', bundle[0].hash);
        // ...
    });

    account.on('includedDeposit', ({ addresses, bundle }) => {
        console.log('Address:', address, 'Tail transaction hash:', bundle[0].hash);
        // ...
    });

    account.on('pendingWithdrawal', ({ address, bundle }) => {
        // ...
    });

    account.on('includedWithdrawal', ({ addresses, bundle }) => {
        // ...
    });
    ```

2. Subscribe to `error` events, which are useful for debugging your application and reacting to exceptions that may be thrown in the background

    ```js
    account.on('error', (error) => {
        console.log(`Something went wrong: ${error}`);
    });
    ```

3. Generate a CDA and set it to expire tomorrow

    ```js
    const cda = account
        .generateCDA({
            timeoutAt: Date.now() + 24 * 60 * 60 * 1000,
            expectedAmount: 100
        });
    ```

4. Send a deposit to the CDA
    ```js
    cda
        .tap(cda => console.log('Sending to:', cda.address))
        .then(cda =>
            account.sendToCDA({
                ...cda,
                value: 100
            })
        )
        .catch(error => console.log(error));
    ```

    :::info:
    An event is triggered for each transaction in the connected node's ledger that withdraws from or deposits into one of your CDAs.
    :::

In the output, you should see an address and a tail transaction hash when the transaction is pending, and the same address and tail transaction hash when the transaction is confirmed.

## Account events

|**Event name**|**Callback arguments**|
| :----------| :----------|
|`pendingDeposit`|`{ address, bundle }`|
|`includedDeposit`|`{ address, bundle }`|
|`pendingWithdrawal`|`{ address, bundle }`|
|`includedWithdrawal`|`{ address, bundle }`|
|`selectInput`|`{ transfer, input }`|
|`prepareTransfer`|`{ transfer, trytes }`|
|`getTransactionsToApprove`|`{ trytes, { trunkTransaction, branchTransaction } }`|
|`attachToTangle`|`transactionObjects`|
|`broadcast`|`transactionObjects`|
|`error`|`Error`|

:::success:Congratulations! :tada:
You're account is now emitting events that you can listen to and act on.
:::
