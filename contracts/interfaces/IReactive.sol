// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

struct LogRecord {
    uint256 chainId;
    address emitter;
    bytes32 topic0;
    bytes32 topic1;
    bytes32 topic2;
    bytes32 topic3;
    bytes data;
    uint256 blockNumber;
    bytes32 txHash;
    uint256 logIndex;
}

interface IReactive {
    event Callback(address indexed destination, uint256 indexed gasLimit, bytes payload);

    function react(LogRecord calldata log) external;
}
