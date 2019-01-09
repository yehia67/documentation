# About Compass

An IOTA network relies on a majority of honest transactions propagating through the IRI nodes. However, the fewer transactions that are sent in an IOTA network, the easier it is for an attacker to make the IRI nodes propagate more dishonest transactions than honest ones.

If an attacker were to send the IRI nodes more dishonest transactions than the total number of honest transactions in an IOTA network, that attacker may be able to double spend tokens, and carry out network-splitting attacks.
 
Compass is an open-source Coordinator that acts as a temporary safety mechanism in a permissioned IOTA network until the majority transactions in it are honest.
 
Compass sends bundles to IRI nodes at regular intervals. These bundles include a signed zero-value transaction called a milestone. The IRI nodes in an IOTA network consider a transaction as confirmed only if it's directly or indirectly referenced by a milestone.

**Note:** IRI nodes must be configured to recognize milestones that are published by Compass. 
 
## Further Reading 

To learn more about the Coordinator, read the following resources:
- [IOTA Papers discussing the Tangle and other protocol features](https://www.iota.org/research/academic-papers)
- [A series of posts discussing the removal of the Coordinator](https://blog.iota.org/coordinator-part-1-the-path-to-coordicide-ee4148a8db08)
