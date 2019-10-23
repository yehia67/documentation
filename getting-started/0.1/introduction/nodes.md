# What is a node?

**Nodes are the devices that make up an IOTA network. Like any distributed system, the nodes in an IOTA network are interconnected and gossip information among each other. So, when one node, no matter where it is in the world, receives a transaction, it will be forwarded to every other node in the network. This way, all nodes in an IOTA network can validate all transactions and store them.**

The collection of transactions that the nodes store is called [the Tangle](../introduction/the-tangle.md), and only nodes have direct access to it.

Because only nodes have access to the Tangle, the IOTA protocol uses a client/server model where clients connect to nodes to request access to it.

IOTA is a permissionless DLT. So, anyone can run a node, including individuals and businesses.

Node owners often don't open them to the public because a high volume of API calls can be costly. As a result, we suggest that you run your own node for direct access to an IOTA network.

If you can't run your own node, you can use the public ones in Trinity or use websites such as [IOTA Dance](https://iota.dance) to find a list them.

To use any IOTA network, you can interact with a node through the [client libraries](root://client-libraries/0.1/introduction/overview.md). Many IOTA applications, such as [Trinity](root://wallets/0.1/trinity/introduction/overview.md), use one of these client libraries behind the scenes.

[Learn more about the IRI node software](root://node-software/0.1/iri/introduction/overview.md) that nodes run on the public IOTA networks.
