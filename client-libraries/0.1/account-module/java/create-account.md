# Create an account

**In this guide, you create an account to keep track of your seed state in a local database.**

## IOTA network

In this guide, we connect to a node on the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet).

## Code walkthrough

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

    :::info:
    If you want to use a seed from a particular location, for example a hardware wallet, you can make a custom `SeedProvider` object, and pass it to the `Builder()` constructor.
    :::

3. Create a storage object to which the account can save the seed state. In this example, the seed state is stored in a Memory Store database.

    ```Java
    AccountStore store = new AccountStoreImpl(new MemoryStore());
    ```

    :::info:
    In the database, each account has a unique ID, which is the hash of the account's address with index 0 and security level 2.

    As a result, you can use the same storage object for more than one account at the same time.
    :::

4. Create the account, using your custom settings. If you don't specify any custom settings, the account uses the [defaults](https://github.com/iotaledger/iota-java/blob/dev/jota/src/main/java/org/iota/jota/config/types/IotaDefaultConfig.java).
   
   ```java
   IotaAccount account = new IotaAccount.Builder(mySeed)
    
                    .store(store)
                    .api(api)
                    .build();
    ```

:::success:Congratulations! :tada:
You've created an account that will automatically promote and reattach transactions as well as manage the state of your CDAs.
:::

### Connect to a quorum of nodes

1. If you want to connect to more than one node, you can either create a `HttpConnector` object, or define a custom class.

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

After certain events happen in your account, it emits them, and allows you to listen for them. For example, you may want to monitor your account for new payments. To do so, you need to [create an event listener](../java/listen-to-events.md).

Or, you can [create a plugin](../java/create-plugin.md) that also emits events.
