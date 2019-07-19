# Create an account

**An account is an object that makes it easier to handle payments and keep a history of pending and confirmed ones. You can use your account on any IOTA network.**

## Prerequisites

To complete this tutorial, you need the following:

* Access to a command prompt
* A code editor such as [Visual Studio Code](https://code.visualstudio.com/Download)
* An Internet connection
* Java 6 (or higher)
* [Download the client library](root://iota-java/0.1/README.md#download-the-library)

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

After certain events happen in your account, it emits them, and allows you to listen for them. For example, you may want to monitor your account for new payments. To do so, you need to [create an event listener](root://iota-js/0.1/how-to-guides/listen-to-events.md).

Or, you can [create a plugin](../how-to-guides/create-plugin.md) that also emits events.
