**Tip selection is the process whereby an IRI node selects two random tip transactions from its ledger.**

Tip selection is requested by clients so that they can reference the returned tip transactions in their new transactions.

## The tip selection process

The IRI selects a subgraph of the ledger and performs two weighted random walks through it. Each weighted random walk returns a tip transaction hash.

### Subgraph selection

A subgraph is a section of the ledger that contains all transactions between a milestone transaction and tip transactions.

The tip selection is performed on a subgraph of the ledger to save computational power.

The calculation of each transaction's cumulative weight requires computational power that uses your computer's RAM and CPU. Therefore, if the tip selection was performed on the entire ledger, it would take a long time to finish.

For the tip selection process, the milestone transaction is defined by the IRI node, and is calculated by doing the following:

    `latestMilestoneIndex` - `depth`

The result of this calculation is equal to the index of the milestone transaction that is used to form the subgraph.

### Weighted random walk

A weighted random walk is an algorithm that the IRI uses to find a path to a tip transaction in the ledger.

To increase the probability of selecting a path to new transactions, the algorithm favors a path through transactions that have a higher rating. This rating is called a cumulative weight.

The cumulative weight of a transaction is calculated using the following variables:
* **Future set:** Transactions that directly or indirectly reference the transaction
* **[`alpha` configuration parameter](references/iri-configuration-options.md#alpha):** A number that affects the randomness of the tip selection process

The IRI gives a high rating to a transaction with a large future set because it has a higher probability of being confirmed than one with a small future set. However, if the IRI were to rate transactions based only on this variable, the ledger would become a long, narrow chain of transactions, which are referenced by many other transactions. This would slow the rate of new transactions being appended to the ledger because new transactions would have to wait until they had a large enough future set before other transactions would reference them. So, to increase the speed at which new transactions are appended to the ledger, the IRI also uses the `alpha` configuration parameter to calculate the cumulative weight.

The `alpha` configuration parameter makes sure that the cumulative weight of each transaction is calculated with an element of randomness. This parameter allows the IRI to select some transactions that have a small future set and by doing so, increase the speed at which new transactions are appended to the ledger.  

For more information about the weighted random walk, and for an in-depth explanation about the theories surrounding the best value for the `alpha` configuration parameter, read our [blog post](https://blog.iota.org/confirmation-rates-in-the-tangle-186ef02878bb).
