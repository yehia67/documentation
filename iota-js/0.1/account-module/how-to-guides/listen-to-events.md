# Listen to events in an account

**An account object emits events when they happen. An example of an event is when you make or receive a payment. You can listen for these events and act on them.**

## Prerequisites

[Create an account](../how-to-guides/create-account.md).

This guide assumes that you understand the concept of [events in Node.js](https://nodejs.org/api/events.html). Event listeners are used to assign callbacks to specific event types. You should always [remove event listeners](https://nodejs.org/api/events.html#events_emitter_removelistener_eventname_listener) when you're finished with them.

## Monitor your account for incoming and outgoing payments

When your account's connected nodes receive a bundle that affects your balance, your account can trigger two types of event: One when the bundle is in a **pending** state, and one when it's in an **included** (confirmed) state.

Any incoming payments to your account are called deposits, and outgoing payments are called withdrawals.

1. Attach listeners to your account for deposit and withdrawal events

    ```js
    account.on('pendingDeposit', ({ address, bundle }) => {
        console.log('Receiving a new payment')
        console.log('Address:', address, 'Tail transaction hash:', bundle[0].hash);
    });

    account.on('includedDeposit', ({ address, bundle }) => {
        console.log('Received a new payment')
        console.log('Address:', address, 'Tail transaction hash:', bundle[0].hash);
    });

    account.on('pendingWithdrawal', ({ address, bundle }) => {
        console.log('Outgoing payment is pending')
        console.log('Address:', address, 'Tail transaction hash:', bundle[0].hash);
    });

    account.on('includedWithdrawal', ({ address, bundle }) => {
        console.log('Outgoing payment confirmed')
        console.log('Address:', address, 'Tail transaction hash:', bundle[0].hash);
    });
    ```

2. Subscribe to `error` events. These events are useful for debugging your application and reacting to exceptions that may be thrown in the background.

    ```js
    account.on('error', (error) => {
        console.log(`Something went wrong: ${error}`);
    });
    ```

    :::info:
    An event is triggered for each transaction in the connected node's ledger that affects any active CDAs in your account.
    :::

:::success:Congratulations! :tada:
You're account can now emit events that you can listen to and act on.
:::

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

## Next steps

Now that you have an event listener, start [making payments to/from your account](../how-to-guides/create-and-manage-cda.md) to test it.


