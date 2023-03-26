// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Split {
    address payable public owner;

    constructor() payable {
        owner = payable(msg.sender);
    }

    function transferEther(address payable recipient) public payable {
        recipient.transfer(msg.value);
    }
}
