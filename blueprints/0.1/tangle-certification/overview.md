# Tangle certification overview

**Certificates can be copied or changed, affecting their authenticity and credibility. This blueprint describes how to prevent counterfeit certificates by storing them on the IOTA Tangle, and allowing them to be verified by third parties.**

![Tangle certification](../images/track-and-trace-thumbnail.png)

## Business case

A certificate is an official document that proves a fact about the bearer. For example, governments issue birth certificates to give children an official name and nationality.

At the moment, it's easy for fraudsters to create counterfeit certificates, which affect the authenticity and credibility of valid ones.

Therefore, to put trust back into certificates, third parties need to be able to verify that a certificate is authentic.

The table below summarizes the different stakeholders and roles considered in this example business case.

| **Stakeholder**       | **Role** |
|:---------------|:--------|
| **Issuers** | An entity that registers itself with the cerification system to be able to create certificates  |
| **Third Parties**   | An entity that uses the certification system to verify the authenticity of a certificate |

### Challenges

Certificates must always be available, immutable, and authentic so that they can be viewed and validated at any time.

### Solution

In this blueprint, we define a certification system, which provides an API for creating and verifying certificates on the Tangle.

To permanently store the certificates on the Tangle, this blueprint uses the IOTA Foundation's permanode solution called Chronicle.

Using public/private key encryption these certificates are signed, guaranteeing their authenticity.

This solution leads to the following benefits: 

- Immutability
- Trusted/decentralized verification
- Feeless management infrastructure

## Demo

Neither a demonstration of this application nor deployment instructions are  available at the moment.

However, the IOTA Foundation
 	 	 
## Additional resources

---------------
#### iota.js client library ####
[Link](root://client-libraries/0.1/getting-started/js-quickstart.md)

Learn how to use the iota.js client library to create, send, and receive transactions.
---
#### MAM eloquently explained ####
[Link](https://blog.iota.org/introducing-masked-authenticated-messaging-e55c1822d50e)

Masked Authenticated Messaging is a second layer data communication protocol that adds functionality to publish and control access to an encrypted data stream, over the Tangle. Learn more about how MAM works.
---
#### MAM GitHub repository ####
[Link](https://github.com/iotaledger/mam.client.js)

Read the code and some quickstart instructions to test MAM with JavaScript.
---------------
