# Run a cIRI node on Linux

**When you run the cIRI on a Linux server, it becomes a cIRI node that gives you direct access to an IOTA network. By running a node, you help the IOTA network to become more distributed by adding to the number of ledgers and validating your neighbors' transactions.**

:::warning:Warning
cIRI is still under development. You shouldn't use cIRI in a production environment.
:::

## Prerequisites

- Ubuntu (or another Linux based OS. MacOS or an BSD based OS should also work). This guide uses Ubuntu. If you are a beginner, you should stick to Ubuntu.
- At least 512 MB of RAM
- At least 50 GB of free storage
- [A public IP address](root://general/0.1/how-to-guides/expose-your-local-device.md)

1. [Install Bazel](https://docs.bazel.build/versions/master/install.html)

2. Install Git

     ```bash
    sudo apt-get install -y git
    ```
    :::info:
    To make sure that Git is installed, do the following: `git --version`. You should see a version number. If not, try installing Git again.
    :::

3. Clone the cIRI repository

    ```bash
    git clone https://github.com/iotaledger/entangled.git && cd entangled
    ```

4. Install sqlite3

    ```bash
    sudo apt-get install sqlite3
    ```

5. Initialize the database

    ```bash
    sqlite3 ciri/db/ciri-mainnet.db < common/storage/sql/schema.sql
    ```

6. Find some neighbors

    :::info:
    Read the [IRI guide](root://iri/0.1/how-to-guide/find-neighbor-iri-node.md) for help finding neighbors.
    :::

7. Create a configuration file called conf.yaml in the `ciri` directory and add the following settings. In the `neighbors` field, add the IP addresses or URLs of your neighbors.

    ```yaml
    log-level: info
    neighbors: "udp://148.148.148.148:14265"
    port: 14265
    ```

    Find out more about the possible [cIRI configuration settings](root://ciri/0.1/references/ciri-configuration-options.md).

8. Run cIRI with Bazel

    ```bash
    bazel run --define trit_encoding=5 --define network=mainnet|testnet -- ciri <configuration flags>
    ```

## Next steps

To optimize the cIRI, read about [trit encoding](root://ciri/0.1/references/trit-encoding.md).