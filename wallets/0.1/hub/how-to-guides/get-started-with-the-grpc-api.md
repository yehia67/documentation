# Get started with the gRPC API

**Hub exposes some gRPC methods that you can call using any gRPC client. These methods allow you to manage users' tokens by interfacing with the Hub database and an IOTA node. In this guide, you learn the basics of the gRPC API to create a new user with some new deposit addresses.**

## Prerequisites

You must have [installed Hub](../how-to-guides/install-hub.md) and it must be running on the same server as the one you use in this guide.

## Step 1. Set up the gRPC client

Before you can send API calls, you need a gRPC client that can create them.

:::info:
This guide helps you to test the gRPC API with [a GRPCC command-line client](https://github.com/njpatel/grpcc).

For production environments, we recommend generating client code from one of the available [gRPC libraries](https://grpc.io/about/).
:::

1. Install npm

    ```bash
    sudo apt install -y npm
    ```

2. Install the `grpcc` package

    ```bash
    sudo npm install -g grpcc
    ```

3. Change into the `hub` directory

    ```bash
    cd hub
    ```

3. Start the gRPC client

    ```bash
    grpcc -i -a localhost:50051 -p proto/hub.proto
    ```

    :::info:
    If you see an error message about a binary not being installed, try removing your `node_modules` directory, then reinstall the `grpcc` package with the following command: `sudo npm install -g --unsafe-perm grpcc`.
    :::
    
    You should see something like the following:

    ```bash
    Connecting to hub.rpc.Hub on localhost:50051. Available globals:

    client - the client connection to Hub
        createUser (CreateUserRequest, callback) returns CreateUserReply
        getBalance (GetBalanceRequest, callback) returns GetBalanceReply
        getDepositAddress (GetDepositAddressRequest, callback) returns GetDepositAddressReply
        userWithdraw (UserWithdrawRequest, callback) returns UserWithdrawReply
        userWithdrawCancel (UserWithdrawCancelRequest, callback) returns UserWithdrawCancelReply
        getUserHistory (GetUserHistoryRequest, callback) returns GetUserHistoryReply
        processTransferBatch (ProcessTransferBatchRequest, callback) returns ProcessTransferBatchReply
        balanceSubscription (BalanceSubscriptionRequest, callback) returns BalanceEvent
        getStats (GetStatsRequest, callback) returns GetStatsReply
        sweepSubscription (SweepSubscriptionRequest, callback) returns SweepEvent
        getAddressInfo (GetAddressInfoRequest, callback) returns GetAddressInfoReply
        sweepInfo (SweepInfoRequest, callback) returns SweepEvent
        signBundle (SignBundleRequest, callback) returns SignBundleReply
        sweepDetail (SweepDetailRequest, callback) returns SweepDetailReply

    printReply - function to easily print a unary call reply (alias: pr)
    streamReply - function to easily print stream call replies (alias: sr)
    createMetadata - convert JS objects into grpc metadata instances (alias: cm)
    printMetadata - function to easily print a unary call's metadata (alias: pm)

    Hub@localhost:50051> (node:6023) DeprecationWarning: grpc.load: Use the @grpc/proto-loader module with grpc.loadPackageDefinition instead
    ```

    :::info:
    These methods are all documented in the [gRPC API reference](../references/grpc-api-reference.md).
    :::

## Step 2. Deposit IOTA tokens into Hub

When you have a gRPC client, you can use it to send API calls to Hub to manage users and their deposits.

1. Create a new user

    ```bash
    client.createUser({userId: "Jake"}, pr)
    ```

    :::info:
    The `createUser()` method takes a `CreateUserRequest` object. You can search for that object in the [API reference](../references/grpc-api-reference.md#hub.rpc.CreateUserRequest).

    The `pr` argument is a pre-built callback function that prints the result to the console.
    :::

    Now, you have a new user in the database.

    :::info:
    You can see this user in the Hub database by [querying the `user_account` table](../how-to-guides/query-the-database.md).
    :::

2. Create a new deposit address for the user

    ```bash
    client.getDepositAddress({userId: "Jake"}, pr)
    ```

    You should see a new deposit address in the console.

3. Create a new deposit address with the checksum

    ```bash
    client.getDepositAddress({userId: "Jake", includeChecksum: true}, pr)
    ```

    Now, the user has two addresses that were created from two different `seeduuid` fields. You can see this data in the database by [querying the `user_address` table](../how-to-guides/query-the-database.md).

    :::info:
    In the database, addresses are always saved without the checksum.
    :::

4. Send some IOTA tokens to one of the user's deposit addresses

    :::info:
    [Trinity](root://wallets/0.1/trinity/introduction/overview.md) is the official IOTA wallet, which makes it easy to send IOTA tokens.
    ::: 

5. Get the balance and history for the user  

	```bash
	client.getBalance({userId: "Jake"}, pr)
	```

If you sent IOTA tokens to the deposit address in step 4, the output should display something like the following:

```shell
10 i available for 'Jake'
History:
events {
	timestamp: 1540856214000
	type: DEPOSIT
	amount: 10
}
```

If you look at the deposit address history in a Tangle explorer such as [thetangle.org](https://thetangle.org/), you will see that Hub moved the funds away from the deposit address and into another address (Hub owner's address where funds are aggregated until a user requests a withdrawal). This process is called a [sweep](../concepts/sweeps.md).

6. Press **Ctrl**+**C** twice to stop the gRPC client

:::success:Congratulations :tada:
You've successfully created a new user and tested how Hub handles deposits of IOTA tokens.
:::

## Next steps

[Set up a demo exchange](../how-to-guides/create-a-demo-exchange.md) to test an integration of Hub.

[Integrate Hub into your exchange](../how-to-guides/integrate-hub.md).




