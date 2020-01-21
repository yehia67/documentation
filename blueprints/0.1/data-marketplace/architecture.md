# Application architecture

**The Data Marketplace application uses sensors, a cloud backend, and the IOTA Tangle to publish data to MAM channels.**

:::warning:Disclaimer
Running an open source project, like any human endeavor, involves uncertainty and trade-offs. We hope the architecture described below helps you to deploy similar systems, but it may include mistakes, and can’t address every situation. If you have any questions about your project, we encourage you to do your own research, seek out experts, and discuss them with the IOTA community.
:::

This blueprint uses the following architecture whereby the devices such as sensors and the cloud backend are interconnected through the Tangle.

![Data Marketplace architecture](../images/data-marketplace-architecture.png)

## Building blocks

Submitting sensor data to the Data Marketplace is intended to be a lightweight operation that can be done by embedded devices. To submit sensor data, a device needs to perform Tangle operations, such as producing and consuming MAM channels, and communicating with web APIs. The data consuming part of the application is more complex and needs the ability to transfer IOTA tokens in exchange for access to the device's data streams. Therefore, an access-rights management add-on is implemented.

This table displays a list of the main components of the application:

### Cloud backend

The cloud part of the application is centralized. It runs on Google Cloud Platform, and can optionally run on Amazon AWS or Microsoft Azure.

This backend has an [API]https://data.iota.org/static/docs) that allows you to manage devices and monitor the MAM channels to which devices send their data.

#### Cloud functions

The API triggers cloud functions, which allow you to configure the following:

- [`depth`](root://getting-started/0.1/transactions/depth.md)
- [`minWeightMagnitude`](root://getting-started/0.1/network/minimum-weight-magnitude.md)
- Whitelist page, where administrator users with predefined email addresses are allowed to administer devices

### Sensor MAM channel

The device in the Data Marketplace are usually sensors that publish their data to the Tangle through MAM channels.

#### Data fields

For each of your sensors, you have to define the correct data fields, which will be stored on the Tangle, and displayed on the Data Marketplace web portal for the purchaser. In general, just be descriptive with the data that you want to store and sell.
 
#### Example sensors

- [Netatmo Weather Station](https://www.netatmo.com/en-us/weather)
- [Bosch XDK](https://xdk.bosch-connectivity.com/) 
- [Nordic Semiconductor Thingy:52](https://www.nordicsemi.com/Software-and-Tools/Development-Tools/Nordic-Thingy-52-App)
- [Raspberry Pi with a sensor kit](https://www.adafruit.com/product/2733) 


