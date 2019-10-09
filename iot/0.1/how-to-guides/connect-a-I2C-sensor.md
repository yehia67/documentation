# Connect an I2C sensor to an nRF5 series microcontroller

**In this guide, we connect an I2C sensor to an nRF52 microcontroller**

## Prerequisites

To complete this guide, you need the following:

- nRF5 series microcontroller
- I2C sensor development board

### I2C

I2C is a serial bus, which means that the bits are sent sequentially over the wire. 
The I2C bus consists of the following wires:
* **SCL** for the clock
* **SDA** for transferring data

I2C uses Master-Slave communication. With 7-Bit addressing, 127 addresses are available.
The I2C bus reserves some addresses for the protocol, so that you end up with 112 addresses for your sensors.

I2C also has a 10-bit address space, so that you end up with 1008 addresses for your devices.

Most sensors use the 7-bit address space, so we recommend to stick to 7-Bit in order to support most sensors.
If you use a sensor more than once on a master, you should connect each sensor on a different I2C bus in order to avoid address conflicts.

The I2C protocol does not have any mechanism to resolve address conflicts.
If your device does not have enough I2C buses, you can use an I2C switch in order to use your sensors.

### I2C address selection

Most I2C integrated circuits provide an address selection to avoid address conflicts with others.
You should always check the datasheet of your sensor before using it.
Generally it mentions a PIN you have to pull up or down to select the I2C address.

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
    
