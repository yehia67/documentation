# GoShimmer

**GoShimmer is a work-in-progress prototype of a node software that allows nodes to reach a consensus without the Coordinator, allowing IOTA networks to be decentralized.**

## What is a GoShimmer node?

GoShimmer nodes run the prototype software that includes the following Coordicide modules:

* **Auto-peering:** Each new node on the network tries to connect to four neighbors and accepts connections from a further four neighbors
* **Node identities:** Each node creates a unique public/private key pair. The public key is used to identify nodes during auto-peering. In the future, these identities will allow nodes to receive mana.

When all the modules become available, the GoShimmer nodes will become the Coordicide testnet, which is a release candidate for the next IOTA protocol.

## Why run a GoShimmer node?

By running a GoShimmer node, you can test the cutting-edge developments in the next stage of the IOTA protocol.

:::info:
[Find out more about mana and the other modules in the full Coordicide solution](https://coordicide.iota.org).
:::

## Next steps

[Run GoShimmer](../how-to-guides/run-the-node.md) to get started with testing the modules.



