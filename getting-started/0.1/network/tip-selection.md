# Tip selection

**Each transaction in the Tangle must reference two previous transactions. Tip selection is the process whereby a node selects two random tip transactions from a subgraph of its ledger.**

In general, the tip selection algorithm selects transactions that have no parents. These transactions are called tips, hence the name 'tip selection'.

Although the tip selection algorithm is embedded in the [IRI node software](root://node-software/0.1/iri/introduction/overview.md), it isn't enforced by the network. Instead, nodes are given an incentive to use the tip selection algorithm.

## The tip selection process

When a client calls the [`getTransactionsToApprove`](root://node-software/0.1/iri/references/api-reference.md#getTransactionsToApprove) API endpoint, the node selects a subgraph (also known as a subtangle) of the ledger and does two weighted random walks through it. Each weighted random walk returns a tip transaction hash.

### Subgraph selection

A subgraph is a section of the ledger that contains all transactions between a milestone transaction and tip transactions.

The tip selection is done on a subgraph of the ledger to save computational power. The more transactions that a node includes in the weighted random walk, the longer the tip selection process takes.

For the tip selection process, the milestone transaction for the subgraph is defined by the client, and is calculated by doing the following:

`latestMilestoneIndex` - `depth`

The result of this calculation is equal to the index of the milestone transaction that is used to form the subgraph.

### Weighted random walk

A weighted random walk is an algorithm that nodes use to find a path to a tip transaction in a subgraph.

To increase the probability of selecting a path to new transactions, the algorithm favors a path through transactions that have a higher rating. This rating is called a cumulative weight.

The cumulative weight of a transaction is calculated using the following variables:
- **Future set:** Transactions that approves the transaction
- **[`ALPHA` configuration parameter](root://node-software/0.1/iri/references/iri-configuration-options.md#alpha):** A number that affects the randomness of the tip selection process

Nodes gives a high rating to a transaction with a large future set because it has a higher probability of being confirmed than one with a small future set. However, if a node were to rate transactions based only on this variable, the ledger would become a long, narrow chain of transactions, which are referenced by many other transactions. This would slow the rate of new transactions being appended to the ledger because new transactions would have to wait until they had a large enough future set before other transactions would reference them. So, to increase the speed at which new transactions are appended to the ledger, nodes also use the `ALPHA` configuration parameter to calculate the cumulative weight.

The `ALPHA` configuration parameter makes sure that the cumulative weight of each transaction is calculated with an element of randomness. This parameter allows nodes to select some transactions that have a small future set and by doing so, increase the speed at which new transactions are appended to the ledger.  

For more information about the weighted random walk, and for an in-depth explanation about the theories surrounding the best value for the `ALPHA` configuration parameter, read our [blog post](https://blog.iota.org/confirmation-rates-in-the-tangle-186ef02878bb).

## Bundles and consistency

Transactions in IOTA are sent in bundles. Therefore, when the walker traverses an approver, that approver may be in the middle of a bundle. To validate the bundle, the walker finds the tail transaction by traversing the trunk transactions. 

The two tip transactions are checked for consistency between each other to make sure that neither one is invalid. Therefore, the clients transaction references two valid transactions that have a better chance of being approved by another transaction, thus increasing its cumulative weight.

## Incentives to use tip selection

The tip selection algorithm is not enforced. Instead, nodes have an incentive to use it to have the best chance of their transactions becoming confirmed.

It's impossible to check if a node used the tip selection algorithm or even changed it to return custom tip transactions for its own purposes.

However, as discussed in the [whitepaper](https://iota.org/IOTA_Whitepaper.pdf), it's necessary that tip transactions are selected at random. 

This randomness is important because if nodes chose to select their own tip transactions (for example, those that approve their own transactions), only a few lucky transactions would ever be confirmed. We discuss this theory in the paper [Equilibria in the tangle](https://arxiv.org/abs/1712.05385).

![Nodes select the best tip transactions](https://cdn-images-1.medium.com/max/1600/1*Qs_KFwcXxXKuoERjfJ5xsw.jpeg)

In this diagram, the black transactions are considered the best, and each new transaction tries to reference them. This situation reduces the rate at which all transactions are confirmed. 

When all nodes use the tip selection algorithm, all tip transactions are selected at random. This randomness increases the rate at which new transactions are attached to the Tangle and eventually confirmed.

![Comparison between a random tip selection and a non-random tip selection](https://cdn-images-1.medium.com/max/1600/1*qvNmyzQijU3PpMYvYtaxGg.jpeg)