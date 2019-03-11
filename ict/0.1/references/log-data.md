# Data in the Ict logs

**Nodes write messages to logs that include data about received and requested transactions. This table contains the descriptions for the transaction data in the logs.**

Each row contains data about transaction statistics for one mutually connected neighbor.

|**Column** |**Description** | **Notes**|
|:----------|:---------------|:---------|
|`ALL` |Total number of transactions that have been sent from the neighbor| If this number is greater than 0, the node is currently receiving transactions from the neighbor. If the value is 1, it may indicate that the neighbor is not connected to a large part of the network. |
|`NEW` | Number of new transactions that are being sent from the neighbor|These new transactions are transactions that the node has never seen before |
|`REQ` |Number of requested transactions |If the node receives a transaction whose trunk or branch transactions have not been sent to it, the node will try to request those transactions from neighbors |
|`INV`|Number of invalid transactions |This number should be 0 or close to 0. A high value indicates a bad neighbor. |
|`IGN`|Number of ignored transactions|When a neighbor sends the node a large number of transaction by comparison with the other neighbors, the node will ignore some of those transactions| 