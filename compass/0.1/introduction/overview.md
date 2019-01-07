# Compass

[Compass is an open-source Coordinator](concepts/about-the-coordinator-and-compass.md), which protects IOTA networks against attacks. In an IOTA network that uses Compass, the Coordinator does not exist. Any transaction that is referenced by a Compass milestone transaction is considered confirmed.

Compass allows you to create a permissioned IOTA network that doesn't rely on the Coordinator. A permissioned IOTA network is beneficial for the following use cases:
* **Security testing and research:** Use Compass to create a controlled environment to test assumptions and produce attacks.
* **Development of proof of concepts:** Use Compass to develop proof-of-concept applications without sharing your ideas on a [permissionless (public) network](/getting-started/references/iota-networks.md). 

**Note:** By releasing Compass, the IOTA Foundation aims to further its research into finding a viable replacement for the Coordinator.

## Limitations

Compass issues milestone transactions. Compass can't modify balances or censor transactions because milestone transactions are validated by each IRI node in the network.

Compass is a [Daemon process](https://en.wikipedia.org/wiki/Daemon_(computing)) that runs without interaction after it's initiated. As a result, Compass has no public APIs that clients can use to interact with it.

## Repository
Jump directly to the Compass source code on [Github](https://github.com/iotaledger/compass)