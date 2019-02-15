# IOTA basics overview

**IOTA introduces new concepts that are essential to learn before you start using an IOTA network.**

An IOTA network consists of clients, which own addresses and IOTA tokens, and nodes, which run the network that clients use.

Similar to a street address, an [address](../concepts/addresses-and-signatures.md) in IOTA is a unique string of 81 characters ([trytes](../concepts/trinary.md) that let's other clients on the network send you packets, called transactions.

Transactions can contain tryte-encoded messages or IOTA tokens for an address. To send one or more transactions to any number of addresses, first they must be packaged in a [bundle](../concepts/bundles-and-transactions.md) and [structured according to the rules (protocol) of the nodes in the IOTA network](../references/structure-of-a-transaction.md).

Nodes are like a cross between a post office and a bank. They keep a ledger of every transaction that they receive and the non-zero balances of all addresses in the network. For a node to allow the withdrawal of IOTA tokens from an address, the transaction must be valid. Nodes [validate transactions](root://iri/0.1/concepts/transaction-validation.md) according to a set of rules, one of which states that withdrawals must contain a valid [signature](../concepts/addresses-and-signatures.md). When a transaction is considered valid, the node adds it to its ledger and updates the balances of the affected addresses.

**Tip:** The IOTA [client libraries](root://client-libraries/0.1/introduction/overview.md) provide you with all the tools you need, including those to create addresses, signatures, and bundles. All the methods that handle seeds are executed on the client side (your computer), to make sure that they're never sent anywhere insecure.

## Trust

You might be wondering how you can trust a node. After all, it's responsible for protecting the balance of your addresses.

Well, IOTA is a [distributed ledger technology](root://getting-started/0.1/introduction/what-is-dlt.md). The word _distributed_ is the key. When a node receives a transaction, validates it, and appends it to its ledger, it doesn't stop there. The IOTA protocol states that all nodes must forward transactions onto other nodes, called their neighbors. This way, all nodes receive and validate all transactions, and all nodes hold a consistent, distributed ledger, removing the need to trust any individual.

## immutability

So, what stops a node from being able to change a transaction? The IOTA protocol defines rules that make transactions immutable.

The first step to transaction immutability is to hash its contents into 81 trytes. This hash is unique to the transaction. If one character of the transaction's contents were to be changed, the hash would be invalid.

The next step is to connect the transaction (called a child) to two others (called its parents) by referencing their transaction hashes in the `branchTransaction` and `trunkTransaction` fields. Now, the fate of the child transaction is bound to its parent. If the contents of either parents change, their transaction hashes will be invalid, making the child invalid.

This connected structure in the ledger is what's called [the Tangle](root://the-tangle/0.1/introduction/overview.md), a tangled family of transaction hashes where any new orphaned child (with no parents), called a tip transaction, must reference two parents. As a result, the more children a transaction has, the more transaction hashes that are connected to it, and the more immutable it is considered.

## Scalability

Scalability is the capability of a network to handle a growing amount of work. In IOTA, where billions of Internet-of-things devices are expected to transact on the network, scalability is essential.

You've already seen that transactions reference each other to strengthen their immutability in the Tangle. But, what's also important about the the Tangle is how parents are chosen.

Before a client can send a transaction to a node, that transaction must reference two parents. Transactions, up to the last one in a bundle, will always reference each other in their `trunkTransaction` fields. So, what about the `branchTransaction` field and the `trunkTransaction` and `branchTransaction` fields of the last transaction in the bundle?

The parents in these fields are chosen by a node during [tip selection](root://the-tangle/0.1/concepts/tip-selection.md). A process where a node starts from an old transaction and traverses its children, grandchildren, and so on, until it finds one without any parents (the selected tip).

While traversing transactions, the node must [validate their entire bundle](root://iri/0.1/concepts/transaction-validation.md#bundle-validator). As a result, by having the node validate the history of the tip transactions and by referencing their transaction hashes, **a child approves its parents' bundles and their entire history**.

Because every bundle approves two new bundles, the more bundles in the network, the faster new ones are approved.

