// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.8;
pragma experimental ABIEncoderV2;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.3.2/contracts/access/Ownable.sol";

contract SprayerPayer is Ownable {
    
    address workerAddress;
    
    mapping(uint256 => bool) isSpraying;
    
    // handle the rest on server!
    function createFire() public payable returns (string memory) {
        return "creating fire on server...";
    }
    
    // all handled on server!
    
    // function startSpraying(uint256 hydrantId, uint256 fireId) public {
        
    //     isSpraying[hydrantId] = true;
        
    // }
    
    // function stopSpraying() public {
        
    //     isSpraying[hydrantId] = true;
        
    // }
    
    //  function decrementEnergy() public onlyWorker {
        
    //     hydrantEnergies--;
        
    // }
    
    
    // Called by cron server "worker" account
    
    function setWorker(address _workerAddress) public onlyOwner {
        workerAddress = _workerAddress;
    }
    
    modifier onlyWorker() {
        require(msg.sender == workerAddress, "only the worker can call this function!");
        _;
    }
    
    function paySprayer(address recipient, uint256 amount) public onlyWorker {
        payable(recipient).transfer(amount);
    }
    
    fallback() external {
        revert('fallback');
    }
    
}