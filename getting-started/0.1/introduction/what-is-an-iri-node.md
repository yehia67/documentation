# What is an IRI node?

**An IRI node is a computer that's responsible for validating transactions and storing an immutible record of them in a ledger.**

When a client sends a bundle to an IRI node, it makes sure that the transactions are valid (for example, that the sender owns the IOTA tokens). If the transactions are valid, they're appended to the IRI node's ledger. After validating a transaction, the IRI node sends it to its neighbor IRI nodes so that the whole network can validate and store the same transaction.

A confirmed transaction is one that has been validated by all IRI nodes and approved by a milestone. You can't change past transactions because they form the immutible data structure called [the Tangle](../introduction/what-is-the-tangle.md).

To use any IOTA network, you can interact with an IRI node through the [client libraries](root://client-libraries/0.1/introduction/overview.md) or the [IRI API](root://iri/0.1/references/api-reference.md) (application programming interface). Many IOTA applications, such as [Trinity](root://trinity/0.1/introduction/overview.md), use one of the client libraries behind the scenes.

IRI nodes can be run by anyone, including individuals and businesses. While these groups run IRI nodes, they often don't open them to the public because a high volume of API calls can be costly to the owner. Therefore, we suggest that you run your own IRI node for direct access to an IOTA network.

If you can't run your own IRI node, you can use public ones in Trinity or use websites such as [IOTA Dance](https://iota.dance) to find a list of public IRI nodes.

[Learn more about IRI nodes](root://iri/0.1/introduction/overview.md).
