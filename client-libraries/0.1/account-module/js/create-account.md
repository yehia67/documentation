# Create an account

**In this guide, you create an account to keep track of your seed state in a local database.**

## IOTA network

In this guide, we connect to a node on the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet).

## Code walkthrough

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

After certain events happen, your account emits them, and allows you to listen for them. For example, you may want to monitor your account for new payments. To do so, you need to [create an event listener](../js/listen-to-events.md).
