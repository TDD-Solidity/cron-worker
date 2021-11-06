import { expect } from "chai";
import { ethers } from "hardhat";

describe("Worker", function () {

    describe('onlyWorker modifier', () => {

        const PING_RESPONSE = 'hello, worker';

        const WORKER_REVERT_MESSAGE = 'call only with worker account!';

        it("functions with workerOnly modifier can only be called by the worker address", async function () {
            
            const [ownerAddress, workerAddress, userAddress] = await ethers.getSigners();
            
            const Worker = await ethers.getContractFactory("Worker");
            const workerContract = await Worker.deploy();
            await workerContract.deployed();
            
            await workerContract.connect(ownerAddress).setWorkerAddress(workerAddress.address);

            const pingResultAsWorker = await workerContract.connect(workerAddress).ping();
            expect(pingResultAsWorker).to.equal(PING_RESPONSE);
            
            await expect(workerContract.connect(userAddress).ping()).to.be.revertedWith(WORKER_REVERT_MESSAGE);
            await expect(workerContract.connect(ownerAddress).ping()).to.be.revertedWith(WORKER_REVERT_MESSAGE);

        });

    });
        
});
