# Troubleshooting

## Common baud rates

4800, 9600, 19200, 38400, 57600, 76800, 115200, 128000, 256000,  230400, 460800, 921600

## I cannot connect to my node via SSH

This can be caused by a lot of reasons. You should check the following list:
- Are you sure that the IP address is right? 
If not, check it again and use another way to find the IP address of your device.
- Was the flash process successful? 
If possible, flash your OS onto your SD-Card and check it on a device with VGA/HDMI.
It is way simpler to detect problems with a display. 
If not possible, use an USB-to-UART adapter to connect to your SBC.
- Is the SD-Card broken? Check the SD-Card with something different. e.g. Smartphone or PC.
- Is SSH activated for your device? 
Some devices require an additional setup or activation of SSH. 
You should take a look into the documentation of your device or ask in a forum.

## I am getting non ascii character with my USB-to-UART adapter

- Can you successfully login to your device and just some characters are weird? 
If you can read the messages while system boot and just some characters are weird, this is not abnormal. 
Just continue using it. You should switch to an SSH terminal as fast as possible 
due to some problems with the serial terminal.
- Have you checked your baud rate? 
Take a look into the documentation of your device or ask in some forum. 
It might be the case that your device is not configured correctly. Just try common baud rates.
- Are you using a standard USB charger or the USB-port of a PC to power up your device?
You might want to try a more powerful power supply. Usually the powerful ones have a fixed Micro-USB cable.
Make sure to buy one with at least 2A. Better: 3A.

## Username is not in the sudoers file. This incident will be reported

This happens when the user has no rights to use sudo. Just follow [this article](https://www.tecmint.com/fix-user-is-not-in-the-sudoers-file-the-incident-will-be-reported-ubuntu/) to fix this.

## Unable to locally verify the issuer's authority.

You might broke your OpenSSL installation. This can happen when you for example tried to install LibreSSL or upgrade OpenSSL.
The simplest solution is to just reinstall your operation system.