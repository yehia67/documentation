**The IRI (IOTA reference implementation) is open-source software that defines the IOTA protocol. Computers that run the IRI are called IRI nodes.**

IRI nodes are the core of an IOTA network. They perform the following key functions:

- [Validate transactions](concepts/transaction-validation.md)
- [Append valid transactions to a ledger](concepts/the-ledger.md)
- [Agree on the global state of the distributed ledger](concepts/the-ledger.md) with other IRI nodes in the same IOTA network (reach consensus)
- [Allow client computers to connect to the IRI](how-to-guides/interacting-with-the-iri.md) so that they can interact with the ledger and have their transactions appended it

Without IRI nodes, IOTA networks wouldn't exist. No one would be able to send transactions because there would be no way of recording who sent what to whom.

Here are some benefits of [running your own IRI node](how-to-guides/running-the-iri.md):

- You have your own direct access to a ledger on an IOTA network instead of having to connect to someone else's IRI node
- You help the IOTA network to become more distributed by adding to the number of ledgers and validating your neighbor IRI node's transactions

## Types of IRI node

You can choose to run two types of IRI node, depending on your needs and amount of memory space on your computer:

- **Permanode:** An IRI node that keeps a record of all valid transactions in its ledger. Run a permanode if you want to keep a record of all valid transactions. You can run a permanode by setting the [`LOCAL_SNAPSHOTS_PRUNING_ENABLED` configuration parameter](references/iri-configuration-options#local-snapshots-pruning-enabled) to `false`.
- **Local snapshot node:** An IRI node that removes transactions from its ledger at regular intervals by doing a [local snapshot](concepts/local-snapshot.md). Run a local snapshot node if you don't care about keeping a record of all valid transactions and you want to minimize the size of your IRI node's ledger. By default, all IRI nodes are local snapshot nodes, and transactions older than one month are deleted from the ledger.

## Limitations

The IRI receives transactions and records them in its ledger, it doesn't create or sign transactions. To create or sign transactions, you must use client software such as the Trinity wallet or a client library and send the transactions to an IRI node.
