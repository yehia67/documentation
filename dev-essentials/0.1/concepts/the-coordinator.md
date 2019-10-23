### The Coordinator

The Coordinator is an application that creates, signs, and sends bundles of transactions from the same address at regular intervals. Each of these bundles contains transactions called milestones that nodes use to reach a consensus. When milestones directly or indirectly reference a transaction in the Tangle, nodes mark the state of that transaction and its entire history as confirmed.

:::info:Coordicide
At the moment, we are focused on a project called [Coordicide](https://coordicide.iota.org/), which is a proposal for the removal of the Coordinator. When this happens, nodes will be able to reach a consensus without milestones.
:::

### Milestones

The Coordinator sends milestones to nodes at regular intervals, and nodes use these milestones to reach a consensus. 

When nodes see a transaction that's been sent from the Coordinator's address, they validate it by doing the following:

* Make sure that it doesn't lead to a double-spend
* Verify its signature

Because IOTA uses the Winternitz one-time signature scheme (W-OTS), addresses must not be withdrawn from more than once. To allow the Coordinator to sign multiple bundles whose signatures can still be verified against one address, that address is derived from the Coordinator's Merkle tree.

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

[Learn more about how private keys are derived](root://dev-essentials/0.1/concepts/addresses-and-signatures.md).
:::
