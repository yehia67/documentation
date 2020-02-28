# Node quorum

**To make Trinity more robust, it can request information such as balances from a [node quorum](root://getting-started/0.1/network/nodes.md#node-quorum) and compare the results. In Trinity, the quorum consists of hard-coded nodes, remote public nodes and/or any user-defined custom nodes**

:::danger:
On 11 February 2020, the IOTA Foundation became aware of an attack on the Trinity wallet, during which some users’ seeds and Trinity passwords were compromised. Please check our advice for [protecting your Trinity account](../how-to-guides/protect-trinity-account.md).
:::

When Trinity sends a request for information to a node quorum, it compares the results from each of them. If at least 67% (3 out of 4) nodes return the same result, then Trinity has a high level of confidence that the information is correct. If fewer nodes agree, the quorum fails and Trinity displays a _safe_ fallback result.

At the moment, Trinity uses a node quorum for the following:

| **Request to a node quorum**|**Safe fallback result (in case of failure)** |**Reason for safe fallback result**|
|:--|:--|:---|
|Whether an address is spent| The address is spent| To stop users from trying to spend tokens that they don't have|
|The balances of an address before, during, and after sending a transaction| Zero balance| To stop users from being misled into believing that their balance is up to date, thus avoiding the risk of a user withdrawing from a [spent address](root://getting-started/0.1/clients/addresses.md#spent-addresses)
