# Create an account

**An account is a stateful client library that makes it easier to send and receive transactions without worrying about reusing addresses or promoting and reattaching pending transactions.**

You can use accounts to do the following:

* Create and manage conditional deposit addresses (CDAs), which specify whether they're active and may used in withdrawals or deposits.
* Store the state of a seed

## Withdrawls and deposits

In accounts, the terms withdrawal and deposit are used to refer to the use of CDAs in bundles that transfer IOTA tokens.

The term _withdrawal_ is used to refer to the use of CDAs in [input transactions](root://iota-basics/0.1/concepts/bundles-and-transactions.md) where IOTA tokens are withdrawn from an address. The term _deposit_ is used to refer to the use of CDAs in outputs transactions where IOTA tokens are deposited into an address.

A withdrawal can involve multiple expired CDAs, depending on total deposit amount and the balance of the CDAs.

## Seed state

|**Data**| **Function**|
|:-----------------|:----------|
|The last key index that was used to create a CDA| To be able to create a new CDA that has never been used before|
|All active CDAs|To stop withdrawals from CDAs that may receive deposits|
|Pending transfers| To be able to monitor pending transactions and rebroadcast or reattach them if necessary|

You can create multiple accounts, and each one can manage the state of only one unique seed.

:::important:Important:
You must not create multiple accounts with the same seed. Doing so could lead to a race condition where the seed state would be overwritten.

If you have never created an account before, you must create a new seed. Existing seeds can't be used in an account because their states are unknown.
:::

## Create a new account

1. Create an `account` object with a new seed and connect to a node
   
   ```js
   import { createAccount } from '@iota/account';
   import { trytesToTrits } from '@iota/converter';

   const seed = trytesToTrits('ASFITGPSD9ASDFKRWE...');

   // Local node to connect to;
   const provider = 'http://<node-url>:14265';

   const account = createAccount({
         seed,
         provider
   });
   ```
    :::info:
    If you want to use a seed from a particular location, for example a hardware wallet, you can make a custom `SeedProvider` object, and pass it to the `WithSeed()` method in step 5.

    If you want to connect to a different node, you can pass the `account` object a custom `api` object

    ```js
    import { composeAPI } from '@iota/core';

    const api = composeAPI({
            // Local node to connect to;
            provider: 'http://<node-url>:14265';
    });

    const account = createAccount({
            seed,
            api
    });
    ```
    :::

2. Pass a **`persistenceAdapater`** object to your account. This adapter creates a storage object to which the account can save the seed state.

   ```JS
   import { persistenceAdapter } from '@iota/persistence-adapter-level';

   const account = createAccount({
         seed,
         persistenceAdapter
   });
   ```

   :::info:
    The [`@iota/persistence-adapter-level`](https://github.com/iotaledger/iota.js/tree/next/packages/persistence-adapter-level) adapter is the default adapter, but you could edit it for your needs.

    You can't use one store instance for multiple accounts at the same time. A private adapter is instantiated for each account instance.
    :::

3. (optional) Pass a `timeSource` method that outputs the current time in milliseconds to your `account` object

   ```js
   const account = createAccount({
         timeSource: () => {
               // Get time with NTP
               // const time = ...
               return time
         }
   })
   ```

:::success:Congratulations!
:tada: You've created an account that will automate promoting and reattaching transactions as well as manage your CDAs.
:::

## Import existing seed state

To import an existing seed state into an account, ... By default the seed state is the project's root. When importing state a new db is created.. The seed state must be in the correct format.