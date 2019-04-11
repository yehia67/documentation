# Create an account

**An account is an object that makes it easier to send and receive transactions. Accounts store information such as addresses and pending bundle hashes in a database. This stored information allows you to interact with an IOTA network without worrying about reusing addresses or promoting and reattaching pending transactions.**

You can use accounts to do the following:

* Create and manage conditional deposit addresses (CDAs), which specify whether they're active and may used in withdrawals or deposits.
* Store the state of a seed in a database

## Withdrawls and deposits

Accounts are made up of many addresses that are in either an active or expired state. The state of an address determines whether it can be used in a withdrawal or a deposit.

The term _withdrawal_ is used to refer to the use of CDAs in [input transactions](root://iota-basics/0.1/concepts/bundles-and-transactions.md) where IOTA tokens are withdrawn from an address. A withdrawal can involve multiple expired CDAs, depending on total deposit amount and the balance of the CDAs.

The term _deposit_ is used to refer to the use of CDAs in outputs transactions where IOTA tokens are deposited into an address.

You can't withdraw tokens from an active address, but depositors can deposit tokens into them.

You can withdraw tokens from an expired addresses, but depositors can't deposit tokens into them.

## Seed state

|**Data**| **Function**|
|:-----------------|:----------|
|The last key index that was used to create a CDA| To be able to create a new CDA that has never been used before|
|All active CDAs|To stop withdrawals from CDAs that may receive deposits|
|Pending transfers| To be able to monitor pending transactions and rebroadcast or reattach them if necessary|

You can create multiple accounts, and each one can manage the state of only one unique seed.

:::danger:Important
You must not create multiple accounts with the same seed. Doing so could lead to a race condition where the seed state would be overwritten.

If you have never created an account before, you must create a new seed. Existing seeds can't be used in an account because their states are unknown.
:::

## Create a new account

To create an account, you need to create an `IotaAPI` object to connect to an IOTA network and an `IotaAccount` object to manage a seed.

:::danger:Important:
Although the `IotaAccount` object has default settings, we recommend that you provide at least a seed and a storage provider such as MongoDB. Otherwise, the seed state will not be saved after the code stops running.
:::

1. Create an `IotaAPI` object that connects to a node
   
    ```java
    IotaAPI api = new IotaAPI.Builder()
                    
                    .host(network)
                    
                    .port(port)
                    
                    .protocol("https")
                    
                    .timeout(500)
                    .build();
    ```

2. Create a variable to hold a seed

    ```java
    String mySeed = "ASFITGPSD9ASDFKRWE...";
    ```

    :::info:
    If you want to use a seed from a particular location, for example a hardware wallet, you can make a custom `SeedProvider` object, and pass it to the `Builder()` constructor in step 4.
    :::

3. Create a storage object to which the account can save the seed state. In this example, the seed state is stored in a Memory Store database.

    ```Java
    AccountStore store = new AccountStoreImpl(new MemoryStore());
    ```

    :::info:
    You can use the same storage object for multiple accounts at the same time. In storage, each account has a unique ID, which is created from a hash of an address with index 0 and security level 2.
    :::

4. Create the account using your custom settings
   
   ```java
   IotaAccount account = new IotaAccount.Builder(mySeed)
    
                    .store(store)
                    .api(api)
                    .build();
    ```

:::success:Congratulations! :tada:
You've created an account that will automatically promote and reattach transactions as well as manage the state your CDAs.
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