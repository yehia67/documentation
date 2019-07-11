# Troubleshooting

**Use this reference article to resolve issues related to installing or running the Ict.**

If you can't find the solution to your issue, search the [IOTA StackExchange](https://iota.stackexchange.com/).

It sometimes helps others to find a solution for you if you can provide them with your log messages. To get more detailed log messages, stop the Ict and start it again with the [`--debug`](../references/command-line-flags.md) flag.

## Can't connect to the Ict website

The Ict website is hosted at the IP address or the URL of your node on the GUI port. This port is in your /home/ict/ict.cfg file in the `gui_port` field. The default port is 2187.

For example, if the URL of your node is `example.com`, and your GUI port is 2187, your Ict website is hosted at the following address:

```
example.com:2187
```

:::info:
If you can't access this page, [make sure that you've forwarded the GUI port to your device](root://general/0.1/how-to-guides/expose-your-local-device.md).
:::

## Forgotten password to the Ict website

1. If you try to log into the Ict website and you can't remember your password, open the Ict configuration file in the terminal.

    ```bash
    cd /home/ict
    sudo nano ict.cfg
    ```

2. Change the value of the `gui_password` field to `LSKIEUUZDIRWLLTDLXEFWYSUSKKDIVDVKYUKFOCUVKLUCFTEGUBTTTYJKXFRFTPZNHLAPFMPJMNNTLRVU`

    :::info:
    This is a Curl hash of the default password `change_me_now`.
    :::

3. Log into the Ict website, using the password `change_me_now`

4. Go to **CONFIGURATION** and change your password to something new

## 401 Failed to fetch details from Ict REST API

This error message is related to the Report module. This module uses the password that you created to log into the Ict website to get data from your node.

In a web browser, go to the Ict website. For example, `example.com:2187`. Click **REPORT.IXI** and make sure that the values of the ICT REST API PASSWORD and the ICT REST API PORT fields are the same as the values of the PASSWORD and PORT fields under **WEB ACCESS** in the **CONFIGURATION** tab.

## 500 Internal server error on the chat.ixi webpage

If you see this message in the web browser, do the following:

1. Go to **MANAGE MODULES**
2. Next to CHAT.IXI, click **REMOVE** 
3. Click **INSTALL**
4. In the GITHUB REPOSITORY field, enter `iotaledger/chat.ixi`
5. Click **INSTALL**

Now, go to the chat.ixi webpage. You should see the user interface for the Chat module.

## ERROR Unable to create file logs//ict.log

Make sure you start the Ict with root priviledges such as using the `sudo` command.

