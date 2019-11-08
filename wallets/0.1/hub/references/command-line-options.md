# Command-line options

**When you start Hub or the signing server, you can use the command-line options to override the default settings.**

To make it easier to find the options you want to change, we've separated them into the following categories:

- **Database:** Configure the database settings
- **Argon2 hash function:** Configure the settings for the Argon2 hash function that Hub uses to generate seeds
- **API:** Configure the Hub API settings
- **IOTA protocol:** Configure how Hub interacts with nodes
- **Signing:** Configure how Hub signs transfer bundles
- **Sweeps:** Configure the sweep settings

:::info:
If you've downloaded Hub, you can also run it with the `--help` flag to see a list of all the configuration options.
:::

## Database

|**Option** |**Description**| **Accepted argument** | **Default**|**Notes** |
| :------------------------ | :--------------- | :--------|:----|:-----|
|`--db` |Name of the database |string |"hub"||
|`--dbDebug` |Whether to enable debug mode for the database server connection|true: Enable debug mode, false: Disable debug mode |false||
|`--dbHost`| URL or IP address of the database server|string|"127.0.0.1"||
|`--dbPassword`| Password for the database server| string|"password"||
|`--dbPort`|Database server port| integer|3306||
|`--dbType`|Type of database| string|"mariadb"||
|`--dbUser` |Database username| string|"user"||
|`--fetchTransactionMessages`| Whether Hub stores any messages in the bundle of a deposit |true: Store messages, false: Do not store messages|false||
|`--salt`| Salt that is hashed together with a seed UUID to generate a new seed for each deposit address  | string of at least 20 characters|  ""    ||

## Argon2 hash function
 
