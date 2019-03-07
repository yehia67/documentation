# Create a QR Code that Trinity can read

**To avoid making senders enter all 90 characters of a recipient's address into the Address field, create a QR code that Trinity can read.**

QR codes enable IOTA payments for recipients such as ecommerce websites. By putting a QR code on a payment page, customers can scan the code to auto-populate the Address field with the vendor's address.

:::info:
To send to an address in Trinity, it must include the 9-tryte checksum. If you generated a new address in Trinity, that address will already include the checksum.
:::

1. Go to [goqr.me](http://goqr.me)
2. Copy and paste your address with its 9-tryte checksum in the Text field
3. Download or embed the generated QR code
4. Send the QR code to your sender, or add it to your website

When the sender scans the QR code in Trinity, the Address field will be populated with your address.

![Example QR code](../qr-code.png)
