# Run a cIRI node on a single-board computer

**When you run the cIRI on an SBC (single-board computer), it becomes a cIRI node that gives you direct access to an IOTA network. 
By running a node, you help the IOTA network to become more distributed by adding to the number of ledgers and validating your neighbors' transactions.**

:::info:
This guide cross compiles cIRI. You can also use the [Run a cIRI node on Linux](run-a-ciri-node-on-linux.md).
The compilation time for the cross compile is faster on modern machines than on SBCs.
:::

:::warning:Warning
cIRI is still under development. You shouldn't use cIRI in a production environment.
:::

If you want to use the most recent features and extensions, you should use [IRI](root://iri/0.1/introduction/overview.md).

:::info:
This guide was tested on an Orange Pi Zero and Zero Plus for ARMv7 and Aarch64 (32-Bit and 64-Bit) architectures, but the instructions should be the same for any common Cortex-A-based SBC.
:::

We recommended disabling proof of work (PoW) on small SBCs. Outsourcing the workload to a faster server might be also a good option for small SBCs.

## Prerequisites

To complete this guide, you need [an SBC](root://general/0.1/how-to-guides/setup-sbc.md) with the following minimum requirements:

- Ubuntu (or other Linux based OS, BSD should also work) with SSH enabled and a configured network. This guide uses Ubuntu. We recommend using Ubuntu if you consider yourself a beginner.
- At least 512 MB of RAM
- At least 64 GB storage (or 16 GB if the node is only for testing purposes)

## Download cIRI

cIRI is hosted in the [`entangled` GiHub repository](https://github.com/iotaledger/entangled).

1. [Install Bazel](https://docs.bazel.build/versions/master/install.html)

2. Install Git

     ```bash
    sudo apt-get install -y git
    ```
    :::info:
    To make sure that Git is installed, do the following: `git --version`. You should see a version number. If not, try installing Git again.
    :::

3. Clone the repository

    ```bash
    git clone https://github.com/iotaledger/entangled.git && cd entangled
    ```

## Cross compile cIRI

To execute cIRI, you need to cross compile it for your platform.

To cross compile cIRI, you need to execute one the following commands, depending on the architecture of your SBC. To check the architecture of your SBC, do the following:

```bash
uname -m
```

* Command for Aarch64 (64-bit):

    ```bash
    bazel build -c opt --define network=mainnet --define trit_encoding=5 --crosstool_top=@iota_toolchains//tools/aarch64--glibc--bleeding-edge-2018.07-1:toolchain --cpu=aarch64 --compiler='gcc' --host_crosstool_top=@bazel_tools//tools/cpp:toolchain //ciri
    ```

* Command for ARMv7 (32-bit):

    ```bash
    bazel build -c opt --define network=mainnet --define trit_encoding=5 --crosstool_top=@iota_toolchains//tools/armv7-eabihf--glibc--bleeding-edge-2018.07-1:toolchain --cpu='armeabi-v7a' --compiler='gcc' --host_crosstool_top=@bazel_tools//tools/cpp:toolchain //ciri
    ```

You can customize these commands by editing the build flags.


1. Choose which [IOTA network](root://getting-started/0.1/references/iota-networks.md) you want your node to run on. Replace `value` with `mainnet` or `testnet`.


    ```bash
    --define network=value
    ```

2. Choose which [trit encoding](root://ciri/0.1/references/ciri-configuration-options.md) to use to optimize your node

    ```bash
    --define trit_encoding=5
    ```
    The default encoding is 2.

3. Choose which compiler to use

    ```bash
    --compiler='value'
    ```
    The default compiler is GCC.

4. After running one of the commands, copy the compiled files to your SBC

### Create cIRI app directories on the SBC

After compiling cIRI, you need to copy the file compiled files to your SBC.
Before we copy the files, we create a directory for our cIRI application.

```bash
ssh -t USERNAME@IP_ADDRESS "sudo mkdir -p /etc/iota/ciri && sudo chown -R USERNAME:GROUP_NAME /etc/iota/ciri"
```

## Copy cIRI application files

:::info:
You can create a special group for cIRI so that every user in this group can run cIRI. 
If you decide to create a group, replace `GROUP_NAME` with the name of your group.
:::

If you want to use SCP with IPv6, you need to use the -6 flag and URL encoding with escaped characters.

For example:
```
IPv6 address: fe80::3fdc:53f0:949a:72b9
Network interface: wlp4s0
```

```bash
scp -r -6 SOURCE USERNAME@\[fe80::3fdc:53f0:949a:72b9%wlp4s0\]:TARGET
```

**ARMv7**
```bash
scp -r bazel-out/armeabi-v7a-opt/bin/ciri/ USERNAME@IP_ADDRESS:/etc/iota/
```

**Aarch64**
```bash
scp -r bazel-out/aarch64-opt/bin/ciri/ USERNAME@IP_ADDRESS:/etc/iota/
```

## Configure cIRI

Before you run cIRI, you need to configure it so that your node can connect to neighbors.

1. Create snapshot and configuration directories

    ```bash
    cd /etc/iota/ciri && \
    mkdir -p external/snapshot_conf_mainnet/file/ && \
    mkdir -p external/snapshot_sig_mainnet/file/ && \
    mkdir -p external/snapshot_mainnet/file/ && \
    mv ciri app && \
    mkdir -p ciri
    ```

2. Find some neighbors

    :::info:
    Read the [IRI guide](root://iri/0.1/how-to-guide/find-neighbor-iri-node.md) for help finding neighbors.
    :::

3. Create a configuration file called conf.yaml in the `ciri` directory and add the following settings. In the `neighbors` field, add the IP addresses or URLs of your neighbors.

    ```yaml
    log-level: info
    neighbors: "udp://148.148.148.148:14265"
    port: 14265
    ```

    Find out more about the possible [cIRI configuration settings](root://ciri/0.1/references/ciri-configuration-options.md).


## Set up the database

Your node stores the transactions that it receives in a sqlite3 database.

1. Install sqlite3

    ```bash
    sudo apt-get install sqlite3
    ```

2. Initialize the database

    ```bash
    mkdir -p db
    wget https://raw.githubusercontent.com/iotaledger/entangled/develop/common/storage/sql/schema.sql -O schema.sql
    sqlite3 db/mainnet.db < schema.sql
    ```

3. Download the snapshot files

    ```bash
    wget https://raw.githubusercontent.com/iotaledger/snapshots/master/mainnet/20181222/snapshot.json -O external/snapshot_conf_mainnet/file/downloaded
    wget https://raw.githubusercontent.com/iotaledger/snapshots/master/mainnet/20181222/snapshot.sig -O external/snapshot_sig_mainnet/file/downloaded
    wget https://raw.githubusercontent.com/iotaledger/snapshots/master/mainnet/20181222/snapshot.txt -O external/snapshot_mainnet/file/downloaded
    ```

## Run cIRI

Replace the values in the flags with the ones from these files:
* [conf.bzl](https://raw.githubusercontent.com/iotaledger/entangled/develop/consensus/conf.bzl)
* [snapshot.json](https://raw.githubusercontent.com/iotaledger/snapshots/master/mainnet/20181222/snapshot.json)

:::info:
You should run cIRI in [tmux](https://github.com/tmux/tmux). 
With tmux, the execution of the program continues even if you log out.
:::

```bash
./app \
--snapshot-file="external/snapshot_mainnet/file/downloaded" \
--snapshot-signature-file="external/snapshot_sig_mainnet/file/downloaded" \
--snapshot-signature-index=signature.index \
--snapshot-signature-depth=signature.depth \
--snapshot-signature-pubkey="signature.pubkey" \
--num-keys-in-milestone=NUM_KEYS_IN_MILESTONE \
--db-path="db/mainnet.db"
```
