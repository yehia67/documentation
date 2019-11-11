# The Tangle

**The Tangle is the immutable data structure that contains an up-to-date history of [transactions](../transactions/transactions.md). All [nodes](../network/nodes.md) in an IOTA network store a copy of the Tangle and reach a consensus on its contents.**

Each transaction in the Tangle is attached to two previous transactions by the transaction hashes in its [branch and trunk transaction fields](../transactions/transactions.md#trunkTransaction).

These references form a data structure called a [directed acyclic graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph) (DAG), where transactions on the left come first in the sequence, and the transactions on the right come after.

![A directed acyclic graph](../images/dag.png)

    The arrows (also called edges) represent the references among transactions.
    The numbered boxes (also called a vertices) represent transactions

Thanks to these references, all transactions in the Tangle are immutable because if any transaction were to change, all the transaction hashes would become invalid and break the structure.

## Reference types

References in the Tangle can be one of two types:

- **Direct:** Connects a transaction with those in its branch and trunk transaction fields. For example, transaction 5 **directly** references transactions 2 and 3.

- **Indirect:** Connects a transaction with those that come before the ones in its branch and trunk transaction fields. For example, transaction 6 **indirectly** references transaction 3 (through transaction 5).

These references form a transaction's history, whereby if a transaction is a **child**, its direct references are its **parents** and its indirect references are its **grandparents**, and so on.

## Transaction validity

A transaction can be valid only if it references two other transaction's whose history does not conflict with it.

For example, if transaction 6 instructs a node to withdraw 10 Mi of [IOTA tokens](root://getting-started/0.1/clients/token.md) from an [address](root://getting-started/0.1/clients/addresses.md), the history of that transaction's parents must lead to a point where that address is sent at least 10 Mi.

## Transaction states

Because transactions can be attached to any part (subtangle) of the Tangle, it can grow in many different directions. Some of these directions may lead to a valid history, while others may lead to inconsistencies such as double spends (where the same IOTA tokens are spent in two different transactions).

As a result, all transactions start in a pending state and stay that way until the nodes reach a consensus on whether a transaction is confirmed.

At the moment, nodes consider a transaction confirmed if it is **directly or indirectly referenced by a transaction that's created and sent by the [Coordinator](../network/the-coordinator.md)** (milestone).

:::info:
If transaction 6 were a milestone, then transaction 5, 3, 2, and 1 would all be confirmed.
:::

## Tip transactions

Tip transactions are those that are not yet referenced by others. These transactions wait to be chosen by nodes during tip selection, at which point their history will be validated and they will referenced by a new tip transaction.

## Inconsistent subtangle

If a tip transaction is not valid, the nodes will not select it. As a result, the transaction and its history will never be confirmed. Those invalid transaction are sometimes called an inconsistent subtangle.