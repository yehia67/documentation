# Troubleshooting

**Use this reference guide to resolve issues related to installing or running the Ict.**

If you can't find the solution to your issue, search the [IOTA StackExchange](https://iota.stackexchange.com/).

## 401 Failed to fetch details from Ict REST API

If you see this message in the logs, make sure that the values of the `gui_password` and `REST API PASSWORD` fields are the same.

The easiest way to check these fields is in the web GUI. In a web browser, go to the URL and GUI port of your Ict node. For example, `example.com:1337`. Click **REPORT.IXI** and make sure that the values of the ICT REST API PASSWORD and the ICT REST API PORT fields are the same as the values of the `gui_password` and `gui_port` fields.

**Tip:** The `gui_password` and `gui_port` fields are in the `/home/ict/config/ict.cfg` file.

## 500 Internal server error on the chat.ixi webpage

If you see this message in the web browser, do the following:

1. Go to **MANAGE MODULES**
2. Next to CHAT.IXI, click **REMOVE** 
3. Click **INSTALL**
4. In the GITHUB REPOSITORY field, enter `iotaledger/chat.ixi`
5. Click **INSTALL**

Now, go to the chat.ixi webpage. You should see the user interface for the chat.ixi module.

