# cIRI configuration options

**This table contains the configuration options for the cIRI.**

You can choose to configure cIRI by specifying the configuration options in the following ways:
* As flags in the command line
* As parameters in a file with the .yaml extension (cIRI configuration file)

### Command line flags

| **Configuration options** |   **Description**| **Accepted values** | **Default values**|**Notes** |
| :------------------------ | :--------------- | :--------- | :--------| :------------|
|<a name="--db-path"></a>`--db-path`| Path to the database file. | string  | ciri/db/ciri-mainnet.db | |
|<a name="--help"></a>`--help`| Displays the usage. | none  | | |
|<a name="--log-level"></a>`--log-level`| Valid log levels: "debug", "info", "notice", "warning", "error", "critical", "alert" and "emergency". | string  | | |
|<a name="--mwm"></a>`--mwm`| Number of trailing ternary 0s that must appear at the end of a transaction hash. Difficulty can be described as 3^mwm. | number  | 14 | |
|<a name="--neighbors"></a>`--neighbors`| URIs of neighbouring nodes, separated by a space. | string  | | |
|<a name="--p-propagate-request"></a>`--p-propagate-request`| Probability of propagating the request of a transaction to a neighbor node if it can't be found. This should be low since we don't want to propagate non-existing transactions that spam the network. Value must be in [0,1]. | float  | | |
|<a name="--p-remove-request"></a>`--p-remove-request`| Probability of removing a transaction from the request queue without requesting it. Value must be in [0,1]. | float  | | |
|<a name="--p-reply-random-tip"></a>`--p-reply-random-tip`| Probability of replying to a random transaction request, even though your node doesn't have anything to request. Value must be in [0,1]. | none  | | |
|<a name="--help"></a>`--help`| Displays the usage. | none  | | |



### IRI Configuration file
| **Configuration options** |   **Description**| **Accepted values** | **Default values**|**Notes** |
| :------------------------ | :--------------- | :--------- | :--------| :------------|
|<a name="db-path"></a>`db-path`   | Path to the database file. | string  | ciri/db/ciri-mainnet.db  | |
