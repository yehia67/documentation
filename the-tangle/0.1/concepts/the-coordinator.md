# The Coordinator and its milestones

**The Coordinator is a client that sends signed bundles called milestones to a node at regular intervals. Nodes confirm transactions when they're chosen by the tip selection algorithm and approved by a milestone.**

The Coordinator acts as a temporary safety mechanism until the majority of transactions in the network are honest.

An IOTA network relies on clients to send a majority of honest transactions to nodes. But, the fewer transactions in a network, the easier it is for an attacker to overwhelm it with dishonest transactions. As a result, an attacker may be able to double spend tokens, and carry out network-splitting attacks.

To protect the network against these attacks, the Coordinator sends bundles of honest transactions to nodes at regular intervals. These bundles include a signed zero-value transaction called a milestone.

Nodes in an IOTA network reach a consensus on transactions that are directly or indirectly approved by milestone.