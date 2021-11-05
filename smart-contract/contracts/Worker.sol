//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Worker {
    
    address internal workerAddress;

    modifier onlyWorker() {
        require(msg.sender == workerAddress, "call only with worker account!");
        _;
    }

    function ping() external view onlyWorker returns (string memory) {
        return "hello, worker";
    }

    function setWorkerAddress(address newAddress) external {
        workerAddress = newAddress;
    }

}
