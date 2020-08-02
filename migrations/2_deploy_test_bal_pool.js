const Balpool = artifacts.require('./BPoolTokenWrapper.sol');

module.exports = function (deployer) {
    deployer.deploy(Balpool, 0xe3818504c1b32bf1557b16c238b2e01fd3149c17, 0x72Cd8f4504941Bf8c5a21d1Fd83A96499FD71d2C);
};