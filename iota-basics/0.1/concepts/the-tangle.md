# The Tangle

**The Tangle is the immutable data structure that contains a history of IOTA transactions. All nodes in an IOTA network store a copy of the Tangle in their ledgers and can read from it and attach new transactions to it.**

The Tangle is a type of [directed acyclic graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph) (DAG), which is a sequence of vertices where every edge is directed from earlier to later in the sequence.

In the Tangle, vertices are transactions, and edges are references.

In this diagram, the numbered boxes represent transactions. The transactions on the left come first in the sequence, and the transactions on the right come after.

![A directed acyclic graph](../images/dag.png)

When a node attaches a new transaction to the Tangle, that transaction directly references two existing ones to the left of it.

:::info:
Nodes select these existing transactions during a process called [tip selection](root://node-software/0.1/iri/concepts/tip-selection.md). During this process, nodes [validate](root://node-software/0.1/iri/concepts/transaction-validation.md) the history of the selected transactions. As a result, any transaction that references another also approves it.
:::

In the Tangle, transactions reference each other through their [`branchTransaction` and `trunkTransaction` fields](root://iota-basics/0.1/references/structure-of-a-transaction.md). Each of these fields contains the transaction hash of another transaction.

If any of the transaction's contents were to change, the hash would change, thus breaking the references. As a result, when a transaction is attached to the Tangle, it's immutable.

:::info:
References form a family tree, whereby if a new transaction is a **child**, the branch and trunk transactions are its **parents**.

In this diagram, transaction 6 directly references transaction 5, so transaction 5 is a **parent** of transaction 6. On the other hand, transaction 6 indirectly references transaction 3, so, transaction 3 is a **grandparent** of transaction 6.
:::

## Consensus

Because the Tangle is distributed among all nodes, they must reach a consensus on which transactions to consider confirmed before they can update the balances of addresses.

A transaction is considered confirmed when it's directly or indirectly referenced by a transaction that's sent and signed by the Coordinator.

## The Coordinator

The Coordinator is an application that creates, signs, and sends bundles of transactions from the same address at regular intervals. Each of these bundles contains transactions called milestones that nodes use to reach a consensus. When milestones directly or indirectly reference a transaction in the Tangle, nodes mark the state of that transaction and its entire history as confirmed.

:::info:Coordicide
At the moment, we are focused on a project called [Coordicide](https://coordicide.iota.org/), which is a proposal for the removal of the Coordinator. When this happens, nodes will be able to reach a consensus without milestones.
:::

### Milestones

The Coordinator sends milestones to nodes at regular intervals. Nodes use these milestones to reach a consensus. 

To determine which transactions are milestones, all nodes in the same IOTA network know the address of the Coordinator.

When nodes see a transaction that's been sent from the Coordinator's address, they validate it by doing the following:

* Make sure that it doesn't lead to a double-spend
* Verify its signature

Because IOTA uses the Winternitz one-time signature scheme (W-OTS), a private key should sign only one bundle. To allow the Coordinator to sign multiple bundles whose signatures can still be verified against one address, that address is derived from the Coordinator's Merkle tree.

### The Coordinator's Merkle tree

A Merkle tree is a data structure that starts by hashing data at the leaves and ends at the Merkle root (the Coordinator's address).

![Example Merkle tree](../images/merkle-tree-example.png)

The Coordinator can sign and send one signed bundle for each leaf in its Merkle tree.

In this example, we have four leaves, which each represent one of the Coordinator's public/private key pairs. These key pairs are created in advance and used to compute the the Coordinator's address. The total number of key pairs in a Merkle tree depends on its depth in this formula: 2<sup>depth</sup>. In this example, the Merkle tree's depth is 2.

:::info:
On the Mainnet, the Coordinator's Merkle tree has a depth of 23. So, the Coordinator has 8,388,608 public/private key pairs and can send the same number of milestones.
:::

To compute the Coordinator's address, the public keys are hashed in pairs:

* **Node 1:** Hash(Hash(public key of leaf 1) Hash(public key of leaf 2))
* **Node 2:** Hash(Hash(public key of leaf 3) Hash(public key of leaf 4))
* **Coordinator's address:** Hash(Hash(node 1) Hash(node 2))

Node 1 is a hash of the result of hashing both the public key of leaf 1 and the public key of leaf 2. Node 2 is a hash of the result of hashing both the public key of leaf 3 and the public key of leaf 4. The Coordinator's address is a hash of the result of hashing the hash of node 1 and node 2.

:::info:
The Coordinator's private keys are derived from a seed, an index, and a security level.

On the Mainnet, these private keys are security level 2. As a result, the milestone signature is too large to fit in one transaction and must be fragmented across two.

[Learn more about how private keys are derived](root://iota-basics/0.1/concepts/addresses-and-signatures.md).
:::

### How nodes verify milestones

To verify milestones, nodes must rebuild the Merkle tree to find the Merkle root. If the rebuilt Merkle root is the same as the Coordinator's address, nodes know the milestone was sent by the Coordinator.

To allow nodes to rebuild the Merkle tree, the Coordinator sends the following milestones in the bundle:

* Two transactions that contain the fragmented signature
* One transaction whose [`signatureMessageFragment`](root://iota-basics/0.1/references/structure-of-a-transaction.md) field contains enough missing data from the Merkle tree to be able to rebuild it

![Example Merkle tree](../images/merkle-tree-example.png)

For example, as a node, we have seen a bundle that was signed with the private key of leaf 1.

First, we verify the signature to find out the public key of leaf 1.

:::info:
[Learn how nodes verify signatures](root://iota-basics/0.1/concepts/addresses-and-signatures.md#how-nodes-verify-signatures)
:::

To help us calculate the Merkle root, the third milestone in the bundle contains the following:

* The public key of leaf 2
* The hash of node 2

Now, we hash the public keys of leaves 1 and 2 to find the hash of node 1. Then we hash the hash of nodes 1 and 2 to find the Merkle root.

If the Merkle root is the same as the Coordinator's address, the bundle was signed with one of the private keys in the Coordinator's Merkle tree.

:::info:Want to run your own Coordinator?
Use Compass to create, sign, and send milestones in your own IOTA network.
:::

## Further research

We have an active research department that focuses on developing the Tangle and its related protocols.

* [Academic Papers](https://www.iota.org/research/academic-papers)
* [Roadmap](https://www.iota.org/research/roadmap)
