# What is a node?

**A node is a device that has read and write access to the Tangle in an IOTA network. All nodes store a copy of the Tangle and a record of addresses that hold IOTA tokens. Clients can send their bundles to any node in an IOTA network so it can validate the transactions, attach them to the Tangle, and forward them to other nodes.**

Nodes can attach a bundle's transactions to the Tangle only if those transactions directly reference two existing ones. So, before clients send a bundle to a node, they ask it for two existing transactions to use as references. To select these transactions, nodes use an algorithm called tip selection that validates their history and makes sure that it includes no counterfeit transactions. As a result, transactions approve the two existing transactions that they reference.

When clients send a bundle to a node, the node does some basic checks to make sure that the transactions in it are valid, for example that the values of transactions don't exceed the total global supply. At this point, the transactions in the bundle are considered 'attached' to [the Tangle](../introduction/what-is-the-tangle.md).

After attaching transactions to the Tangle, the node sends it to the other nodes that it's connected to, called neighbors. Then, those nodes send it to their neighbors, and so on. This way, all nodes validate all transactions and attach them to their own copy of the Tangle. This process is called gossiping.

IOTA is a permissionless DLT. So, nodes can be run by anyone, including individuals and businesses. Node owners often don't open them to the public because a high volume of API calls can be costly. As a result, we suggest that you run your own node for direct access to an IOTA network.

If you can't run your own node, you can use the public ones in Trinity or use websites such as [IOTA Dance](https://iota.dance) to find a list them.

To use any IOTA network, you can interact with a node through the [client libraries](root://client-libraries/0.1/introduction/overview.md). Many IOTA applications, such as [Trinity](root://trinity/0.1/introduction/overview.md), use one of these client libraries behind the scenes.

[Learn more about node software](root://node-software/0.1/iri/introduction/overview.md).
