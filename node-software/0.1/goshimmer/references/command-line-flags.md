# Command-line flags

**In the command to execute the GoShimmer code, you can pass the following flags to change the default behavior of a node. For example, you can choose to change the default auto-peering port.**

:::info:
If you've downloaded the code, you can also run it with the `-h` or `--help` flag to see a list of all the configuration options.
:::

| **Command-line flags** |  **Description**| **Accepted values** | **Default value**|**Notes** |
| :------------------------ | :--------------- | :--------- | :--------| :------------|:-----|
|<a name="analysis-server-address"></a> `-analysis-server-address`|Set the server to which your node sends information such as its neighbors| string | 159.69.158.51:188 |We use this information to help us research how the network behaves. For example, we use the information sent to the analysis server to populate [this visualization of the network](http://159.69.158.51/).
|<a name="analysis-server-port"></a>`-analysis-server-port` |Set the TCP port for your own analysis server |number |188| If you want to run your own analysis server, forward this port to your device. Then, you can allow anyone to connect to your analysis server instead of the default.
|<a name="autopeering-address"></a> `-autopeering-address` |Set the address to bind for incoming peering requests|string |0.0.0.0 | The default option accepts any address
|<a name="autopeering-entry-nodes"></a>`-autopeering-entry-nodes` |Set a list of trusted entry nodes for auto-peering |string | 7f7a876a4236091257e650da8dcf195fbe3cb625@159.69.158.51:14626 |To add more than one entry node, use a space-separated list of entry node URLs, and wrap it in quotation marks.|
|<a name="autopeering-port"></a>`-autopeering-port` |Set the TCP port for incoming peering requests |number |14626 |
|<a name="database-directory"></a>`-database-directory` |Set the path to the database folder  |string |mainnetdb | 
|<a name="gossip-port"></a> `-gossip-port`|Set the TCP/UDP port for the gossip connection | number| 14666
|<a name="node-disable-plugins"></a>`-node-disable-plugins` |Disable plugins by name | string| "dashboard zeromq spammer"|
|<a name="node-enable-plugins"></a>`-node-enable-plugins`|Enable plugins by name|string|"analysis autopeering bundleprocessor cli gossip gossiponsolidification gracefulshutdown metrics statusscreen statusscreentps tangle tipselection webapi webapigttaendpoint"
|<a name="node-log-level"></a>`-node-log-level` |Set the type of log messages that are displayed|number |3 |LOG_LEVEL_FAILURE = 0, LOG_LEVEL_WARNING = 1, LOG_LEVEL_SUCCESS = 2, LOG_LEVEL_INFO = 3, LOG_LEVEL_DEBUG = 4|
|<a name="zeromq-port"></a>`-zeromq-port` |Set the TCP port for the ZMQ stream |number |5556 | 
