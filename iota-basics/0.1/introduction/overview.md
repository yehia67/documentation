# IOTA basics overview

**An IOTA network consists of nodes and clients. A node is a device that has read/write access to a ledger of transactions. A client is a device that has a seed. A seed gives a client access to [addresses](../concepts/addresses-and-signatures.md). Addresses have a balance, which defines the amount of IOTA tokens in them. To withdraw IOTA tokens from their addresses, clients must send bundles of transactions to a node so that the nodes can validate the transactions and update their ledgers.**

## Clients

Like an account number and sort code, an address in IOTA is a unique string of 81 characters ([trytes](../concepts/trinary.md)) that are unique to each seed.

:::info:
Sometimes addresses have 90 characters. The extra 9 characters are called the checksum, which helps you make sure your address is correct.
:::

Clients on the network send each other data or IOTA tokens to each other's addresses in [bundles, which contain transactions](../concepts/bundles-and-transactions.md).

Transactions are objects that are [structured according to the rules (protocol) of the nodes in the IOTA network](../references/structure-of-a-transaction.md). Each transaction is an operation that instructs a node to withdraw IOTA tokens, deposit IOTA tokens, or simply store the transaction.

:::info:
The IOTA [client libraries](root://client-libraries/0.1/introduction/overview.md) contain all the tools you need, including those to create addresses and bundles.

Any code that uses a seed is executed on the client side. Your seed never leaves your device.
:::

## Nodes

Nodes are like a cross between a post office and a bank. They keep a ledger of every transaction that they receive and the non-zero balances of all addresses in the network.

Nodes have an [API](root://iri/0.1/references/api-reference.md), which allows clients to read from the ledger and send bundles.

Nodes [validate transactions](root://iri/0.1/concepts/transaction-validation.md) according to a set of rules, one of which states that withdrawals must contain a valid [signature](../concepts/addresses-and-signatures.md). When a transaction is considered valid, the node adds it to its ledger and updates the balances of the affected addresses.

### Trust

You might be wondering how you can trust a node. After all, connecting to a node is the only way to read from and write to the Tangle. What if a node were to change the response to an API endpoint such as [`getBalances`](root://iri/0.1/references/api-reference.md#getBalances)? How would you know what your real balance is?

Well, IOTA is a [distributed ledger technology](root://getting-started/0.1/introduction/what-is-dlt.md). The word _distributed_ is the key. When a node receives a transaction, validates it, and appends it to its ledger, it doesn't stop there. The IOTA protocol states that all nodes must forward transactions onto other nodes, called their neighbors. This way, all nodes receive, validate, and store a consistent, distributed ledger of transactions, removing the need to trust any individual. As a result, you can send requests to multiple nodes and check the consistency of the returned data.

### Immutability

What stops a node from being able to change a transaction?

The first step to transaction immutability is to hash its contents into 81 trytes. This hash is unique to the transaction. If one character of the transaction's contents were to be changed, the hash would be invalid.

The next step is to connect the transaction (called a child) to two others (called its parents) by referencing their transaction hashes in the `branchTransaction` and `trunkTransaction` fields. Now, the fate of the child transaction is bound to its parent. If the contents of either parents change, their transaction hashes will be invalid, making the child invalid.

This connected structure in the ledger is what's called [the Tangle](root://the-tangle/0.1/introduction/overview.md), a tangled family of transaction hashes where any new orphaned child (with no parents), called a tip transaction, must reference two parents. As a result, the more children a transaction has, the more transaction hashes that are connected to it, and the more immutable it is considered.

### Scalability

Scalability is the capability of a network to handle a growing amount of work. In IOTA, where billions of Internet-of-things devices are expected to transact on the network, scalability is essential.

You've already seen that transactions reference each other to strengthen their immutability in the Tangle. But, what's also important about the the Tangle is how parents are chosen.

Before a client can send a transaction to a node, that transaction must reference two parents. Transactions, up to the last one in a bundle, will always reference each other in their `trunkTransaction` fields. So, what about the `branchTransaction` field and the `trunkTransaction` and `branchTransaction` fields of the last transaction in the bundle?

The parents in these fields are chosen by a node during [tip selection](root://the-tangle/0.1/concepts/tip-selection.md). A process where a node starts from an old transaction and traverses its children, grandchildren, and so on, until it finds one without any parents (the selected tip).

While traversing transactions, the node must [validate their entire bundle](root://iri/0.1/concepts/transaction-validation.md#bundle-validator). As a result, by having the node validate the history of the tip transactions and by referencing their transaction hashes, **a child approves its parents' bundles and their entire history**.

Because every bundle approves two new bundles, the more bundles in the network, the faster new ones are approved.

