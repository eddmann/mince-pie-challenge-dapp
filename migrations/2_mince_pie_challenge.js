const MincePieChallenge = artifacts.require('./MincePieChallenge.sol');

module.exports = function(deployer) {
  deployer.deploy(MincePieChallenge);
};
