# Distributed App

This repository houses the source code to a simple distributed app that can be deployed across multiple VMs. Mediator Wrapper Systems are a practical solution to multidatabase systems, where we integrate multiple heterogenous databases into a single system, thus utilizing the advantages of each of them.

## Architecture

This app follows the mediator-wrapper architecture **(MWA)**. The architecture is as follows:

- Mediator is the face of the server, with which client interacts requesting some data. The mediator in-turn sends the clients' request to wrappers.
- Wrappers are the face of the system towards the database, where wrappers interact with the database, fetch results of query and send them back to mediator.
- Since, there are heterogenous databases, the system needs a single language that each wrapper and mediator understands, so that they can communicate flawlessly, this language is called **Common Data Model (CDM)**.
- The wrappers must know both CDM and local db language, since they are the ones who have to translate from one language to another and co-operate.

## Folder Structure

- The mediator folder contains the node project source code that corresponds to mediator.
- The wrapper-x (a or b) contains the source code to wrapper node project.
- More details on each of them can be found in `/docs/mediator-code-structure.md` and `/docs/wrapper-a-code-structure.md`.

## Pre-requisite libraries and frameworks

The following libraries and frameworks are expected to be installed before running and testing this app:

- Node (>=18.0.x)
- MySQL
- Git

## How to run

- First, clone this repository into the VM.
- Then, move to the folder corresponding to the vm and run `npm install`.
- Create env file in the corresponding folder and fill it as per the env.example file shared in each folder.
- To run, remain in the root vm repo. For example, if the VM corresponds to `mediator`, remain to the `mediator` folder.
- Then, run node src/app.js to start the application.

## How to test

Testing can be done via any method, similar to testing any API Endpoint.
