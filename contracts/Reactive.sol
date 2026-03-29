// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interfaces/IDestination.sol";
import "./interfaces/IOrigin.sol";

contract Reactive {
    address public owner;
    address public origin;
    address public destination;

    event ReactiveCallbackExecuted(
        bytes32 indexed challengeId,
        address indexed player,
        bool success,
        address origin,
        address destination
    );
    event RouteUpdated(address indexed origin, address indexed destination);

    modifier onlyOwner() {
        require(msg.sender == owner, "Reactive: not owner");
        _;
    }

    constructor(address originContract, address destinationContract) {
        owner = msg.sender;
        origin = originContract;
        destination = destinationContract;
    }

    function setRoute(address nextOrigin, address nextDestination) external onlyOwner {
        origin = nextOrigin;
        destination = nextDestination;
        emit RouteUpdated(nextOrigin, nextDestination);
    }

    function react(
        address originContract,
        address destinationContract,
        bytes calldata data
    ) external {
        require(originContract == origin, "Reactive: invalid origin");
        require(destinationContract == destination, "Reactive: invalid destination");

        (bytes32 challengeId, address player, bool success) = abi.decode(
            data,
            (bytes32, address, bool)
        );

        require(IOrigin(originContract).canSettle(challengeId), "Reactive: delay not met");
        require(IOrigin(originContract).getChallengePlayer(challengeId) == player, "Reactive: player mismatch");

        IDestination(destinationContract).handleReactiveCallback(challengeId, player, success);

        emit ReactiveCallbackExecuted(
            challengeId,
            player,
            success,
            originContract,
            destinationContract
        );
    }
}
