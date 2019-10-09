# Create an account

**An account is an object that makes it easier to handle payments. You can use your account on any IOTA network to send and receive IOTA tokens.**

One of the many benefits of using accounts is that you can define conditions in which your addresses are active or expired. These conditions help senders to decide whether it's safe to send tokens to an address. For this reason, addresses in accounts are called _conditional deposit addresses_ (CDA).

## Conditional deposit addresses

In the IOTA protocol, IOTA tokens must be sent to [addresses](root://dev-essentials/0.1/concepts/addresses-and-signatures.md), which are derived from your [seed](root://getting-started/0.1/introduction/what-is-a-seed.md). These addresses may be withdrawn from only once. As a result, it's important that no one deposits IOTA tokens into a withdrawn address. But, it's difficult to know when or if someone is going to deposit IOTA tokens into your address before you withdraw from it.

In accounts, addresses come with extra features that allow you to specify the conditions in which they may be used in payments. These addresses are called conditional deposit addresses (CDA).

Accounts use CDAs to help reduce the [risk of withdrawing from spent addresses](root://dev-essentials/0.1/concepts/addresses-and-signatures.md#address-reuse). When you request IOTA tokens from someone, you can create a CDA that's active for a certain period of time. This way, you let the sender know that you intend to withdraw from that address only after that time. As a result, the sender can decide whether to make a deposit, depending on how much time is left on a CDA.

## Seed state

An account is linked to one seed whose state is stored in a local database on your device.

To keep track of payments, this database stores the state of all CDAs. This state is called the seed state.

Accounts use this data to keep a history of activity and to avoid making unnecessary API calls to nodes.

|**Data**| **Purpose**|
|:-----------------|:----------|
|The last key index that was used to create a CDA| Create a new CDA that has never been used before|
|All active CDAs|Stop withdrawals from CDAs that may receive deposits|
|Pending transfers| Monitor pending transactions and rebroadcast or reattach them if necessary|

## Prerequisites

To complete this tutorial, you need the following:

* Access to a command prompt
* A code editor such as [Visual Studio Code](https://code.visualstudio.com/Download)

* Node.js 8, or Node.js 10 or higher. We recommend the [latest LTS](https://nodejs.org/en/download/).

:::warning: Create a new seed
If you have never created an account before, you must [create a new seed](root://getting-started/0.1/tutorials/get-started.md) because existing seed states are unknown.
:::

## Create a new account

In this example, we connect to a [Devnet node](root://getting-started/0.1/references/iota-networks.md#devnet). The Devnet is similar to the Mainnet, except the tokens are free. Any transactions that you send to the Devnet do not exist on other networks such as the Mainnet. 

1. Create an `account` object with a new seed and connect to a node
   
      ```js
      const { createAccount }  = require('@iota/account')

      const seed = 'PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX';

      // Connect to a node;
      const provider = 'https://nodes.devnet.iota.org:443';

      const account = createAccount({
            seed,
            provider
      });
      ```

      By default, the local database is saved in the root of the project

      :::warning:Protect your seed
      Never hard code a seed as we do here. Instead, we recommend that you read the seed from a protected file.
      :::

      :::danger:Create one account instance per seed
      You must not create multiple instances of an account with the same seed. Doing so could lead to a race condition where the seed state would be overwritten.
      :::

:::success:Congratulations! :tada:
You've created an account that will automatically promote and reattach transactions as well as manage the state of your addresses.
:::

## Customize your account

Instead of using the default account settings, you can customize them to change how your account behaves.

1. To change how your account interacts with its connected nodes, customize the values of the `depth`, `minWeightMagnitude`, `delay`, and `maxDepth` fields

      ```js
      const account = createAccount({
            seed,
            provider,

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
      ```

2. To customize the database settings that store your seed state, pass a `persistenceAdapter` factory to your account. This adapter creates a local database object to which the account can save the seed state. By default, the local database is saved in the root of the project. You can change the path to the local database in the `persistencePath` field.

      ```js
      const { createPersistenceAdapter }  = require('@iota/persistence-adapter-level')

      const account = createAccount({
            seed,
            provider,
            persistencePath: './',
            persistenceAdapter: createPersistenceAdapter
      });
      ```

      :::info:
      The [persistence-adapter-level](https://github.com/iotaledger/iota.js/tree/next/packages/persistence-adapter-level) package is the default. This adapter stores the seed state in the `leveldown` flavor of the [LevelDB database](https://github.com/google/leveldb). You can customize this adapter to use a different database.

      You can't use one adapter instance for multiple accounts at the same time. A private adapter is created for each new account.
      :::

3. CDAs expire after a time that you define. To have your account use a custom source of time, create a `timeSource` method that outputs the current time in milliseconds, and pass it to your `account` object

      ```js
      const account = createAccount({
            seed,
            provider,
            timeSource: () => {
                  // Get time with NTP
                  // const time = ...
                  return time
            }
      })
      ```

## Next steps

After certain events happen in your account, it emits them, and allows you to listen for them. For example, you may want to monitor your account for new payments. To do so, you need to [create an event listener](../how-to-guides/listen-to-events.md).
