# Connect to an I2C sensor

**I2C is a protocol that allows one device to exchange data with one or more connected devices through the use of a single data line and clock signal. In this guide, you connect an I2C sensor to an nRF52 microcontroller so that they can communicate with each other.**

## Prerequisites

To complete this guide, you need the following:

- An nRF52 series microcontroller
- An I2C sensor development board

## Connect a single sensor to your microcontroller

1. Connect the SCL and SDA pins to the microcontroller
    
    :::info:
    RIOT OS assigns pins P0.26 and P0.27 to the I2C protocol.
    :::
        
    | **Microcontroller** | **I2C sensor** |
    |-----------------|------------|
    |      P0.26      |     SDA    |
    |      P0.27      |     SCL    |

    
:::info:
The nRF52 has a feature called [EasyDMA](https://infocenter.nordicsemi.com/index.jsp?topic=%2Fcom.nordic.infocenter.nrf52832.ps.v1.1%2Feasydma.html&cp=3_1_0_9&anchor=easydma), which allows you to [assign wire protocols to any pin](https://infocenter.nordicsemi.com/index.jsp?topic=%2Fcom.nordic.infocenter.nrf52832.ps.v1.1%2Ftwim.html&cp=3_1_0_32&anchor=concept_scx_f5p_xr).
:::

## Connect multiple sensors to your microcontroller

Because multiple sensors can use the same SDA line, the microcontroller needs a way to distinguish them and talk to a single sensor at a time. The I2C protocol uses the concept of device addressing to coordinate traffic on the data line.

If you're connecting more than one I2C sensor to your microcontroller, you need to make sure that each one has a unique 7-bit address.

Most I2C integrated circuits allow you to select I2C addresses to avoid address conflicts with other devices.

You should always check the datasheet of your sensor before using it. Generally, sensors have a PIN that you need to pull up or down to select the I2C address.
    
