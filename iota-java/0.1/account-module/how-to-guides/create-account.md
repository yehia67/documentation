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

* Java 6 (or higher)
* [Install the client library](../introduction/overview.md#install-the-library)

:::warning: Create a new seed
If you have never created an account before, you must [create a new seed](root://getting-started/0.1/tutorials/get-started.md) because existing seed states are unknown.
:::

## Create a new account

In this example, we connect to a [Devnet node](root://getting-started/0.1/references/iota-networks.md#devnet). The Devnet is similar to the Mainnet, except the tokens are free. Any transactions that you send to the Devnet do not exist on other networks such as the Mainnet.

:::danger:Important
Although the account has default settings, we recommend that you provide at least a seed and a storage provider such as MongoDB. Otherwise, the seed state will not be saved after the code stops running.
:::

1. Create an `IotaAPI` object that connects to a node
   
    ```java
    IotaAPI api = new IotaAPI.Builder()
                    
                    .host("nodes.devnet.iota.org")
                    
                    .port(443)
                    
                    .protocol("https")
                    
                    .timeout(500)
                    .build();
    ```

2. Create a variable to hold your seed

    ```java
    String mySeed = "PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX";
    ```

    :::danger:Protect your seed
    You should never hard code a seed as we do here. Instead, we recommend that you read the seed from a protected file.

    If you want to use a seed from a particular location, for example a hardware wallet, you can make a custom `SeedProvider` object, and pass it to the `Builder()` constructor.
    :::

3. Create a storage object to which the account can save the seed state. In this example, the seed state is stored in a Memory Store database.

    ```Java
    AccountStore store = new AccountStoreImpl(new MemoryStore());
    ```

    :::info:
    In storage, each account has a unique ID, which is a hash of an address with index 0 and security level 2.

    As a result, you can use the same storage object for multiple accounts at the same time.
    :::

4. Create the account using your custom settings
   
   ```java
   IotaAccount account = new IotaAccount.Builder(mySeed)
    
                    .store(store)
                    .api(api)
                    .build();
    ```

    :::info:Default settings
    If you don't specify any custom settings, the account uses the [defaults](https://github.com/iotaledger/iota-java/blob/dev/jota/src/main/java/org/iota/jota/config/types/IotaDefaultConfig.java).
    :::

:::success:Congratulations! :tada:
You've created an account that will automatically promote and reattach transactions as well as manage the state of your CDAs.
:::

### Connect to multiple nodes

1. If you want to connect to multiple nodes, you can either create a `HttpConnector` object, or define a custom class.

    ```java
    // Create an HTTP node using the default settings
    Connection node = new HttpConnector(
                    "http",
                    "localhost",
                    1337, 
                    // Optional connection timeout
                    500
                );
                    
    // Or create a custom node defined by a class
    Connection customNode = new MyCustomNodeClass();

    // Pass that to the builder
    IotaAPI api = new IotaAPI.Builder()
                    // Enable local proof of work
                    .localPoW(new PearlDiverLocalPoW())
                    // And add the extra nodes
                    .addNode(node)
                    .addNode(customNode)
                    .build();

    ```

## Import existing seed state

To import an existing seed state into an account, pass the storage object to the `store()` method. The seed state must be in the correct format.

## Next steps

After certain events happen in your account, it emits them, and allows you to listen for them. For example, you may want to monitor your account for new payments. To do so, you need to [create an event listener](../how-to-guides/listen-to-events.md).

Or, you can [create a plugin](../how-to-guides/create-plugin.md) that also emits events.
