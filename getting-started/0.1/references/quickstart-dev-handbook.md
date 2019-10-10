# IOTA developer's handbook

This handbook gives you a walk through the IOTA technology to help you to identify how best you can leverage it in your own applications. 

## What is an IOTA network?

An IOTA network is a collection of interconnected nodes that each store a copy of the Tangle. In each IOTA network, the Tangle contains different transactions, so the distribution of IOTA tokens is different in each one.

The IOTA Foundation maintains three permissionless networks, where anyone can run a node, connect to them, and read/write transactions.

Permissionless networks are public, so any data you send in a transaction is open to anyone. But, you can always protect the data in transactions through encryption and the use of MAM channels. 

|**Type** |**Status**|**Description**|
:-----|:------|:---------|
|Mainnet|Active and growing|The main IOTA network, where the IOTA token has value that's traded on platforms such as cryptocurrency exchanges. This network consists of thousands of nodes and is open to everybody. 
|Devnet|Active|The development IOTA network where the IOTA token has no value except for testing purposes. This network is like the Mainnet except it takes less time and computational power to create and send a transaction.

Learn more about the [permissionless IOTA networks](../references/iota-networks.md). 

### Can I run a private IOTA network?

IOTA is an open-source technology, so anyone is free to run their own IOTA network and make it public. We call a private IOTA network a **private Tangle**.

A private Tangle is an IOTA network that you control and that contains only nodes that you know. This type of network uses the same technology as the public IOTA networks, except you control it.

Any IOTA tokens on a private Tangle are not valid on the IOTA Mainnet, and as such, they do not have any value.

### Which IOTA network is best for me?

The best IOTA network for application will depend on its status and your needs.

:::info:
The IOTA protocol is in beta development, so in the future some breaking changes may occur.
:::

For all of these networks, you need the following skills:

