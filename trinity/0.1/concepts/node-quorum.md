# Node quorum

**When you rely only on one node as a source of information from the Tangle, you can't be confident that it's correct. For example, that node could send you the wrong information about your available balance. To increase the confidence in the information that Trinity displays, it connects to multiple nodes and compares the results. This group of nodes is called a node quorum.**

When Trinity sends a request for information, it sends it to a node quorum, which consists of 4 random nodes by default. These nodes are chosen from a remote list of public nodes.

If at least 67% (3 out of 4) nodes return the same result, then Trinity has a high level of confidence that the information is correct.

If fewer nodes agree, the quorum fails and Trinity displays a _safe_ result.

At the moment, Trinity uses a node quorum for the following:

| **Request to a node quorum**|**Safe result (in case of failure)** |**Reason for safe result**|
|:--|:--|:---|
|Whether an address is spent| Zero balance| To stop users from trying to spend tokens they don't have|
|The balances of an address before, during, and after sending a transaction| The address is spent| To avoid the risk of a user spending from a spent address. [Find out why this is important](root://iota-basics/0.1/concepts/addresses-and-signatures.md#addressreuse).
