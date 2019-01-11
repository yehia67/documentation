# IOTA networks

**An IOTA network consists of IRI nodes that are mutually connected to neighbor IRI nodes.**

IOTA has the following [permissionless networks](concepts/distributed-ledger-technology.md) that anyone can use:
* Mainnet
    - Token: IOTA token
    - Minimum weight magnitude (MWM): 14
* Devnet
    - Token: Devnet token (free)
    - Minimum weight magnitude (MWM): 9
* Spamnet
    - Token: Spamnet token (free)
    - Minimum weight magnitude (MWM): 9

All permissionless networks consist of IRI nodes, clients, and the Coordinator.

If you want to create and test an application on a permissioned (private) network, you can do so by running an instance of the open-source Coordinator called [Compass](root://compass/introduction/overview.md).

## Mainnet

When you buy IOTA tokens from a cryptocurrency exchange, you can send those token to addresses on the Mainnet network.

Transactions on the Mainnet network must use a MWM (minimum weight magnitude) of 14 to be valid.

![Mainnet configuration](https://i.imgur.com/HK4S62N.png)

### Endpoints

If you can't run your own IRI node, you can use public ones in Trinity or use websites such as [IOTA Dance](https://iota.dance) to find a list of public IRI nodes.

## Devnet

The Devnet network is a copy of the Mainnet network. On this network, you can test your applications and build proof of concepts that use [free Devnet tokens](https://faucet.devnet.iota.org). The faucet website will send 1000 Devnet tokens to the specified address.

Transactions on the Devnet network must use a MWM (minimum weight magnitude) of 9 to be valid. Compared to the Mainnet network, this MWM vastly reduces the time it takes for the Proof of Work (PoW) to be completed.

![Devnet Configuration](https://i.imgur.com/w2kGDKw.png)

### Endpoints

We host the following public IRI nodes on the Devnet network:

### Load balancer node

This endpoint gives you access to a high-availability proxy server, which is running an IRI node on the Devnet network.

Use the load balancer for sending transactions and requesting information about the ledger from the IRI node.

URL: https://nodes.devnet.iota.org:443

### ZMQ node

This endpoint gives you access to the [zero message queue](iri/concepts/zero-message-queue.md) of an IRI node on the Devnet network.

Use the ZMQ node to subscribe to events in the IRI.

URL: tcp://zmq.testnet.iota.org:5556

### PoW node

This endpoint gives you access to an IRI node that can do proof of work.

Use the PoW node to save power on small devices.

URL: https://powbox.devnet.iota.org

## Setting up a Node on the Devnet

### Syncing the ledger

The current Devent database is more than 30GB. We have regularly updated snapshots of the devnet, to allow community members and developers to spawn their own IRI node(s) and sync it in a reasonable period of time.

The database is available for download [here](https://s3.eu-central-1.amazonaws.com/iotaledger-dbfiles/testnet/db-latest.tgz) and usually requires the latest version of IRI.

### Neighbors

The following nodes have autopeering enabled over UDP:

```
udp://p101.testnet.iota.cafe:14666

udp://p102.testnet.iota.cafe:14666

udp://p103.testnet.iota.cafe:14666

udp://p104.testnet.iota.cafe:14666
```

Developers can sync their nodes by using any of these IRI nodes via udp, port 14666.

> NOTE: When setting up IRI use the `--testnet` flag or set `TESTNET = true` in the configuration file.


## Spamnet

The Spamnet network is for applications that spam transactions.

At present the Spamnet faucet website is not functional. To receive Spamnet tokens, please go to our #tanglespam channel on Discord. Community members will make sure that you receive some tokens.

![Topology of the Spamnet](https://i.imgur.com/VpEsA6i.png)

### Endpoints

### Nodes HTTPS API

This is a High Availability Proxy to provide load balancing
to the nodes that comprise the Spamnet. This is accessible over
HTTPS on port 443.

Check out the Node documentation [here](/iri/)

```
https://nodes.spamnet.iota.org:443
```

### Real time Message Stream - ØMQ

This provides access to the Zero Message Queue of the IRI
node. This provides the ability to subscribe to the Node in various ways.

Check out a ZMQ tutorial [here](/iri/).

```
tcp://zmq.spamnet.iota.org:5556
```

---

## Setting up a Node on the Spamnet

### Configuring IRI for the Spamnet

We recommend to run IRI 1.5.3 or higher. You must make sure to configure IRI with the following INI options, or the command line equivalents:

```
[IRI]
TESTNET = TRUE
MWM = 14
SNAPSHOT_FILE = /iri/conf/snapshots/spamnet.txt
COORDINATOR = H9FXUMSYAWNZPVFINVTXOTYKFZXR9OBKA9KSTVWXTWHIZZRISFYZMXIMOQFXDXXQHNAJXAZFP9IHSFXRH
NUMBER_OF_KEYS_IN_A_MILESTONE = 20
SNAPSHOT_TIME = 1535760000
MILESTONE_START_INDEX = 2
NEIGHBORS = udp://p101.spamnet.iota.cafe:14600 udp://p102.spamnet.iota.cafe:14600
```

> NOTE: The configuration options are above are mandatory in order to have a functional node.

### Snapshot file

The Spamnet network snapshot file is not included in IRI. For this reason you need to provide IRI the correct snapshot file for the network. Here is the content of the file:

```
WYF9OOFCQJRTLTRMREDWPOBQ9KNDMFVZSROZVXACAWKUMXAIYTFQCPAYZHNGKIWZZGKCSHSSTRDHDAJCW;2779530283277761
```

> Save the text above and make sure to configure IRI with the SNAPSHOT_FILE directive as indicated above

### Neighbors

As mentioned in the INI file above, the following nodes have autopeering enabled over UDP:

```
udp://p101.spamnet.iota.cafe:14600
udp://p102.spamnet.iota.cafe:14600
```

These nodes will automatically accept new neighbors and do not require manual peering. However keep in mind that the number of neighbors is currently capped at 128 each p10n server. For this reason you are very welcome to exchange your own Spamnet IRI URLs over to #tanglespam in Discord, to allow other node operators to participate in the Spamnet network.


