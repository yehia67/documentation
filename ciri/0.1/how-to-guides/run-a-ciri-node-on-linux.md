# Run a cIRI node on Linux

#### Warning: cIRI is still under development. You should not use cIRI in a production environment.

## Requirements:

- Ubuntu (or another Linux based OS. MacOS or an BSD based OS should also work)

*_Note:_* This guide uses Ubuntu. If you are a beginner, you should stick to Ubuntu.

- At least 256 MB memory. Recommendation: 512 MB - 1 GB

- At least 50 GB of free storage

## Install Bazel

Follow the [installation guide](https://docs.bazel.build/versions/master/install.html) for your OS in the Bazel documentation.

## Clone the repository

```bash
git clone https://github.com/iotaledger/entangled.git && cd entangled
```

## Install sqlite3

```bash
sudo apt-get install sqlite3
```

## Initialize the database

```bash
sqlite3 ciri/db/ciri-mainnet.db < common/storage/sql/schema.sql
```

## Create a configuration file

Create the configuration file in ciri/conf.yml with at least the following content

To find neighbors, use the IRI guide.

```yaml
log-level: debug
neighbors: "udp://148.148.148.148:14265"
port: 14265
```

## Run cIRI with Bazel

```bash
 bazel run --define network=mainnet|testnet -- ciri <optional flags>
```