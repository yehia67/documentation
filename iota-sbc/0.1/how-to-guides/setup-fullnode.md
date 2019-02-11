# Setting up an IOTA full-node on an SBC (Single-board computer)

#### Warning: 
Ths guide uses cIRI. CIRI is still under development. Do not except a stable full-node.
You should not use cIRI in production!

This guide describes how to setup a full-node on a small SBC. Since SBCs usually have restricted resources, 
we recommend to use cIRI. CIRI is designed to be more memory- & storage-efficient than [IRI](root://iri/0.1/home.md).. 
If you want to use the most recent features & extensions, you should use [IRI](root://iri/0.1/home.md).
IRI requires at least 4 GB of memory. Therefore it is not possible to use IRI on all SBCs.

*_Note:_* I use an Orange Pi Zero & Zero Plus for this guide, but I try to keep it as general as possible.
It should be possible to follow this guide with any common Cortex-A based SBC.
I cover ARMv7 & Aarch64 (32-Bit & 64-Bit). It should be possible to use this guide for any Cortex-A based platform.

## Requirements

### Host-system:

- Linux (Ubuntu is used in this guide) MacOS should also work.

*_Note:_* If you use Windows, you should use [a Linux VM.](https://www.windowscentral.com/how-run-linux-distros-windows-10-using-hyper-v)
Windows 10 also supports the [Linux Subsystem.](https://docs.microsoft.com/en-us/windows/wsl/install-win10) 
If you are an advanced user, you can also use the Windows equivalent tools.

### SBC:

- Ubuntu (or other Linux based OS, BSD should also work) with enabled SSH & configured network

- At least 256 MB memory. Better: 512 MB or 1 GB. 

- Ubuntu (Other Linux distribution should also work. BSD based OS might also work.) 

- At least 16 GB storage (for testing purposes), to run the main-tangle: at least 64 GB.

## Before you start with this guide

- You might want to check our ["Setting up an SBC for IOTA guide"](root://iota-sbc/0.1/how-to-guises/setup-sbc.md).

- It is recommended to disable PoW on small SBCs. 
Outsourcing the workload to a faster server might be also a good option for small SBCs.

- The guide uses Ubuntu. We recommend to stick to Ubuntu if you consider yourself as beginner

## Clone the git repository

```bash
git clone https://github.com/iotaledger/entangled.git && cd entangled
```

## Install Bazel

Follow the [installation guide](https://docs.bazel.build/versions/master/install.html) for your OS in the Bazel documentation.

## Cross compile cIRI

### Tangle Network

You can change the tangle network with
``bash
--define network=value
``
The value can be set to mainnet or testnet

### Trit conversion optimization

You can change the trit conversion optimization with
```bash
--define trit_encoding=value
```

The value can be set to 3 or 5

- 5 => optimized mode, for production
- 3 => debugging option

### Compiler

If you want to use another compiler, you can change the compiler with
```bash
--compiler='value'
```
The default compiler is gcc

### Check your architecture

You can check your architecture with:
```bash
uname -m
```

### Compiling command for Aarch64 (64-Bit)

```bash
bazel build -c opt --define network=mainnet --define trit_encoding=5 --crosstool_top=@iota_toolchains//tools/aarch64--glibc--bleeding-edge-2018.07-1:toolchain --cpu=aarch64 --compiler='gcc' --host_crosstool_top=@bazel_tools//tools/cpp:toolchain //ciri
```

### Compiling command for ARMv7 (32-Bit)

```bash
bazel build -c opt --define network=mainnet --define trit_encoding=5 --crosstool_top=@iota_toolchains//tools/armv7-eabihf--glibc--bleeding-edge-2018.07-1:toolchain --cpu='armeabi-v7a' --compiler='gcc' --host_crosstool_top=@bazel_tools//tools/cpp:toolchain //ciri
```

## Copy the files to your device

GROUP_NAME: You can create a special group for ciri. So every user in this group is able to run ciri. 
You can also just set it to your user.

### SCP & IPv6

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

## SSH to your device

Check out our ["Setting up an SBC for IOTA guide"](root://iota-sbc/0.1/how-to-guises/setup-sbc.md#3.5.-connect-via-ssh-to-your-sbc) for ssh connection with IPv6. 

```bash
ssh USERNAME@IP_ADDRESS
```

## Create snapshot & config directories

```bash
cd /etc/iota/ciri && \
mkdir -p external/snapshot_conf_mainnet/file/ && \
mkdir -p external/snapshot_sig_mainnet/file/ && \
mkdir -p external/snapshot_mainnet/file/ && \
mv ciri app && \
mkdir -p ciri
```

## Create config file

Yaml has the following structure:
```yaml
KEY: VALUE
```
You should add your neighbors into the conf.yaml.

An example conf.yaml:

```bash
printf "\
log-level: debug \n\
neighbors: \"NEIGHBORS\" \n\
port: 14265 \n\
" >> ciri/conf.yml
```

## Setup the database

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

## Get the snapshot files

```bash
wget https://raw.githubusercontent.com/iotaledger/snapshots/master/mainnet/20181222/snapshot.json -O external/snapshot_conf_mainnet/file/downloaded
wget https://raw.githubusercontent.com/iotaledger/snapshots/master/mainnet/20181222/snapshot.sig -O external/snapshot_sig_mainnet/file/downloaded
wget https://raw.githubusercontent.com/iotaledger/snapshots/master/mainnet/20181222/snapshot.txt -O external/snapshot_mainnet/file/downloaded
```

## Get the configuration information by conf.bzl

You need the NUM_KEYS_IN_MILESTONE variable from [conf.bzl](https://raw.githubusercontent.com/iotaledger/entangled/develop/consensus/conf.bzl)

You need the following variables from [snapshot.json](https://raw.githubusercontent.com/iotaledger/snapshots/master/mainnet/20181222/snapshot.json):
signature.index, signature.depth, signature.pubkey

Replace the variables with their values in the ciri execution command.

## Run cIRI

*_Note:_* We recommend to run ciri in [tmux](https://github.com/tmux/tmux).

```bash
.app \
--snapshot-file="external/snapshot_mainnet/file/downloaded" \
--snapshot-signature-file="external/snapshot_sig_mainnet/file/downloaded" \
--snapshot-signature-index=signature.index \
--snapshot-signature-depth=signature.depth \
--snapshot-signature-pubkey="signature.pubkey" \
--num-keys-in-milestone=NUM_KEYS_IN_MILESTONE \
--db-path="db/mainnet.db"
```
