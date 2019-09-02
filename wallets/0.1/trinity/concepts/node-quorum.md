# Node quorum

**When you rely only on one node as a source of information from the Tangle, you can't be confident that it's correct. For example, that node could send you the wrong information about your available balance. To increase your confidence in the information that Trinity displays, it can connect to multiple nodes and compare the results. This group of nodes is called a node quorum, which consists of hard-coded nodes, remote public nodes and/or any user-defined custom nodes**

When Trinity sends a request for information to a node quorum, it compares the results from each of them. If at least 67% (3 out of 4) nodes return the same result, then Trinity has a high level of confidence that the information is correct. If fewer nodes agree, the quorum fails and Trinity displays a _safe_ fallback result.

At the moment, Trinity uses a node quorum for the following:

| **Request to a node quorum**|**Safe fallback result (in case of failure)** |**Reason for safe fallback result**|
|:--|:--|:---|
|Whether an address is spent| The address is spent| To stop users from trying to spend tokens that they don't have|
|The balances of an address before, during, and after sending a transaction| Zero balance| To stop users from being misled into believing that their balance is up to date, thus avoiding the risk of a user withdrawing from a spent address. [Find out why this is important](root://dev-essentials/0.1/concepts/addresses-and-signatures.md#addressreuse).
