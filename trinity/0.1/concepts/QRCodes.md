## QR Codes

Transaction information can be encoded into a QR code for scanning and auto-filling your address.  This is a convenient way to give someone your address so they can pay you.  As of December 2018, Trinity does not read amounts or tags from QR codes.  You can add them.  For now, Trinity will ignore them and set the amount and tag based on the user entry.

The following JSON format can be used:

```
const object = {
  address:
    'HBBYKAKTILIPVUKFOTSLHGENPTXYBNKXZFQFR9VQFWNBMTQNRVOUKPVPRNBSZVVILMAFBKOTBLGLWLOHQHUSQBCKVW',
  amount: 5000000,
  tag: 'PIZZAPIZZA',
  message: 'For the pizza!'
}
```

|KEY|TYPE|REQUIRED|DESCRIPTION|
|---|----|-----|-----------|
|address|	String|	Yes|	The address you want the user to send to. You must include the 9-character address checksum|
|amount| integer|	No|	The amount you want the user to send. It should be in iota (example: 5Mi should be entered as 5000000)|
|tag|	String|	No|	A tag that can be used to search for the transaction in the Tangle. The limit is 27 trytes|
|message|	String|	No|	A message that can be shown to the user or used to track the transaction with an internal ID. The message should be shown as a string of ASCII characters and should be encoded to trytes by the wallet|

To encode the QR code, Trinity uses [react-native-qrcode-svg](https://github.com/awesomejerry/react-native-qrcode-svg). Here's an example of how to generate your QR code in a React-based project with react-native-qrcode-svg using the example object above:

```
<QRCode
  value={JSON.stringify(object)}
  size={width / 2.8}
  color="black"
  backgroundColor="transparent"
/>
```
