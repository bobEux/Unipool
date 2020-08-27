const Balpool = artifacts.require('./Balpool.sol');

module.exports = function (deployer) {
    deployer.deploy(Balpool, '0xe3818504c1b32bf1557b16c238b2e01fd3149c17', '0x025d34acFD5c65cfd5A73209f99608c9E13338F3');
};
