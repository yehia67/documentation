# Troubleshooting

**Use this reference article to resolve issues related to installing or running the Ict.**

If you can't find the solution to your issue, search the [IOTA StackExchange](https://iota.stackexchange.com/).

It sometimes helps others to find a solution for you if you can provide them with your log messages. To get more detailed log messages, stop the Ict and start it again with the [`--debug`](../references/command-line-flags.md) flag.

## Can't connect to the Ict website

The Ict website is hosted at the IP address or the URL of your node on the GUI port. This port is in your /home/ict/ict.cfg file in the `gui_port` field. The default port is 1337.

For example, if the URL of your node is `example.com`, and your GUI port is 1337, your Ict website is hosted at the following address:

```
example.com:1337
```

:::info:
If you can't access this page, [make sure that you've forwarded the GUI port to your device](root://general/0.1/how-to-guides/expose-your-device.md).
:::

## Forgotten password to the Ict website

If you go to log into the Ict website and you can't remember your password, check the `gui_password` filed in the Ict configuration file.

```bash
cd /home/ict
sudo nano ict.cfg
```

## 401 Failed to fetch details from Ict REST API

This error message is related to the Report module. This module uses the password that you created to log into the Ict website to get data from your node.

In a web browser, go to the Ict website. For example, `example.com:1337`. Click **REPORT.IXI** and make sure that the values of the ICT REST API PASSWORD and the ICT REST API PORT fields are the same as the values of the PASSWORD and PORT fields in the **CONFIGURATION** tab.

## 500 Internal server error on the chat.ixi webpage

If you see this message in the web browser, do the following:

1. Go to **MANAGE MODULES**
2. Next to CHAT.IXI, click **REMOVE** 
3. Click **INSTALL**
4. In the GITHUB REPOSITORY field, enter `iotaledger/chat.ixi`
5. Click **INSTALL**

Now, go to the chat.ixi webpage. You should see the user interface for the Chat module.

## ERROR Unable to create file logs//ict.log

Make sure you start the Ict with root priviledges such as using the `root` command.

