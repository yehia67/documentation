# Install Go on a single-board computer

**To create or run applications that use the Go programming language, you need to install it.**

## Prerequisites

To complete this guide, you must have the following

- A single board computer that uses an ARM system architecture (32-bit or 64-bit)
- Linux-based operating system

1. Check your system architecture

    ```bash
    uname -i
    ```

2. Download the [Go source and binary files](https://golang.org/dl/) for your system architecture

3. Move the Go source and binary files
    
    ```bash
    sudo mv go /usr/local/
    ```

4. Create the `go` directories. Replace the `$USERNAME` placeholder with your current Linux username.
    
    ```bash
    sudo mkdir -p ~/$USERNAME/go/src
    sudo mkdir ~/$USERNAME/go/bin
    sudo mkdir ~/$USERNAME/go/pkg
    ```

5. Open your environment variables file

    ```bash
    sudo nano /etc/environment
    ```

6. Add the Go install directory to your environment variables file. Replace the `$USERNAME` placeholder with your current Linux username.
    
    ```bash
    GOROOT=/usr/local/go
    GOPATH=~/[USERNAME]/go
    ```

7. Create soft links to the Go binary files
    
    ```bash
    ln -s /usr/bin/go /usr/local/go/bin/go
    ln -s /usr/local/go/bin/gofmt /usr/bin/gofmt
    ```

8. Check that Go is installed
    
    ```bash
    go version
    ```
    
    You should see a version number. If not, try installing Go again.

:::success:Congratulation :tada:
You've installed Go on your SBC. Now, you can start creating or using applications written in the Go programming language.
:::