* Software developer, with experience in one of the supported [client libraries](root://client-libraries/0.1/introduction/overview.md) (for sending requests to a node)

* Knowledge of maintaining servers (for running a node on the Mainnet)

|**Your needs**|**Application status**|**Network**|
|:------|:-------|:-----------------|
|You want to test transactions that transfer IOTA tokens, but you don't want to buy any. You also don't mind who owns the IOTA nodes that validate or store your transactions.|Under development |Devnet|
|You want to control the performance of the network, who the nodes are, and which clients can access the Tangle. You are not interested in using the valuable IOTA tokens on the Mainnet.|Under development|Private Tangle|
|You want to use the valuable IOTA token and you don't mind who owns the IOTA nodes that validate or store your transactions|Production ready|Mainnet|

### What is the cost of using the IOTA Mainnet?

The IOTA Mainnet is free to use. There are no costs associated for sending IOTA transactions to an IOTA node, nor any processing fee. IOTA is a fee-less protocol. 

Sending IOTA data transactions does not require clients to own any cryptocurrency.

Some nodes (permanodes) such as https://thetangle.org might offer clients the option to permanently store all transactions. Transactions are usually deleted from the ledgers of nodes as a result of a [local snapshot](root://node-software/0.1/iri/concepts/local-snapshot.md).

This costs is usually requested as a monthly fee paid in fiat currency.

Another option is to deploy a local IOTA node, connect it to the IOTA Mainnet (by peering it with existing IOTA nodes) and send your own transactions to it. Such node will permanently (if enabled to do so) store all your transactions and will process your transactions before any other transaction (you can even stop other clients from sending transactions to your node).

This option will require minimum cost associated with the deployment (physical or virtual) of a low-end server.

### How do I use the Mainnet in my app?

The easiest way to send transactions on the Mainnet is to use our client libraries to build the IOTA logic of your application.

Your application or service needs to connect to a node on the IOTA Mainnet. In the client libraries such as JavaScript, you usually define which node to connect to in the `provider` field.

```js
// Require the core package
const Iota = require('@iota/core');

// Create a new instance of the IOTA object
// Use the `provider` field to specify which node to connect to
const iota = Iota.composeAPI({
provider: 'https://nodes.thetangle.org:443'
});
```

:::info:
See a [partial list of available Mainnet nodes](https://iota.dance/).
:::

:::warning:
Not all the nodes support remote proof of work (PoW). So, if your client wants to send a transaction to one of these nodes, it will have to use [another PoW option](root://dev-essentials/0.1/concepts/minimum-weight-magnitude.md).
:::

When you're connected to a node, you need to build a transfer object that specifies what you want to send and to which address.

```js
const transfers = [
    {
        value: 0,
        address: address,
        message: message,
        tag: tag,
        obsoleteTag: obsoleteTag 
    }
    ];
```

:::info:
[Learn more about the structure of a transaction](root://dev-essentials/0.1/references/structure-of-a-transaction.md).
:::

When you're ready to send the transaction to your node, make sure that you use the correct minimum weight magnitude. The MWM on the Mainnet is 14.

```js
iota.prepareTransfers(seed, transfers)
        .then(trytes => {
            return iota.sendTrytes(trytes, 3/*depth*/, 14/*minimum weight magnitude*/)
        })
        .then(bundle => {
        console.log(`Bundle: ${JSON.stringify(bundle, null, 1)}`)
    })
    .catch(err => {
            // Catch any errors
        console.log(err);
    });
```

:::info:
[See our tutorial for sending a transaction](../tutorials/send-a-zero-value-transaction-with-nodejs.md).
:::

#### Things to consider when using third-party nodes on the Mainnet

Connecting to third-party nodes is convenient, but comes at a disadvantage if you need a reliable service. For example:

* Your transactions will compete with other transactions that the node receives and will be processed with a priority that the node decides
* You might be requested to pay for fast PoW computation or to provide a transaction that includes PoW
* A copy of your transactions might be kept only for a limited time that's decided by the node
* A permanode option (e.g. permanent storage of your transactions) might require a fee

To overcome these disadvantages, we recommend that you run your own node and connect your application to it for direct access to the Tangle. Your own node gives you more control on how fast your transactions are attached to the Tangle and allows you to store them permanently.

:::info:
You can [run a node in a Docker container](root://node-software/0.1/iri/how-to-guides/run-an-iri-node-in-docker.md) or [download and run it on a Linux server](root://node-software/0.1/iri/how-to-guides/run-an-iri-node-on-linux.md).
:::

### How do I use the Devnet in my app?

The Devnet is similar to the Mainnet, except the tokens are free. Any transactions that you send to the Devnet do not exist on other networks such as the Mainnet.

:::info:
[Get some free test tokens](../tutorials/receive-test-tokens.md)
:::

In the same way as you use the Mainnet, the easiest way to send transactions on the Devnet is to use our client libraries to build the IOTA logic of your application.

To switch between the Devnet and Mainnet, just change the `provider` field to the URL of a Devnet node such as https://nodes.devnet.iota.org:443, and change the minimum weight magnitude to 9.

### How do I set up a private Tangle?

To set up a private Tangle you need to run a local IOTA IRI node and an instance of Compass (our open-source Coordinator).

:::info:
[Learn how to set up a private Tangle](root://compass/0.1/how-to-guides/set-up-a-private-tangle.md).
:::

### Useful links

* [Run a node on Amazon Web Services (AWS)](https://gitlab.com/iot.fabian.rami/iota-aws-full-node) (not tested)
* [Read our application blueprints](root://blueprints/0.1/introduction/overview.md) to see how you can create an application on IOTA

## IOTA and the Internet of Things

The goal of IOTA is to allow devices on the Internet of Things (IoT) to transfer data and make payments among each other.

While most IoT devices have enough computational power to sign and send IOTA transactions, some low-end devices are not powerful enough to calculate the necessary proof of work. For these devices, we recommend choosing another option for calculating proof of work.

:::info:
An example of a device that can do proof of work is the [STM X-Cube-IOTA1](https://www.st.com/en/embedded-software/x-cube-iota1.html). This devices uses the IOTA C client library as middleware.
:::

We are also currently working on how best to integrate IOTA into cloud IoT environments (such as AWS IoT and Google Cloud IoT). This integration will allow you to seamlessly transfer IoT data among physical devices through the Tangle.

## A note on Masked Authenticated Messaging

MAM (Masked Authenticated Messaging) is a second layer communication protocol that allows you to create and read encrypted data streams on the IOTA Tangle. 

MAM is particularly suitable for streaming sensitive data on the Tangle. 

Currently, we have a JavaScript MAM library. To use this library, you need one of the following:

* An IoT device that can run Node.js such as a Raspberry Pi
* A server that can run Node.js to act as a MAM proxy to which your device can connect

:::info:
[Learn how to stream sensor data on a Raspberry Pi through MAM channels](root://utils/0.1/community/raspberry-pi-pub-sub/overview.md).
:::

The IOTA community maintains some client library wrappers that allow you to use MAM in different languages:

* [XDK2MAM wrapper for Bosch XDK platform](https://xdk2mam.io/)

* [Wrapper for LoRA devices](https://github.com/xdk2mam/xdk2mam/tree/Workbench-3.6/lora-sdcard)

## Smart contracts

We are developing our own solution to smart contracts, called Qubic. IOTA smart contracts will go beyond the simple transfer of funding when a specific condition is met. In fact, the ambition of Qubic is to not only allow smart contracts, but also provide outsourced quorum computing for IoT devices. 

:::info:
[Learn more about Qubic and see what's on the roadmap](https://qubic.iota.org/intro).
:::
