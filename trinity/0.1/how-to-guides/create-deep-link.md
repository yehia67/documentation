# Create a deep link

**Deep links are customizable links that automatically fill the transaction fields in Trinity. You can add deep links to your website or ecommerce platform to make IOTA payments quicker and easier for customers.**

When you click a deep link, Trinity is opened and the parameters of the link are used to fill the transaction fields.

You can use these parameters to specify the address, amount, and message fields of a transaction.

:::warning:
Beware of phishing scams. Make sure the link opens the official Trinity wallet.
:::

All deep links must start with the `iota://` URI followed by a 90-tryte address (with checksum).

If you want to specify an amount or message, you can use the following query parameters:

* `amount`
* `message`

For example:

```
iota://XNGPUCURQLLJFGXNDCMROGYNWAZP9AFWSVEUAIWIESOSPYDUPWSPSREEBWJPD9ZWZPAJKBHPLG99DJWJCZUHWTQTDD/?amount=1000000&message=shirt
```

:::info:
Accounts that are linked to hardware wallets can't send value transactions with a message.
:::

1. Go to **Settings** > **Advanced settings** and enable deep linking

2. Go back to the home page and click **Receive** to generate a new address

3. Manually create a deep link outside of Trinity, using the new address

4. Embed the deep link on your website or ecommerce platform

    For example, on a website you may want to create a clickable link in HTML:

    ```html
    <a>iota://XNGPUCURQLLJFGXNDCMROGYNWAZP9AFWSVEUAIWIESOSPYDUPWSPSREEBWJPD9ZWZPAJKBHPLG99DJWJCZUHWTQTDD/?amount=1000000&message=shirt</a> 
    ```

    :::info:
    You currently can't add spaces to the message in deep links.
    :::
