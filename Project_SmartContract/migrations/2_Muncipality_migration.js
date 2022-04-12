const Muncipality = artifacts.require("Muncipality");

module.exports = function(deployer) {
  deployer.deploy(Muncipality);
};