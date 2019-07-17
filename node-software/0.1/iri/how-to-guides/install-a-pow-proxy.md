# Install a proof-of-work proxy server

**The `attachToTangle` endpoint is resource intensive. As a result, many calls to these endpoints can sometimes cause a node to crash. To resolve this problem, you can install a dedicated proxy server to do proof of work (PoW) instead of making the node do it.**

The PoW proxy server is an implementation of [Caddy](https://caddyserver.com/) that has IOTA middleware. This middleware allows the PoW proxy server to intercept calls to an IRI node's `attachToTangle` endpoint and do the PoW itself.

:::info:
All requests to the other IRI API endpoints are sent to the IRI node.
:::

## Prerequisites

To complete this guide, you need the following:

* An Internet connection
* A [public IP address](root://general/0.1/how-to-guides/expose-your-local-device.md) that's either static or connected to a dynamic DNS service such as [duckdns.org](https://www.duckdns.org)
* At least version 1.12 of the Go programming language (we recommend the latest version)
* GCC: For macOS, you can install GCC using [Homebrew](https://brew.sh/) (`brew install gcc`). For Windows, you can [install TDM-GCC](http://tdm-gcc.tdragon.net/download). For Linux (Ubuntu 18.04), you can [install GCC from the `build-essential` package](https://linuxize.com/post/how-to-install-gcc-compiler-on-ubuntu-18-04/).
* [Git](https://git-scm.com/downloads)

## Download, build, and run the proxy server

1. In the command prompt, check your `GOPATH` environment variable

    ```bash
    go env GOPATH
    ````

2. In any directory outside of the one in your `GOPATH` environment variable, clone the `iotacaddy/caddy` GitHub repository

    ```bash
    git clone https://github.com/luca-moser/iotacaddy.git
    ```

3. Change into the `iotacaddy/caddy` directory

    ```bash
    cd iotacaddy/caddy
    ```

4. Build the executable file with either the AVX or SSE implementation

        ```bash
        # AVX
        go build -tags="pow_avx"
        #SSE
        go build -tags="pow_sse"
        ```

        :::info:
        Most modern CPUs support AVX, but you may want to check which implementation that your CPU supports.
        :::

        This will create a executable file called `caddy` in the `iotacaddy/caddy` directory.

5. Create a file called `Caddyfile` in the same directory as your `caddy` executable file

6. Configure your PoW proxy server by [editing the `Caddyfile` file](https://caddyserver.com/tutorial/caddyfile). Here is an example of the contents of the file

        ```bash
        # The URL of your proxy server
        127.0.0.1:15265 {

        gzip

        # log requests to the proxy with rotation
        log requests.log {
                rotate_size 100
                rotate_age  90
                rotate_keep 20
                rotate_compress
                }

        #tls /etc/letsencrypt/live/iota-tangle.io/fullchain.pem /etc/letsencrypt/live/iota-tangle.io/privkey.pem

        # limit request body to 10 megabytes
        limits 10mb

        # intercept attachToTangle calls with a max MWM of 14 and 20 txs per call
        iota 14 20

        # The URL of your IRI node
        proxy / http://127.0.0.1:14265 {
                header_upstream X-IOTA-API-VERSION 1.4
                header_upstream Access-Control-Allow-Origin *
                }
        }
        ```

7. Run caddy via `./caddy` which will the configured interceptor parameters up on startup

        ```
        Activating privacy features... done.                                                                                             
        [iota interceptor] 2019/06/03 12:56:54 iota API call interception configured with max bundle txs limit of 20 and max MWM of 14   
        [iota interceptor] 2019/06/03 12:56:54 using PoW implementation: SyncAVX                                                         
                                                                                                                                        
        Serving HTTPS on port 14265                                                                                                      
        https://<hostname>:14265
        ```

If an `attachToTangle` calls get intercepted, the middleware will log it in stdout similar to:
```
[iota interceptor] 2019/06/03 12:58:08 new attachToTangle request from 80.218.171.223:33442                                      │
[iota interceptor] 2019/06/03 12:58:08 VBDKIEDKVYHWGROOMBEFZOJFAVITMGQBASCPVZWYTVRFSLMJTNYOOZVGVBEFZINUTVQI9VZQCISPDXJN9 - [input│
] -0.000001 Mi                                                                                                                   │
[iota interceptor] 2019/06/03 12:58:08 bundle: PYPWHTVICKOEJ9CFHDHOJJAWDARUZNPOIXONCYKHLFEFEGKXWSEJXGZSXKTS9BBGNKTQGQZCLCHPLIKIC │
[iota interceptor] 2019/06/03 12:58:08 bundle is using -0.000001 Mi as input                                                     │
[iota interceptor] 2019/06/03 12:58:08 doing PoW for bundle with 1 txs...                                                        │
[iota interceptor] 2019/06/03 12:58:08 took 273ms to do PoW for bundle with 1 txs
```

Caddy will generate a `requests.log` file containing the requests against the proxy.

Install PoW proxy:
The proxy runs in a Caddy Server.
On your proxy machine, please open up another additional port, i.e. `14266` where the proxy will bind to.
Then update the `Caddyfile` as per the following:
1. change the domain name to the one of your service   i.e., your-domain.com:14266
2. either remove the `tls` directive (if the SSL connection is terminated at the load balancer) or set it to your appropriate SSL certificates
3. change the line `proxy / http//address` to point to the address of your IRI node
4. run `pow_sse_middleware` script which will boot up a http-proxy between your client and your IRI node  and that will intercept `attachToTangle` (PoW) calls
5. set your to use the proxy port you open up above, e.g., `14266’

Please bear in mind that the proxy binary code does not install itself as a service and closing the shell will also kill it. 

To avoid this you can run the server using the following syntax:

pow_sse_middleware & disown

To check that the proxy is running, you should receive an output similar to the one below:

***************************
```Croot@trinity /opt/iri/caddy # ./caddy 
Activating privacy features... done. 
middleware2019/05/27 12:15:13 attachToTangle interception configured with max bundle txs limit of 200 
middleware2019/05/27 12:15:13 using proof of work method: PowSSE 
https://trinity.iota-tangle.io:14265
```
***************************
The proxy logs will be written to `requests.log` located in the same directory as the proxy binary. Moreover, all performed PoW will be logged in the stdout channel. 

It you want to compile the code and generate your own binary, you can find the required resources here along with the required instructions:

Link
Source code
https://github.com/luca-moser/iotacaddy with the plugin residing under https://github.com/luca-moser/iotacaddy/blob/master/iota/plugin.go
Guide
https://github.com/luca-moser/iotacaddy/blob/master/IOTA.md