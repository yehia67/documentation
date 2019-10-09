# Flashing

**To allow a microcontroller to run your application, you need to flash the binary code onto its flash memory, using a programmer.**

On a normal PC or single-board computer, the operating system is on a storage system such as HDD, SDD, SD Card, or eMMC.
Before your system can run the operating system, it must run [firmware](https://en.wikipedia.org/wiki/Firmware#Personal_computers) to communicate with the storage system.

Microcontrollers on the other hand run only the firmware, which includes the embedded [real-time operating system](https://en.wikipedia.org/wiki/Real-time_operating_system)(RTOS).

When you write an application for an RTOS, you compile everything into one binary and flash it onto the flash memory of the microcontroller. Then, the microcontroller runs the compiled code.

:::info:
Some microcontrollers, such as the Arduino Uno, use a bootloader, which does a similar job as the firmware on a PC or SBC. 
The bootloader adds some logic to the microcontroller, so that you are able to program the microcontroller through USB.
A bootloader is more use-friendly because you don't need additional hardware to start programming the microcontroller. But, the bootloader uses unnecessary space on the flash memory, which could be used by your application.
:::

## How flashing works

Microcontrollers have the following interfaces that are used for flashing:

* [Serial Wire Debug](http://www.ti.com/lit/wp/spmy004/spmy004.pdf)
* [JTAG](https://en.wikipedia.org/wiki/JTAG)

Both of these interfaces use the same protocol, but have different pin counts.

To flash binary code onto the microcontroller, you need to use a device called programmer.

J-Link is one of the most famous general programmers. You can program most microcontrollers with J-Link.

Other programmers exist for microcontrollers that are made by specific companies. For example, the [STLinkV2](https://www.st.com/en/development-tools/st-link-v2.html) is used to program microcontrollers made by [STMicroelectronics](https://de.wikipedia.org/wiki/STMicroelectronics).
 