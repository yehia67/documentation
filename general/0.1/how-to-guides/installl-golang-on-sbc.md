# Install golang on an Single-Board-Computer (SBC)

## Prerequisites

- ARM SBC (32-bit or 64-bit)
- Linux based operation system

1. Check your architecture

```bash
uname -i
```

2. Download the [golang sources and binaries](https://golang.org/dl/) for your system architecture

:::info:
Check the [golang source and binaries page](https://golang.org/dl/) before. 
The version provided in this guide might be outdated.
:::

aarch64 => ARMv8 (64-bit)
armv6l or armv7l => ARMv6 (32-bit)

**ARMv8**

```bash
wget https://storage.googleapis.com/golang/go1.6.2.linux-amd64.tar.gz
```

**ARMv6 or ARMv7**

```bash
wget https://dl.google.com/go/go1.12.7.linux-armv6l.tar.gz
```

3. Move the sources and binaries

```bash
sudo mv go /usr/local/
```

4. Create the go directories for your sources and packages

USERNAME => The username you are logged in with.

```bash
mkdir -p ~/[USERNAME]/go/src
mkdir ~/[USERNAME]/go/bin
mkdir ~/[USERNAME]/go/pkg
```

5. Add golang install directory to env variables

You can use another editor, if you want to.

```bash
vim /etc/environment
```

Add this to the end of the file. Replace ``USERNAME`` with the username you are logged in with.
```bash
GOROOT=/usr/local/go
GOPATH=~/[USERNAME]/go
GO111MODULE=on
```

6. Create soft-link to golang binaries

```bash
ln -s /usr/bin/go /usr/local/go/bin/go
ln -s /usr/local/go/bin/gofmt /usr/bin/gofmt
```

7. Check your golang installation.

```bash
go version
```

should return 

XX => Your architecture. arm64 for ARMv8 and arm32 for ARMv6 and ARMv7.
```bash
go version go1.12.7 linux/armXX
```

