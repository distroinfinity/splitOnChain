// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

// Uncomment this line to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Split {
    using Counters for Counters.Counter;
    Counters.Counter private groupId;
    uint public unlockTime;
    address payable public owner;
    mapping(address => uint256[]) addressToGroup;
    mapping(uint256 => Group) idToGroup;

    struct Group {
        uint256 id;
        address[] members;
        address owner;
    }

    event Withdrawal(uint amount, uint when);

    constructor() payable {
        owner = payable(msg.sender);
    }

    function createGroup() public {
        uint256 tid = groupId.current();
        groupId.increment();
        Group memory tempGroup;
        tempGroup.id = tid;
        tempGroup.owner = msg.sender;
        idToGroup[tid] = tempGroup;
        addressToGroup[msg.sender].push(tid);
    }

    // to do add a check that onl members of group can add memberes to it
    function addMember(address newMember, uint256 id) public {
        idToGroup[id].members.push(newMember);
    }

    // to do remove member

    //getter setter
    function fetchMyGroups() public view returns (Group[] memory) {
        Group[] memory myGroup = new Group[](addressToGroup[msg.sender].length);
        for (uint256 i = 0; i < addressToGroup[msg.sender].length; i++) {
            myGroup[i] = idToGroup[addressToGroup[msg.sender][i]];
        }
        return myGroup;
    }
}
