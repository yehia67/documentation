# Minimum weight magnitude

**The minimum weight magnitude (MWM) is a variable that defines how much work is done during proof of work. During proof of work, the transaction hash is repeatedly hashed until it ends in the same number of 0 trits as the MWM. The higher the MWM, the harder the proof of work. When you interact with an IOTA network as a client, you must use the correct MWM for that network. Otherwise, your transaction won't be valid and the nodes will reject it.**

All nodes in an [IOTA network](root://getting-started/0.1/references/iota-networks.md) accept transactions whose hashes end in the same or higher number of 0 trits as their predefined MWM.

If a transaction ends in fewer 0 trits, the nodes in that network will reject it.

For example, on the Mainnet, the MWM is 14. So, all transaction hashes must end in that number of 0 trits.

If you were to send a transaction whose hash ends in 9 (the MWM on the Devnet) or 7 (the MWM on the Spamnet) 0 trits, no nodes on the Mainnet would accept it.

:::info:
Every increment of the MWM triples the difficulty of the PoW.
:::
