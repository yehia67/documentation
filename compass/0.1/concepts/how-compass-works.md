# How Compass works

Compass has three main phases:
* Merkle tree generation
* Setup
* Start

## Merkle tree generation

Before Compass can start creating milestones, it generates a [Merkle tree](https://en.wikipedia.org/wiki/Merkle_tree). This Merkle tree makes sure that every milestone directly or indirectly references the fixed address of Compass. This address is known by every IRI node in the IOTA network.

As a result of the Merkle tree, milestones are valid only if they are generated with the seed of Compass because IRI nodes can verify the Merkle root (fixed address) of any given leaf (milestone).

The amount of milestones Compass can send is based on the following formula: 2<sup>depth</sup>.
So, a depth of 16 is 2<sup>16</sup>, resulting in a maximum of 65536 milestones. If Compass sends milestones every minute, it can run 2<sup>depth</sup> minutes before it runs out of milestones. As a result, the depth needs to be high enough for your test to complete.

The higher the depth, the longer the Merkle tree generation takes.

A depth of 24 would allow Compass to send milestones for over 31 years, but it would take a lot of CPU hours to generate that Merkle tree. If you don't want to wait 15-30 minutes to generate the Merkle tree, you can choose a depth of 8, which would only take a couple of seconds to generate, but Compass could send milestones only for a couple of hours.

## The setup phase
During the setup phase, Compass asks the IRI node that it's connected to for the latest milestone. If the `-bootstrap` flag is passed during setup, Compass checks if a milestone exists on the IRI Node.

Then, Compass receives the latest milestone index from the IRI node and stores it. If no latest milestone exists, Compass uses the index from the configuration file.

## The start phase
During the start phase, Compass enters an indefinite `while` loop and begins to send milestones.

If the `bootstrap` flag was passed during setup, Compass creates a chain of milestones, referencing the previous milestones, to bootstrap the beginning of the network. Then, Compass exits bootstrap mode after 4 milestones. 

Compass starts sending milestones by doing the following:
* Ask the IRI node for transactions to approve
* Ask the IRI node to broadcast the milestone

Compass sleeps until the next tick.