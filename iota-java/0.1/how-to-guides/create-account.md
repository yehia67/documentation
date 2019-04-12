# Create an account

<<<<<<< HEAD
**An account is an object that makes it easier to send and receive transactions. Accounts store information such as addresses and pending bundle hashes in a local database. This stored information allows you to interact with an IOTA network without worrying about reusing addresses or promoting and reattaching pending transactions.**
=======
**An account is an object that makes it easier to send and receive transactions. Accounts store information such as addresses and pending bundle hashes in a database. This stored information allows you to interact with an IOTA network without worrying about reusing addresses or promoting and reattaching pending transactions.**
>>>>>>> 8fd7e314f01cb40910050fd5fafde15ae38f4101

In accounts, all addresses are more than simple IOTA addresses. These addresses are called [conditional deposit addresses (CDAs)](../how-to-guides/create-and-manage-cda.md). A CDA defines not only the 81-tryte address, but also the conditions in which that address may be used in a bundle.

* **address (required):** An address
* **timeout_at (required):** The time at which the address expires

And one of the following, recommended fields:

* **multi_use (recommended):** A boolean that specifies if the address may be sent more than one deposit. Cannot be used in combination with `expected_amount` in the same CDA.
* **expected_amount (recommended):** The amount of IOTA tokens that the address is expected to contain. When this amount is reached, the address is considered expired. We highly recommend using this condition. Cannot be used in combination with `multi_use` in the same CDA.

:::info:
The combination of both `expected_amount` and `multi_use` in the same CDA is not supported. Both fields are designed for different scenarios. Please refer to the [CDA FAQ](../references/cda-faq.md) for more information.
:::

## Withdrawals and deposits

Accounts are made up of many addresses that are in either an active or expired state. The state of an address determines whether it can be used in a withdrawal or a deposit.

The term _withdrawal_ is used to refer to the use of CDAs in [input transactions](root://iota-basics/0.1/concepts/bundles-and-transactions.md) where IOTA tokens are withdrawn from an address. A withdrawal can involve multiple expired CDAs, depending on total deposit amount and the balance of the CDAs.

The term _deposit_ is used to refer to the use of CDAs in outputs transactions where IOTA tokens are deposited into an address.

You can't withdraw tokens from an active address, but depositors can deposit tokens into them.

You can withdraw tokens from an expired addresses, but depositors can't deposit tokens into them.

## Seed state

|**Data**| **Purpose**|
|:-----------------|:----------|
|The last key index that was used to create a CDA| Create a new CDA that has never been used before|
|All active CDAs|Stop withdrawals from CDAs that may receive deposits|
|Pending transfers| Monitor pending transactions and rebroadcast or reattach them if necessary|

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