| **Option** |   **Description**|**Accepted argument** | **Default**|**Notes** |
| :------------------------ | :--------------- | :--------|:---|:---|
|`--argon2MCost`|Memory cost of Argon2 in bytes| integer|1 << 17|For a discussion about this option, [see this Stack Exchange topic](https://crypto.stackexchange.com/questions/48954/questions-about-the-argon2-options) |
|`--argon2TCost` |Time cost of Argon2|integer|4|For a discussion about this option,[see this Stack Exchange topic](https://crypto.stackexchange.com/questions/48954/questions-about-the-argon2-options)
|`--argon2Mode` |Argon2 hash function to use|`1`: The [argon2i hashing function](https://www.argon2i.com/), `2`: The [argon2id hashing function](https://www.argon2d.com/)|2||
|`--argon2Parallelism`|Number of threads to use in parallel|integer|1|For a discussion about this option, [see this Stack Exchange topic](https://crypto.stackexchange.com/questions/48954/questions-about-the-argon2-options)|
|`--maxConcurrentArgon2Hash`|Maximum number of concurrent Argon2 hash processes| integer|4||

## API

| **Option** |   **Description**|**Accepted argument** | **Default**|**Notes** |
| :------------------------ | :--------------- | :--------|:---|:---|
|`--authMode`|Type of connection encryption that Hub uses|"none": Do not use encryption, "ssl" Use SSL encryption|"none"|If you use SSL encryption, you must also make sure to use the `--sslKey` and `--sslCert` options as well as either the `sslCA` or `--sslDH` option  |
|`--listenAddress`| Host to which the Hub API will listen|string |"0.0.0.0:50051"|The default host allows any IP address to access the API|
|`-serverType`| Type of API to expose |"grpc": Expose the gRPC API, "http": Expose the RESTful API|"grpc"|
|`--sslCert` |Path to the SSL certificate |string|"/dev/null"||
|`--sslCA` |Path to the certificate authority (CA) root |string|"/dev/null"|This option is needed only when you expose the gRPC API server type|
|`--sslKey` |Path to the SSL certificate key |string|"/dev/null"||
|`--sslDH`| Path to Diffie Hellman parameters|string |"/dev/null"|This option is needed only when you expose the RESTful API server type|

## IOTA protocol

| **Option** |   **Description**|**Accepted argument** | **Default**|**Notes** |
| :------------------------ | :--------------- | :--------|:---|:---|
|<a name="apiAddress"></a>`--apiAddress`| URL or IP address of the IRI node that Hub connects to| string|"127.0.0.1:14265"||
|`--attachmentInterval`|Interval in milliseconds that Hub waits between [reattaching and promoting transactions](root://getting-started/0.1/basics/reattach-rebroadcast-promote.md)|integer|240000|To disable this feature, set this option to 0|
|`--depth`|Value to use for the [depth](root://getting-started/0.1/basics/depth.md) argument of the [`getTransactionsToApprove`](root://node-software/0.1/iri/references/api-reference.md#getTransactionsToApprove) endpoint|integer |3||
|<a name="keySecLevel"></a>`--keySecLevel` |[Security level](root://getting-started/0.1/basics/security-levels.md) to use for generating deposit addresses|2||
|<a name="minWeightMagnitude"></a>`--minWeightMagnitude`| [Minimum weight magnitude (MWM)](root://getting-started/0.1/basics/proof-of-work.md#minimum-weight-magnitude) to use for proof of work|integer |9|To use Hub on the Mainnet, you must use a MWM of 14|
|`--numBundlesToMine`| Number of different bundle hashes to generate to find one that reveals the least amount of the private key in the signature for a spent address|integer| 5000000| Bundles are mined only when you use the `RecoverFunds` API call|
|<a name="powMode"></a>`--powMode`|Where [proof of work](root://getting-started/0.1/basics/proof-of-work.md) is done| "local": Do proof of work on the device that is running Hub, "remote": Use the `attachToTangle` endpoint to ask the node to do proof of work|"remote"|To use the remote mode, the IRI node in the `--apiAddress` option must support remote PoW|
|<a name="useHttpsIRI"></a>`--useHttpsIRI`| Whether to use the SSL protocol to communicate with the node's API|true: Use the SSL protocol, false: Do not use the SSL protocol|false| |

## Signing

| **Option** |   **Description**|**Accepted argument** | **Default**|**Notes** |
| :------------------------ | :--------------- | :--------|:---|:---|
|`--authProvider`| Key type to use to authenticate the `SignBundle` API call|"none": Do not use a key, "hmac": Use an [HMAC](https://en.wikipedia.org/wiki/HMAC) key|"none"||
|`--hmacKeyPath` |Path to the HMAC key used to authenticate the `SignBundle` API call|"/dev/null"|
|<a name="recoverFunds"></a>`--RecoverFunds_enabled`|Whether to enable the `RecoverFunds` API call|true: Enable the API call, false: Disable the API call|false||
|<a name="signBundle"></a>`--SignBundle_enabled`|Whether to enable the `SignBundle` API call|true: Enable the API call, false: Disable the API call|false||
|`--signingMode`|Where signing is done| "local": Hub signs bundles, "remote": The signing server signs bundles |"local"|If you have a signing server, you must also use the `--signingProviderAddress` option |
|`--signingProviderAddress`|URL or IP address of the signing server|string|"0.0.0.0:50052"||
|`--signingServerChainCert`|SSL certificate chain for Hub|string|"/dev/null"|If you configure Hub to use SSL encryption and you have a signing server, you must use this option|
|`--signingServerKeyCert`|SSL certificate key for Hub|string|"/dev/null"|If you configure Hub to use SSL encryption and you have a signing server, you must use this option|
|`--signingServerSslCert`|SSL certificate for Hub|string|"/dev/null"|If you configure Hub to use SSL encryption and you have a signing server, you must use this option|

## Sweeps

| **Option** |   **Description**|**Accepted argument** | **Default**|**Notes** |
| :------------------------ | :--------------- | :--------|:---|:---|
|<a name="monitorInterval"></a>`--monitorInterval`|Interval in milliseconds that Hub checks deposit addresses for IOTA tokens|integer|60000|To disable this feature, set this option to 0. Any deposit addresses that contain IOTA tokens are included in the next sweep.|
|<a name="sweepInterval"></a>`--sweepInterval` |Interval in milliseconds that Hub waits between sweeps|integer|600000|To disable this feature, set this option to 0|
|<a name="sweepLimits"></a>`--sweep_max_deposit`|Maximum number of user deposit addresses to use in input transactions in a sweep|integer|5|| 
|`--sweep_max_withdraw`|Maximum number of withdrawal requests in a sweep|integer|7||
