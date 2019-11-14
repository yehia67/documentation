# Get started with the nRF52

**The nRF52-series of microcontrollers are an ideal solution for wearables, toys, smart home devices and appliances, and wireless charging. We use this series of microcontrollers because they include Bluetooth and are usually cheap. In this guide, you learn how to get started with the nRF52-series of microcontrollers. When you've completed this guide, you'll be able to follow our series of tutorials for using IOTA on the Internet of Things.**

## Hardware

We recommend that you buy the following useful components for building circuits:

- **Breadboard:** Allows you to make temporary circuits for connecting hardware components without needing to solder them.

- **DuPont cables (female-to-female, male-to-female, and male-to-male connectors)** Allow you to connect devices through pin headers or a breadboard.

**Pin headers (male-to-male and male-to-female connectors):** Allow you to connect your different hardware components to the microcontroller

## Step 1. Choose a microcontroller

Many companies manufacture and distribute nRF52-series microcontrollers. For example, the following options are available:

- nRF52832 module and an nRF52832 minimum test board (tested with these tutorials)
- nRF52832 breakout board by SparkFun
- nRF52832 development kit (DK)
- nRF52832 micro development kit (MDK)

Development kits are often the most expensive option because they include useful features such as a labelled pins, a programmer, and a USB-to-UART connector.

The modules alone are often the cheapest option, but they are difficult to set up because they require knowledge. As a result, in these guides, we assume that you have a breakout board.

When choosing a microcontroller, you should consider the following questions:

### Is the programmer integrated on the board?

A programmer is a device that is used to transfer the machine code to microcontroller's flash memory from a PC.

If your microcontroller does not have an integrated [programmer](https://www.engineersgarage.com/how-to-guides/microcontroller-programmer-burner) (sometimetimes called a debugger), you'll need to [choose one to buy and wire it to the microcontroller](../how-to-guides/connect-programmer.md).

### Is the USB-to-UART integrated on the board?

- If your microcontroller does not have an integrated USB-to-UART connector (sometimes called a USB to TTL serial connector), you'll need to buy a separate one

:::info:
Be sure to buy a connector that's compatible with your operating system.
:::

2\. If you buy a microcontroller that doesn't have an integrated programmer (sometimes called a debugger), buy one 


    
3\. If you buy a microcontroller that doesn't have an integrated USB-to-UART connector, buy one and [use it to connect to your microcontroller's serial interface](../how-to-guides/connect-to-serial-interface.md).




##
    
4\. **Optional:** Buy a breadboard, DuPont cables, and pin headers


    
6\. **Optional:** Buy a single-board computer

A single-board computer (SBC) is often more powerful and has more memory than a microcontroller. As a result, you can use one to connect to your microcontroller or even to run an [IOTA node](root://ciri/0.1/how-to-guides/run-a-ciri-node-on-an-sbc.md).

:::info:
Some of the cheapest SBCs include the Raspberry Pi Zero or Orange Pi Zero. 
We recommend a device with Wi-Fi and Bluetooth LE (version >= 4.0) so that you can easily connect to it.
:::

7\. Buy an I2C environment sensor such as the Bosch BME/BMP 280 sensor

:::info:
We use an operating system called RIOT OS in our tutorials.

Before buying any other sensors, check the [RIOT OS sensor driver list](http://riot-os.org/api/group__drivers__sensors.html) to make sure that they are supported.
:::

## Next steps

[Set up your microcontroller](../how-to-guides/set-up-nrf52-microcontroller.md).
    
    