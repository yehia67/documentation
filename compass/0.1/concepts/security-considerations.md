# Security considerations

Compass is an open-source Coordinator for an IOTA network. Given its role within an IOTA network, the integrity of Compass is crucial. This page outlines the possible attacks that you must protect Compass from.

**Note:** Compass is in continual development and is to be used **only** in a testing and analysis environment. 

## Compass environment
If the operating system that Compass is running on is compromised, an attacker could access the seed. An attacker with the seed could send fraudulent milestones and disrupt the operation of the network.

## IRI node or network connection to the node
If the IRI node that Compass is connected to is compromised, an attacker could manipulate Compass to receive favorable treatment. Possible scenarios include the following:
- Return tip transactions that prioritize the attackers transactions over the regular tip selection algorithm.
- Return tip transactions that conflict with the ledger state (double spend IOTA tokens) causing Compass to send an inconsistent milestone. IRI will not accept this milestone and no more transactions will be confirmed.
- Stop propagating milestone transactions to the rest of the network, causing no more transactions to be confirmed.

## Compass seed
If the seed of Compass has been compromised then an attacker could send **one** milestone before Compass would shut down. In this situation, after sending a milestone, an attacker would be able to continue as the network's adversary-controlled Compass.

## Security Audit
Formal security audits have not been conducted on Compass. 