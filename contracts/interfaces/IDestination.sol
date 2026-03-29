// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IDestination {
    function handleReactiveCallback(
        address reactiveSender,
        bytes32 challengeId,
        address player,
        bool success
    ) external;
}
