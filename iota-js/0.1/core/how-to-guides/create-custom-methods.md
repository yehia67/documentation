# Create custom methods

**You can use the methods that have the `create` prefix to create your own custom methods.**

1. Install the HTTP client package

    ```bash
    npm install @iota/http-client
    ```

2. Create an API method

    ```js
    import { createHttpClient } from '@iota/http-client'
    import { createGetNodeInfo } from '@iota/core'

    const client = createHttpClient({
        // replace with your IRI node address 
        // or connect to a Devnet node for testing: 'https://nodes.devnet.iota.org:443'
        provider: 'http://localhost:14265'
    })

    const getNodeInfo = createGetNodeInfo(client)
    ```