# Compass overview

**Compass is an open-source implementation of the Coordinator. You can use Compass to run your own IOTA network for testing and development purposes.**

IOTA is a distributed network of nodes that validate transactions and store them. Before nodes can update the balance of an address, they must reach a consensus on any transactions that lead to the updated balance. When nodes reach a consensus, on transactions, those transactions are confirmed.

On the IOTA Mainnet, the [Coordinator](root://the-tangle/0.1/concepts/the-coordinator.md) creates, signs, and sends bundles that contain milestones. The nodes on this network use these milestone to reach a consensus. Any transaction that's referenced and approved by a milestone is confirmed.

Compass is an open-source implementation of the Coordinator. You can use Compass to allow the nodes in your own IOTA network to reach a consensus on Compass' milestones instead of the Coordinator's ones.

To allow your nodes to reach a consensus, you must configure your nodes to recognize Compass milestones. Then, you can configure Compass to send milestones to one of your nodes at regular intervals.

:::info:
[Create your own IOTA network](../how-to-guides/create-an-iota-network.md).
:::

## Repository

Go to the Compass source code on [Github](https://github.com/iotaledger/compass)

## Further reading 

- [IOTA papers discussing the Tangle and other protocol features](https://www.iota.org/research/academic-papers)
- [A series of posts discussing the removal of the Coordinator](https://blog.iota.org/coordinator-part-1-the-path-to-coordicide-ee4148a8db08)
