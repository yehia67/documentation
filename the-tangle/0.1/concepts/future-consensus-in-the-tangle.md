# Future consensus in the Tangle

**Nodes reach a consensus on transactions that are approved by milestones. But more distributed consensus mechanisms are available. For example, the Tangle [whitepaper](https://iota.org/IOTA_Whitepaper.pdf) proposes a distributed approach to consensus. This distributed approach relies on confirmation confidence instead of the Coordinator-issued milestones.**

The Coordinator protects the network until the majority of transactions are honest. At that point, the Coordinator is unnecessary. Without the Coordinator, nodes could use other consensus mechanisms such as confirmation confidence or economic clustering.

## Confirmation confidence

Without the Coordinator, transaction confirmation would not be a matter of true or false. Instead, confirmation would be a percentage of the likelihood that a transaction will remain either confirmed or unconfirmed.

Confirmation could be measured by a specific threshold at which the reversal of a transaction would require an unreasonable amount of resources, such as [proof of work](../concepts/proof-of-work.md).

### Example of confirmation confidence

To calculate the confirmation confidence of a particular transaction, nodes could do the tip selection process 100 times.

:::info:
The number 100 is arbitrary. If clients were to want more confidence, they could ask the nodes to do the tip selection process more than 100 times.
:::

If the transaction were to be approved by 80 tip transactions (approvers) out of 100, its confirmation confidence would be 80%. 

This process considers that the more approvers a transaction has, the larger its cumulative weight. The larger the cumulative weight, the more likely it is that the transaction is valid and will be chosen by the tip selection algorithm for new transactions.

:::info:
Nodes might see different confidence rates for the same transaction because their view of the Tangle is not identical, and their tip selection algorithm may select different tip transactions.
:::

## Economic clustering

Without the Coordinator, nodes could form clusters that reach a consensus on the same transactions and thus have the same view of the Tangle. To reach a consensus, a cluster could choose economic actors to trust. These economic actors would create signed bundles of transactions that reference others transactions. When enough economic actors give the same [subtangle](#terminology) 100% confidence, the cluster would confirm those transactions.

This way, each node in a cluster could ignore transactions that aren't relevant to them. Similarly, each cluster would have a different view of the Tangle, making the tokens in each cluster incompatible. Instead, nodes in a cluster could charge a fee to exchange tokens.

Because nodes in an IOTA network are distributed across the globe, economic clustering (EC) offers infinite scalability for the entire network by allowing nodes to focus their resources on transactions that are relevant to their cluster.

### Hierarchical locality in IOTA

EC applies concepts to IOTA that are inspired by the global real-world economy. The most important of these concepts is **hierarchical locality**, which includes the following levels of economy:

* Global
* National
* Regional

The **global economy** is a system composed of smaller **national economies** and the relations among them. Recursively, these national economies consist of many **regional economies** which are connected with each other. And once again, regional economies are a multitude of companies and individuals interacting with each-other within their regional economy. The elements of this level are the atoms which can't undertake further divisions.

The global economy does not physically exist as a separate entity, but as an abstract term to describe the entire system. In fact, the system consists of billions of atoms interacting with each-other. While the global level is highly complex, no atoms are fully aware of the entire picture, but follow only their own self-interest and interact mostly within a tiny group (for example a city) which we will call a **cluster**. The vast majority of economic activity is not relevant to an atom (it doesn't care whether another atom on a distant continent is buying a coffee).

By splitting the global ledger into small clusters, the entire IOTA network can scale up without limitations. Each node, representing an atom, can decide which cluster it considers economically relevant and choose to follow only the activity within the chosen cluster.

### Structure of economic clustering

Economic clustering involves the following entities:

* **Economic cluster:** A collection of nodes that reach a consensus on the same transactions
* **Economic actor:** A node that is trusted by an economic cluster and used by its nodes to reach a consensus
* **Neighbor cluster:** An economic cluster that's connected to another cluster

#### Economic cluster

An economic cluster is a collection of nodes that share the same ledger. In that ledger, each node considers a transaction confirmed only when it's referenced by its cluster's economic actors.

##### Inter-cluster token exchange

A real-world equivalent of a token in an economic cluster is a currency. In a nation, much like a cluster, a certain currency is accepted while other currencies must usually be exchanged to the national one.

All tokens in an economic cluster are fungible and share the same value. However, just like different fiat currencies, tokens in different clusters differ in value, and are not compatible with each other. But, just like in the real world where we have currency exchanges, nodes who have balances in both clusters can offer an exchange service. This service would most likely require a small fee to compensate the node that were to offer the service.

Even though this service is provided by a third-party node, practically no trust is required when transacting through flash channels. A tiny micropayment stream would flow between both nodes in both clusters. If the exchanging node turned out to be malicious and would not transfer the balance to the other cluster, only an insignificantly low amount of tokens would have been stolen.

##### Token creation

Clusters are equivalent to ledger forks. As such, nothing prevents someone from creating a new cluster with new tokens. Instead, EC relies on economic laws to ensure that no damage is caused by token creators.

Although tokens can be created out of thin air, value can't. The value of a cluster lies in its economic relevance. A cluster without relevance will have no value and therefore the tokens will have no value. Funds in economic clusters will therefore closely resemble those of the real world.

#### Economic actor

Economic actors are nodes that regularly send signed bundles, called confidence markers, that reference a transaction to give that [subtangle](#terminology) a confirmation confidence (how confident the actor is that the referenced subtangle is confirmed).

Economic clusters can identify an actor by its IOTA address. Economic actors can be institutions, individuals or machines. An actor is relevant to a cluster only if that cluster cares about how that actor sees the ledger.

:::info:
To allow actors to sign multiple bundles using the same address without compromising security, the confidence markers are implemented with merkle trees.
:::

The value of a cluster's token results only from the ability to exchange those tokens for goods. If none of the actors that a node wants to perform transactions with recognize the cluster's tokens as valuable, these tokens are of no value to the node either. For example, the local supermarket would be directly relevant to a node if it intends to buy groceries there with its tokens.

A node cares indirectly if a relevant actor relies on another actor. For example, a node might not plan to interact with the bank of its local supermarket. But, that bank is certainly relevant to the supermarket, and as such it's relevant to the node as well.

##### How economic actors update confidence markers

Economic actors can update their confirmation confidence by sending new confidence markers that reference the same subtangle. This dynamic and probabilistic updating process can continue until the vast majority of nodes in a cluster each reach a consensus on the same subtangle.

The more actors that are confident in a subtangle, the more confident other actors are in that same subtangle. Therefore, the confidence levels of a subtangle quickly move in the same direction (0% or 100%), allowing the cluster to quickly reach a consensus on a shared ledger.

If an economic actor had sent a confidence marker that references a conflicting subtangle to the one on which the cluster reached a consensus, the respective actor would overwrite that confidence marker with 0%.

To determine which confidence marker has the priority for a transaction `T`, nodes use the index of a confidence marker and its locality.

**Index:** The index of each signature within the merkle tree can be derived. To allow overwriting, a confidence marker with a higher index will have priority over all confidence markers with a lower index referencing the same subtangle.

**Locality:** Let `S` be the referenced tangle of a confidence marker `M` and `S'` be the referenced tangle of a confidence marker `M'`. `T` is an element of `S'` and `S'` is a subtangle of `S`. As the more specific confidence marker, `M'` has priority over the more general confidence marker `M` for `T`. On a side note, the confidence in `S` cannot be higher than that of `S'` because the former includes the latter and as such relies on its confidence.

```
=== GIVEN ===
M, M' ... confidence markers
S = referenced(M) ... tangle (supertangle of S')
S' = referenced(M') ... tangle (subtangle of S)
T∈S' ... transaction in S'

== THEN ===
priority(M', T) ≥ priority(M, T)
S' ⊆ S ⇒ confidence(M') ≥ confidence(M)
```

##### Cluster confidence

The economic actors' collective confidence in a transaction specifies the liklihood of a cluster confirming it. This percentage depends on the confidence and relevance of all actors within a cluster. As such, confidence is just as subjective as in the real world.

For example:

* Let `T` be a transaction and `A` be an economic actor

* `p(T)` describes our cluster confidence (the confidence we have in `T`)

* `p(T|A)` is the confidence that actor `A` has in transaction `T`

* `relevance(A)` is the relative relevance of actor A (subjectively). The sum of the relevance over all actors must equal 1.

```
=== GIVEN ===
Actors ... set of all economic actors
T ... transaction
Σ[∀A∈Actors] relevance(A) = 1

=== THEN ===
p(T) = Σ[∀A∈Actors] relevance(A) ⋅ p(T|A)
```

#### Neighbor clusters

Each node in a cluster processes its own transactions and the transactions of its neighbor clusters, all the other transactions are ignored because they simply don’t reach the cluster.

### Terminology

Because each cluster processes only transactions that are relevant to it, each one has its own ledger, and consequently, its own view of the Tangle. Therefore, we make a distinction between the following types of Tangle views.

#### Span-tangle

A span-tangle `span(T)` of a transaction `T` (or a set of transactions) is the Tangle derived by looking at only transaction `T` and its entire history (all directly or indirectly referenced transactions). All other transactions are not part of this span-tangle.

```
span(T1, T2, ... Tn) = span(T1) ⋃ span(T2) ⋃ ... ⋃ span(Tn)
span(T) = T ⋃ span(T.branch, T.trunk) = T ⋃ span(T.branch) ⋃ span(T.trunk)
```

#### Referenced tangle

The tangle referenced by a transaction `T` contains all transactions that are directly or indirectly referenced by transaction `T`, but not transaction `T` itself.

```
T ... transaction
referenced(T) ... tangle referenced by T

referenced(T) = span(T) ∖ T
              = span(T.branch, T.trunk)
              = span(T.branch) ⋃ span(T.trunk)
```
  
#### Subtangles and supertangles

A subtangle `S'` of a tangle `S` is the span-tangle of a transaction `T` in `S`. Thus `S'` is a subset of `S`. `S` is the supertangle of `S'`.

```
S ... tangle (supertangle of S')
T∈S ... transaction in S
S' = span(T); S' ⊆ S ... (subtangle of S)
```

### References

* [Economic Clustering and IOTA](https://medium.com/@comefrombeyond/economic-clustering-and-iota-d3a77388900) (Medium Article) by Come-from-Beyond on Jun 9, 2018