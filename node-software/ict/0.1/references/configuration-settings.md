# Configuration settings

**The configuration settings affect how a node behaves. You can edit the configuration settings either on the Ict website or in the configuration file. This table displays information about the configuration fields and their default values.**

|**Ict website**|**Configuration file** |**Description**|**Default**|
|:-----|:----------|:------|:-----|
|`HOST NAME` |`host`|Host (IP address or URL) from which the API will accept requests. The default value accepts API requests from any host |0.0.0.0 |
|`ICT NAME`|`name`|Name of a node | ict|
|`MAX HEAP SIZE`|`max_heap_size`| Value that's used together with the value of the `TANGLE CAPACITY` field to stop a node from running out of memory. The default value is above 1 to disable this field because of the slow garbage collector || 1.01|
|`MAX FORWARD DELAY` |`max_forward_delay`|Affects the transaction's position in the sender queue. A number between `MIN FORWARD DELAY` and `MAX FORWARD DELAY` is used to determine the send time of the transaction in the queue. | 200|
|`MAX. ABS. TX./ROUND`|`anti_spam_abs`|Maximum amount of transactions that a node will accept during a round. If a neighbor sends more transactions than this value, the node will ignore them and increment the number of ignored transactions in the `IGN` column of the logs | 1000|
|`MIN FORWARD DELAY` |`min_forward_delay`| Affects the transaction's position in the sender queue. A number between `MIN FORWARD DELAY` and `MAX FORWARD DELAY` is used to determine the send time of the transaction in the queue.| 0|
|`PASSWORD`|`gui_password`| Password to log into the Ict website and authenticate API requests| change_me_now|
|`PORT`|`port`|Port to accept transactions from neighbors | 1337|
|`PORT`|`gui_port`|Port to access the Ict website and the API | 2187|
|`ROUND DURATION`|`round_duration`|Number of milliseconds during which a node collects new transaction statistics about each neighbor. After each round, the transaction statistics are printed to the console or saved in a log file. | 60000|
|Not available |`spark_ssl`| Configuration settings for custom SSL. Must include the following arguments separated by a comma (,):path to the keystore file, password for the keystore file, path to the truststore file,password for the truststore file | |
|`TANGLE CAPACITY`|`tangle_capacity`|The maximum amount of transactions that a node can store during runtime. When this amount is reached, transactions with the oldest timestamps are removed, and the value of this field is adjusted, depending on the value of the `MAX HEAP SIZE` field. |10000 |
|`WEB ACCESS ENABLED`|`gui_enabled`|Controls whether to Ict website | true|


