# Troubleshooting

**Use this reference guide to resolve issues related to installing or running the Ict.**

## 401 Failed to fetch details from Ict REST API

Make sure that the values of the `gui_password` and `REST API PASSWORD` fields are the same.

The easiest way to check these fields is in the web GUI. In a web browser, go to the URL and GUI port of your Ict node. For example, `example.com:1337`. Click **REPORT.IXI** and make sure that the values of the ICT REST API PASSWORD and the ICT REST API PORT fields are the same as the values of the `gui_password` and `gui_port` fields.

**Tip:** The `gui_password` and `gui_port` fields are in the `/home/ict/config/ict.cfg` file.

