# Best practices for running a node

**When you run a node, you have lots of different options for setting up a reliable architecture. This article gives you some advice that we often give to our partners.**

To increase the chances of your application connecting to a synchronized and reliable node, it's often best practice to run more than one.

To host these nodes it's best to make sure that the host device has enough computational power to run reliably. For example, a good benchmark is to run each node on an instance of a virtual private server such as an [Amazon Web Services (AWS) R5 Large server](https://aws.amazon.com/ec2/instance-types/r5/) with 16 GB RAM and two virtual CPUs.

:::info:
Read our guide on [running a node on Linux](../how-to-guides/run-an-iri-node-on-linux.md), or on [running a node in a Docker container](../how-to-guides/run-an-iri-node-in-docker.md).
:::

For a client application that will communicate with your nodes through API endpoints, it's best to use one of the IOTA client libraries on an instance of a serverless architecture such as [AWS Lambda](https://aws.amazon.com/lambda/). This way, your application is not restricted by hardware and has a high availability.

:::info:
[Get started with the IOTA client libraries](root://getting-started/0.1/tutorials/get-started.md).
:::

When you have a client application and some nodes, make sure that the client's API calls are distributed evenly among all nodes so that no single one is overloaded.

To distribute the API calls among all your nodes, it's best practice to run a reverse proxy server that will act as a load balancer.

This way, you can have one domain name for your reverse proxy server that all nodes will send their API calls to. But, on the backend, the nodes with the most spare computational power will process the request and return the response to the reverse proxy server.

:::info:
Read our guide on [setting up a reverse proxy server](../how-to-guides/set-up-a-reverse-proxy.md) for your node.
:::