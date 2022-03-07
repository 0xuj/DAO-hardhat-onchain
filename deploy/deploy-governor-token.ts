import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { ethers } from "ethers";

const deployGovernance: DeployFunction = async ( hre: HardhatRuntimeEnvironment) => {
    const {getNamedAccounts,deployments,network} = hre;
    const {deploy,log} = deployments;
    const {deployer} = await getNamedAccounts();
    log("Deploying Governance Token");
    const governanceToken = await deploy("GovernanceToken",{
        from: deployer,
        args: [],
        log: true,
    })
    log(`Deployed governance token to address ${governanceToken.address}`);
}

const delegate = async(governanceTokenAddress: string,delegatedAccounts: string) => {
    const governanceToken = await ethers.getContractAt("GovernanceToken",governanceTokenAddress);
    const tx = await governanceToken.delegate(delegatedAccounts);
    await tx.wait(1);
    console.log(`checkpoint ${await governanceToken.numCheckpoints(delegatedAccounts)}`)
}

export default deployGovernance;