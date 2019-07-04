# Command-line flags

**In the command to execute the Alphanet code, you can pass the following flags to change the default behavior of a node. For example, you can choose to change the default auto-peering port.**

:::info:
If you've downloaded the code, you can also run it with the `-h` or `--help` flag to see a list of all the configuration options.
:::

| **Command-line flags** |  **Description**| **Accepted values** | **Default value**|**Notes** |
| :------------------------ | :--------------- | :--------- | :--------| :------------|:-----|
|<a name="analysis-server-address"></a> `-analysis-server-address`|Set the tcp server for collecting analysis information| string | 82.165.29.179:188 |
|<a name="analysis-server-port"></a>`-analysis-server-port` |Set the tcp port for incoming analysis packets |number |188|
|<a name="autopeering-address"></a> `-autopeering-address` |Set the address to bind for incoming peering requests|string |0.0.0.0 | The default option accepts any address
|<a name="autopeering-entry-nodes"></a>`-autopeering-entry-nodes` |Set a list of trusted entry nodes for auto-peering |string | 0d828930890386f036eb77982cc067c5429f7b8f@82.165.29.179:14626 |
|<a name="autopeering-port"></a>`-autopeering-port` |Set the tcp port for incoming peering requests |number |14626 |
|<a name="database-directory"></a>`-database-directory` |Set the path to the database folder  |string |mainnetdb | 
|<a name="gossip-port"></a> `-gossip-port`|Set the tcp port for the gossip connection | number| 14666
|<a name="node-disable-plugins"></a>`-node-disable-plugins` |Disable plugins by name | string| ""|
|<a name="node-log-level"></a>`-node-log-level` |Set the type of log messages that are displayed|number |3 |LOG_LEVEL_FAILURE = 0, LOG_LEVEL_WARNING = 1, LOG_LEVEL_SUCCESS = 2, LOG_LEVEL_INFO = 3, LOG_LEVEL_DEBUG = 4|
|<a name="zeromq-port"></a>`-zeromq-port` |tcp port used to connect to the zmq feed |number |5556 | 