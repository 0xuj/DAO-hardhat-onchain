import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/dist/types";

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

export default deployGovernance;