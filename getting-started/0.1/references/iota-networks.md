# Public IOTA networks

**IOTA has two public networks of [nodes](../basics/nodes.md). Each network has its own [Tangle](../basics/the-tangle.md) to which nodes can attach [transactions](../basics/transactions.md). You can choose to connect and send [bundles](../basics/bundles.md) to nodes on any public network.**

A public IOTA network is one that anyone can join and use. All transactions in a public IOTA network are transparent. Anyone can see the transactions and balances of all addresses.

IOTA has the following public networks:

- **Mainnet:** IOTA token

- **Devnet:** Devnet token (free)

All permissionless networks consist of nodes and the Coordinator.

:::info:
If you want to create and test an application on a private network, you can do so by running an instance of the open-source Coordinator code called [Compass](root://compass/0.1/introduction/overview.md). This way, your transactions and balances are kept private, and the tokens have no real-world value.
:::

## Mainnet

When you buy [IOTA tokens](../basics/token.md) from a cryptocurrency exchange, those tokens are valid on the Mainnet.

:::info:
Cryptocurrency exchanges sell IOTA tokens in units of Mega IOTA (1,000,000), which is also written as MIOTA or Mi.
:::

![Mainnet configuration](../images/mainnet-configuration.png)

### Minimum weight magnitude

Transactions on the Mainnet must use a [minimum weight magnitude](root://getting-started/0.1/basics/proof-of-work.md#minimum-weight-magnitude) (MWM) of 14 to be valid.

### Coordinator address

Nodes on the Mainnet are all hard-coded with the following address for the [Coordinator](../basics/the-coordinator.md):

```
EQSAUZXULTTYZCLNJNTXQTQHOMOFZERHTCGTXOLTVAHKSA9OGAZDEKECURBRIXIJWNPFCQIOVFVVXJVD9
```

## Devnet

The Devnet is similar to the Mainnet, except the tokens are free.

On this network, you can test your applications and build proofs of concept that use free Devnet tokens.

![Devnet Configuration](../images/devnet-configuration.png)

### Minimum weight magnitude

Transactions on the Devnet must use a [minimum weight magnitude](root://getting-started/0.1/basics/proof-of-work.md#minimum-weight-magnitude) (MWM) of 9 to be valid.

Compared to the Mainnet, this MWM reduces the time it takes for proof of work (PoW) to be completed. So, it takes less time and computational power to create and send a transaction.

### Coordinator address

Nodes on the Devnet are all hard-coded with the following address for the [Coordinator](../basics/the-coordinator.md):

```
EQQFCZBIHRHWPXKMTOLMYUYPCN9XLMJPYZVFJSAY9FQHCCLWTOLLUGKKMXYFDBOOYFBLBI9WUEILGECYM
```

### Nodes

The IOTA Foundation hosts the following public nodes on the Devnet:

#### Load balancer node

This endpoint gives you access to a high-availability proxy server, which is running a node on the Devnet.

Use the load balancer for sending transactions and requesting information about the ledger from the node.

**URL:** https://nodes.devnet.iota.org:443

#### ZMQ node

This endpoint gives you access to the zero message queue of a node on the Devnet.

**URL:** tcp://zmq.testnet.iota.org:5556

#### PoW node

This endpoint gives you access to a node that can do remote proof of work.

Use the PoW node to save power on small devices.

**URL:** https://powbox.devnet.iota.org