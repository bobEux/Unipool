pragma solidity ^0.5.0;

import "../../contracts/Balpool.sol";


contract BalpoolMock is Balpool {

    constructor(address uniToken, address snxToken) Balpool(snxToken, uniToken) public {
    }
}