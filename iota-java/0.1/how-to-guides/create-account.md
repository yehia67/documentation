# Create an account

**An account is an object that makes it easier to send and receive transactions. Accounts store data such as addresses and pending bundle hashes in a local database. This data allows you to interact with an IOTA network without worrying about reusing spent addresses or promoting and reattaching pending transactions.**

In accounts, all addresses are more than simple IOTA addresses. These addresses are called [conditional deposit addresses (CDAs)](../how-to-guides/create-and-manage-cda.md). A CDA defines not only the 81-tryte address, but also the conditions in which that address may be used in a [transfer bundle](root://getting-started/0.1/introduction/what-is-a-bundle.md).

## Seed state

The data that accounts store in a local database is called the seed state. Accounts use this data to keep a history of activity and to avoid making unnecessary API calls to nodes.

|**Data**| **Purpose**|
|:-----------------|:----------|
|The last key index that was used to create a CDA| Create a new CDA that has never been used before|
|All active CDAs|Stop withdrawals from CDAs that may receive deposits|
|Pending transfers| Monitor pending transactions and rebroadcast or reattach them if necessary|

## Create a new account

To create an account, you need to create an `IotaAPI` object to connect to an IOTA network and an `IotaAccount` object to manage a seed.

:::danger:Important:
Although the `IotaAccount` object has default settings, we recommend that you provide at least a seed and a storage provider such as MongoDB. Otherwise, the seed state will not be saved after the code stops running.
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

2. Create a variable to hold a seed

    ```java
    String mySeed = "ASFITGPSD9ASDFKRWE...";
    ```

    :::danger:Protect your seed
    You should never hard code a seed as we do here. Instead, we recommend that you read the seed from a protected file.
    :::

    :::danger:Use a new seed
    If you have never created an account before, you must create a new seed because existing seed states are unknown.
    :::

    :::danger:Create one account per seed
    You must not create multiple accounts with the same seed. Doing so could lead to a race condition where the seed state would be overwritten.
    :::

    :::info:
    If you want to use a seed from a particular location, for example a hardware wallet, you can make a custom `SeedProvider` object, and pass it to the `Builder()` constructor in step 4.
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

:::success:Congratulations! :tada:
You've created an account that will automatically promote and reattach transactions as well as manage the state of your CDAs.
:::

### Connect to multiple IRI nodes

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

[Create a CDA so that you can send and receive transactions](../how-to-guides/create-and-manage-cda.md).