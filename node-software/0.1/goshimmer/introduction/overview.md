# GoShimmer

**GoShimmer is a work-in-progress prototype of an IOTA network that will lead to Coordicide. The goal of Coordicide is for the network to reach a consensus without the Coordinator, allowing IOTA networks to be decentralized. To reach this goal, GoShimmer consists of modules that each have a specific role. When all the modules become available, this network will become the Coordicide testnet, which is a release candidate for the next IOTA protocol.**

At the moment, GoShimmer includes the following modules:

* **Auto-peering:** Each new node on the network tries to connect to four neighbors and accepts connections from a further four neighbors
* **Node identities:** Each node creates a unique public/private key pair. The public key is used to identify nodes during auto-peering. In the future, these identities will allow nodes to receive mana.

:::info:
[Find out more about mana and the other modules in the full Coordicide solution](https://coordicide.iota.org).
:::

