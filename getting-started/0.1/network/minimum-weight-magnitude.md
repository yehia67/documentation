# Minimum weight magnitude

**When doing [proof of work](../transactions/proof-of-work.md) for a [transaction](../transactions/transactions.md), you can specify a minimum weight magnitude (MWM), which defines how much work is done. Nodes accept a certain minimum weight magnitude, depending on their configuration. If you use a minimum weight magnitude that is too low, nodes will reject the transaction as invalid.**

## Advice for choosing a minimum weight magnitude

When choosing a minimum weight magnitude, you should consider the following questions.

### Which IOTA network am I using?

All nodes accept transactions whose hashes end in the same or higher number of 0 trits as their predefined MWM. If a transaction ends in fewer 0 trits than the MWM, the nodes in that network will reject it.

For example, on the Mainnet, you must use at least a MWM of 14. If you were to send a transaction whose hash ended in nine (the MWM on the Devnet) 0 trits, nodes on the Mainnet would not accept it. Those nodes would expect the transaction hash to end in at least fourteen 0 trits.

### Are you testing IOTA?

Every increment of the MWM triples the difficulty of the PoW. As a result, if you're testing IOTA, you may want to use the Devnet where proof of work is quicker and easier to do.

