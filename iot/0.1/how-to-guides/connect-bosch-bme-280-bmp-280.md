# Connect a Bosch BME/BMP 280 to your nRF52 microcontroller

**In this guide, we explain how to connect and use a Bosch BME/BMP 280 sensor board**

If you're using use the BME/BMP 280 sensor without the board, you need to do the following to select the I2C interface:
- [Pull up the SCL and SDA lines](https://electronics.stackexchange.com/a/1852/201179)
- [Connect the CSB (chip select) pin to the VDDIO pin](https://ae-bst.resource.bosch.com/media/_tech/media/datasheets/BST-BMP280-DS001.pdf)
 (see "5.1 Interface selection" for more information)
:::

**BME 280 I2C board**
![BME 280 I2C board](../images/BME280_board.png)

1. Solder the pin headers to the BME/BMP 280 board

2. [Connect the BME/BMP 280 sensor to your microcontroller](connect-a-I2C-sensor.md)

3. Connect the SDO pin to the VDDIO pin to give the BME/BMP 280 the [I2C device address 0x77.](https://ae-bst.resource.bosch.com/media/_tech/media/datasheets/BST-BMP280-DS001.pdf)(See "5.2 I²C Interface" for more information.)

    :::info:
    If you want to use the BMP 180 and BME/BMP 280 together on one I2C bus, 
    you should pull down the SDO pin to avoid I2C address conflicts.
    If you pull down the SDO pin, update the I2C address in the `bmx280_params.h` RIOT configuration file.
    :::

