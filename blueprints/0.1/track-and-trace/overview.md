# Track and trace

**This blueprint describes how a track and trace system for recovery of returnable assets has been implemented by the IBCS Group, using the IOTA Tangle and other IOTA technologies.**

![Track and Trace](../intro_track_trace.png)

## Use case 

 Integration of this system within IBCS Group’s business processes is presented in order to provide a guide for other organizations willing to replicate and adapt the produced software to scenarios and business processes similar to the ones presented.

A returnable asset	is an asset (e.g. a container or in this blueprint a glass rack) used in the distribution and logistic chain for the handling and delivery of other valuable assets (e.g. glasses).

In the case of the glass manufacturing industry, a returnable asset is used to ship glasses from a glass producer (owner of the asset) to a distributor. Instead of returning the returnable asset to the glass producers, the glass distributors might use them to further ship glasses to a window manufacturer. The window manufacturers might use the returnable asset to deliver windows to the final end customer, either directly or through a different reseller. 

The table below summarizes the different stakeholders and roles considered in our use case.

| Stakeholder       | Role |
|:---------------|:--------|
| Glass Producers | Deliver glasses either to distributors (directly) or to Window Manufacturers (through Logistic Provider). Own the returnable assets. |
| Window Manufacturers | Deliver windows to windows resellers either directly or through logistic providers. Might own their own returnable assets and use for the delivery. Or they might also re-use returnable assets received from glass producers.  |
| Distributors   | Receive glasses or windows delivered directly or through logistic providers together with returnable assets used for the delivery. Re-use the returnable assets to deliver glasses or windows further down to the distribution chain.  | 
| Windows Resellers   | Receive windows from distributors and use received returnable assets to arrange their delivery to end-customers. | 
| End-customers    | Receive windows directly from windows resellers or through logistic providers which use glass producers and windows manufacturers returnable assets. Often dispose returnable assets or do not know to whom and how to return.  | 
| Logistic Providers   | Move assets and returnable assets along the distribution chain.  | 

The table shows how complex it is to keep track of all the relations involved into the handling of returnable assets. 

The following graphic presents a simplified stakeholders map, highlighting returnable asset owners, the different chains of custody and how returnable assets move along the chain (dotted arrows) and those stakeholders (namely custodians, green circles) eventually responsible of returning the assets to their owners (purple circles). 

![Returnable assets stakeholder map](../track-and-trace-returnable-assets-stakeholders.png)

The image also shows the different actions they should perform when in contact with a given returnable asset.

Due to the lack of due diligence and complexity of this process, returnable assets are used within distribution networks and are seldom returned to their original owners. 

Similar returnable assets and problems can be seen in other industries and value chains, such as  the international flowers industry that also uses a variety of re-usable stands and pots. A solution to problem in the glass industry can be easily adapted to those markets and stakeholders too. 

Therefore, there is the need for the returnable asset owners to track and trace their assets and to claim them back when these are considered missing. As various producers are circulating similar identical  assets with their stakeholders, the problem is spread across the whole industry.  

This requires a tracking system that allows for the collection of this information across a complex ecosystem of stakeholders. However, it is not possible to report custody-of-assets using a centralized database for the whole ecosystem as this will also reveal, to third parties, proprietary knowledge about different stakeholders, customers, and distribution chains. Moreover, it will be difficult to create a system able to centrally track all the possible interactions envisioned for a number of stakeholders not known apriori. The use of a distributed ledger provides a solution to these issues. In particular, using IOTA as a tracking layer ensures that only rightful owners will receive information of owned assets without any unauthorised party being able to gather or access any central recording of the full ecosystem.  

Thanks to the permissionless nature of IOTA, no trust is required for who runs the infrastructure as this is spread across those independently running IOTA nodes. 

In addition to that, no former knowledge of all parties willing to write information into the ledger is required, thus simplifying the creation of a track and trace system that can be used by all the different stakeholders and industry sectors as needed and with minimum integration and onboarding time.

The solution we describe in this blueprint allows for the following:

- The owner of a returnable asset acquires the asset identity through a mobile app and an existing barcode or QR-code and creates a digital representation of her asset. The digital version of the asset (its digital twin	) is 
recorded in an immutable way on the IOTA Tangle together with the identity of its owner;

- Once, as part of its use within the distribution channels, the given returnable asset is handed over to a different custodian, the new custodian uses the same or a similar app to retrieve from the IOTA Tangle the asset digital twin and to attach to it its identity as well as its location (if available). Information is again recorded onto the Tangle in order to further trace asset use;

- Change of custody is tracked as long as the asset and its custody is not returned to its owner or the asset is declared missing by its owner. In this last case, the asset owner can track the last asset custodian by retrieving it from the Tangle.  

## Business case 

Misplace of returnable assets represents an economic loss for the asset owners. This also affects ability to fulfil producers next deliveries and is a waste of time and resources when owners try to recover their missing returnable assets.  

Traditional track and trace of returnable assets has been so far unsuccessful for the following reasons: 

- Economic value of returnable assets is not perceived by their custodians but only by their owners; instead returnable assets are more likely to be seen by their custodians as disposable assets; 
- There is currently neither incentive for different custodians to help tracking returnable assets nor perceived responsibility in not doing that; 
- Tracking returnable assets requires access to information stored in a number of proprietary systems belonging to the different custodians, for which the complexity to predict, map and integrate them exceed the perceived benefits. 

The use of IOTA, a permissionless distributed ledger technology, provides a solution to seamlessly collect and share information about returnable assets, despite all of the involved custodians and without need to integrate any proprietary system. While doing that, IOTA can still guarantee access control of the collected information. The permissionless nature of IOTA Tangle, and the use of the 2nd layer MAM  protocol, fulfill these needs.  

While this already solves the track and trace problem, in future scenarios the use of IOTA Token (and Qubic smart contracts2) could allow to create incentive to reward custodians participation to the track and trace activities, despite the country and the currency in which the assets are handled. 

As a result, the following benefits are envisioned: 

- Owners can track and request return of their returnable assets, thus saving money resulting from the need to buy new assets needed to fulfill their delivery needs. They can also save the time and the costs associated to searching for missing ones; 

- Asset owners can better predict and plan shipments of their production by knowing exactly the number and location of returnable assets available to them;  

- Custodians can easily track the returnable assets they handle, get rewarded and increase their reputation towards returnable assets owners, while saving costs associated to support owners’ requests when assets are declared missing. 
A scenario similar to the one described above is the one of the international container shipment, for which a solution similar to the one presented could be implemented and replicated.

You can now continue to [Architecture](architecture.md).

## List of Abbreviations 
 
- IF - IOTA Foundation
- HW - Hardware
- SW - Software
- JS - Javascript
- IRI - IOTA Reference Implementation, the SW written in JAVA that allows users to become part of the [IOTA](root://iri/0.1/introduction/overview.md) network as both a transaction relay and network information provider through the easy-to-use [API](root://iri/0.1/references/api-reference.md).
- DBMS - Database management systems
- MAM -	Masked Authenticated Messaging 	a second layer data communication protocol which adds functionality to publish and control access to an encrypted data stream, over the Tangle 
 	 	 
Additional Resources 
- [IRI Repository](https://github.com/iotaledger/iri )
- [MAM eloquently explained](https://blog.iota.org/introducing-masked-authenticated-messaging-e55c1822d50e) 
- [MAM Source code Repository](https://github.com/iotaledger/mam.client.js) 
- [iota.js Repository](https://github.com/iotaledger/iota.js)
