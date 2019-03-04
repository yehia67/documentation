# Setting up an IOTA node on an SBC (Single-board computer)

#### Warning: 
Ths guide uses cIRI. cIRI is still under development. Do not except a stable node.
You should not use cIRI in production!

This guide describes how to set up a node on a small SBC. 
If you SBC has restriced resources, less than 4 GB memory, we recommend to use cIRI.
cIRI is designed to be more memory- and storage-efficient than [IRI](root://iri/0.1/introduction/overview.md).. 
If you want to use the most recent features and extensions, you should use [IRI](root://iri/0.1/introduction/overview.md).
IRI requires at least 4 GB of memory. Therefore it is not possible to use IRI on all SBCs.

**Note:** The Orange Pi Zero and Zero Plus for this guide, but I try to keep it as general as possible.
It should be possible to follow this guide with any common Cortex-A based SBC.
I cover ARMv7 and Aarch64 (32-Bit and 64-Bit). It should be possible to use this guide for any Cortex-A based platform.

## Prerequisites

### Host-system

- Linux, MacOS (BSD based OS should also work)

**Note:** If you use Windows, you should use [a Linux VM.](root://general/0.1/how-to-guides/set-up-virtual-machine.md)
Windows 10 also supports the [Linux Subsystem.](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
If you are an advanced user, you can also use the Windows equivalent tools.

### To complete this guide, you need [an SBC](root://general/0.1/how-to-guides/setup-sbc.md) with the following minimum requirements:

- Ubuntu (or other Linux based OS, BSD should also work) with enabled SSH and configured network
- At least 512 MB memory.
- Ubuntu (Other Linux distribution should also work. BSD based OS might also work.) 
- At least 64 GB storage (or 16 GB if the node is only for testing purposes)
- You might want to check our ["Setting up an SBC for IOTA guide"](root://iota-sbc/0.1/how-to-guides/setup-sbc.md).
- It is recommended to disable PoW on small SBCs. 
Outsourcing the workload to a faster server might be also a good option for small SBCs.
- The guide uses Ubuntu. We recommend to stick to Ubuntu if you consider yourself as beginner

## 1. Clone the git repository

```bash
git clone https://github.com/iotaledger/entangled.git && cd entangled
```

## 2. Install Bazel

Follow the [installation guide](https://docs.bazel.build/versions/master/install.html) for your OS in the Bazel documentation.

## 3. Cross compile cIRI

### Check the architecture of your SBC

You can check your architecture with:
```bash
uname -m
```

### Tangle Network

You can change the tangle network with
``bash
--define network=value
``
The value can be set to mainnet or testnet

### Trit encoding

You should read the [trit encoding documentation](root://ciri/0.1/references/ciri-configuration-options.md
), if you want to optimize your cIRI node. 

### Compiler

If you want to use another compiler, you can change the compiler with
```bash
--compiler='value'
```
The default compiler is gcc

### Start cross compiling

You need to execute one the following commands on your host machine:

#### Command for Aarch64 (64-Bit)

```bash
bazel build -c opt --define network=mainnet --define trit_encoding=5 --crosstool_top=@iota_toolchains//tools/aarch64--glibc--bleeding-edge-2018.07-1:toolchain --cpu=aarch64 --compiler='gcc' --host_crosstool_top=@bazel_tools//tools/cpp:toolchain //ciri
```

#### Command for ARMv7 (32-Bit)

```bash
bazel build -c opt --define network=mainnet --define trit_encoding=5 --crosstool_top=@iota_toolchains//tools/armv7-eabihf--glibc--bleeding-edge-2018.07-1:toolchain --cpu='armeabi-v7a' --compiler='gcc' --host_crosstool_top=@bazel_tools//tools/cpp:toolchain //ciri
```

## 4. Copy the files to your device

GROUP_NAME: You can create a special group for cIRI. So every user in this group is able to run cIRI. 
You can also just set it to your user.

### SCP and IPv6

If you want to use SCP with IPv6, you need to use the -6 flag and the URL notation with escaping.
For example:
IPv6 address: fe80::3fdc:53f0:949a:72b9
Network interface: wlp4s0

```bash
scp -r -6 SOURCE USERNAME@\[fe80::3fdc:53f0:949a:72b9%wlp4s0\]:TARGET
```

### ARMv7
```bash
ssh -t USERNAME@IP_ADDRESS "sudo mkdir -p /etc/iota/ciri && sudo chown -R USERNAME:GROUP_NAME /etc/iota/ciri" && \
scp -r bazel-out/armeabi-v7a-opt/bin/ciri/ USERNAME@IP_ADDRESS:/etc/iota/
```

### Aarch64
```bash
ssh -t USERNAME@IP_ADDRESS "sudo mkdir -p /etc/iota/ciri && sudo chown -R USERNAME:GROUP_NAME /etc/iota/ciri"  && \
scp -r bazel-out/aarch64-opt/bin/ciri/ USERNAME@IP_ADDRESS:/etc/iota/
```

## 5. SSH to your device

Check out our ["Setting up an SBC for IOTA guide"](root://iota-sbc/0.1/how-to-guises/setup-sbc.md#3.5.-connect-via-ssh-to-your-sbc) for ssh connection with IPv6. 

```bash
ssh USERNAME@IP_ADDRESS
```

## 6. Create snapshot and config directories

```bash
cd /etc/iota/ciri && \
mkdir -p external/snapshot_conf_mainnet/file/ && \
mkdir -p external/snapshot_sig_mainnet/file/ && \
mkdir -p external/snapshot_mainnet/file/ && \
mv ciri app && \
mkdir -p ciri
```

## 7. Create config file

Yaml has the following structure:
```yaml
KEY: VALUE
```
You should add your neighbors to the conf.yaml. The [IRI guide](root://iri/0.1/how-to-guide/find-neighbor-iri-node.md) describes how you can find neighbors.

An example conf.yaml:

```bash
printf "\
log-level: debug \n\
neighbors: \"NEIGHBORS\" \n\
port: 14265 \n\
" >> ciri/conf.yml
```

## 8. Setup the database

### Install sqlite3

```bash
sudo apt-get install sqlite3
```

### Initialize the database

```bash
mkdir -p db
wget https://raw.githubusercontent.com/iotaledger/entangled/develop/common/storage/sql/schema.sql -O schema.sql
sqlite3 db/mainnet.db < schema.sql
```

## 9. Get the snapshot files

```bash
wget https://raw.githubusercontent.com/iotaledger/snapshots/master/mainnet/20181222/snapshot.json -O external/snapshot_conf_mainnet/file/downloaded
wget https://raw.githubusercontent.com/iotaledger/snapshots/master/mainnet/20181222/snapshot.sig -O external/snapshot_sig_mainnet/file/downloaded
wget https://raw.githubusercontent.com/iotaledger/snapshots/master/mainnet/20181222/snapshot.txt -O external/snapshot_mainnet/file/downloaded
```

## 10. Get the configuration information by conf.bzl

You need the NUM_KEYS_IN_MILESTONE variable from [conf.bzl](https://raw.githubusercontent.com/iotaledger/entangled/develop/consensus/conf.bzl)

You need the following variables from [snapshot.json](https://raw.githubusercontent.com/iotaledger/snapshots/master/mainnet/20181222/snapshot.json):
signature.index, signature.depth, signature.pubkey

Replace the variables with their values in the cIRI execution command.

## 11. Run cIRI

**Note:** You should run cIRI in [tmux](https://github.com/tmux/tmux). 
With tmux the execution of the program continues, even if you logout.

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
