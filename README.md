# SplitOnChain
A web-dapp for splitting shared expenses with friends or anyone with a wallet!

## Project Description
We built this project after realising how much we have trouble keeping track of how much we owe our friends and how much we're owed, especially when we live with flatmates or go on trips as a group! Through SplitOnChain, we bring the functionalities of organising shared expenses, keeping track of balances, reminding a friend to pay, and to pay them back straight to their wallet in crypto, across multiple groups of a user.

## How it's Made
The project uses Polybase for storing most of the User and Group Related data off-chain. User's expenses and other metadata is also stored off-chain. The aim was to build a sufficiently decentralised application and stay aligned with the theme, i.e. Scaling Ethereum. The dapp also Uses Push Protocol to send push notifications for payments and other details. The final settlement and payment transfers are done on-chain via crypto. We make note of all the changes in the balances of the members of the group, and once the participants choose to finally pay-back or settle up, the transfers are made. This takes a lot of load off the chain and brings making shared expenses in the web3 world a breeze. This is an MVP and the first version of our product, we hope you like it.

scroll smart contract - https://blockscout.scroll.io/address/0x85191bb59d6E905c8Cea2fe38a1E1dA72e77303a

### Tech Stack - Hardhat, NextJs, PolyBase, Scroll, Push Protocol

## Setup Instruction

clone repo

To setup blockchain

- cd into hardhat
- yarn  - to install dependecies 
- npx hardhat node - (leave this terminal open)
- npx hardhat run scripts/deploy.js --network localhost

To Run frontend

- cd into webapp
- yarn  - to install dependecies 
- yarn run dev
