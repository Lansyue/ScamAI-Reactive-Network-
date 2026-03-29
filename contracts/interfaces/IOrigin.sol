// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IOrigin {
    function canSettle(bytes32 id) external view returns (bool);
    function getChallengePlayer(bytes32 id) external view returns (address);
}
