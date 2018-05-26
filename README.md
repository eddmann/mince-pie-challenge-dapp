# Mince Pie Challenge Dapp

[![Build Status](https://travis-ci.org/eddmann/mince-pie-challenge-dapp.svg?branch=master)](https://travis-ci.org/eddmann/mince-pie-challenge-dapp)

This project demonstrates the use of:

* [Truffle](http://truffleframework.com/) to manage, test and deploy the Ethereum [Solidity](http://solidity.readthedocs.io/) contract.
* [IPFS](https://ipfs.io/) to store the image uploads in a decentralised manor.
* The client is managed with [create-react-app](https://github.com/facebook/create-react-app) and uses [Semantic UI](https://react.semantic-ui.com/) for component styling.
* [web3.js](https://github.com/ethereum/web3.js/) to interact with the deployed contract within the client browser application.
* [Docker](https://www.docker.org/) to manage the local development of both the contract (using [Ganache](http://truffleframework.com/ganache/) as the personal blockchain) and client.

## Usage

You are able to easily interact with the Docker containers using the provided `Makefile`.

```bash
$ make contract-start
$ make ipfs-start
$ make client-start
```
