# Send spam transactions to your node

**In this guide, you test how many transactions per second your node can process by using the `spammer` API endpoint to send it spam transactions.**

When you send your node spam transactions, it processes them, adds them to its ledger, and forwards them to its neighbors for processing.

## Prerequisites

To complete this guide, you must have [cURL](https://curl.haxx.se/) installed on your device.

---

1. Open a command prompt and enter the following request. If you want to access your node over the Internet, replace `localhost` with your public IP address.

    ```bash
    curl -X POST -H 'Content-Type:application/json' -H 'X-IOTA-API-Version:1' -d "{'cmd':'start', 'tps':1000}" http://localhost:8080/spammer
    ```

    :::info:
    This example sends your node 1,000 transactions per second (TPS). If you want to change the TPS, you can change the value of the `tps` field.
    :::

2. To check that your node is receiving transactions, open the dashboard by going to `http://localhost:8081/dashboard` in a web browser

    ![GoShimmer dashboard](../images/goshimmer-web-ui.png)
    
    :::info:
    The displayed TPS may be lower than the value of the `tps` parameter you used. The reason for this difference may be due to limits with your computer hardware.
    :::

## Next steps

Now that your node is receiving transactions, you can [monitor it for incoming transaction](../how-to-guides/subscribe-to-events.md) to see the transaction data.