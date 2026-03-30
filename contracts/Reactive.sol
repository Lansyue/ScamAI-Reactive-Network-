// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interfaces/IReactive.sol";

contract Reactive is IReactive {
    address public owner;
    uint256 public sourceChainId;
    uint256 public destinationChainId;
    address public origin;
    address public destination;
    uint64 public callbackGasLimit;

    bytes32 public constant AI_RESULT_SUBMITTED_TOPIC =
        keccak256("AIResultSubmitted(bytes32,address,bool,bytes32,string)");

    event ReactiveCallbackExecuted(
        bytes32 indexed challengeId,
        address indexed player,
        bool success,
        address origin,
        address destination
    );
    event RouteUpdated(
        uint256 indexed sourceChainId,
        uint256 indexed destinationChainId,
        address indexed origin,
        address destination
    );
    event CallbackGasLimitUpdated(uint64 gasLimit);

    modifier onlyOwner() {
        require(msg.sender == owner, "Reactive: not owner");
        _;
    }

    constructor(
        uint256 sourceChainId_,
        uint256 destinationChainId_,
        address originContract,
        address destinationContract
    ) {
        owner = msg.sender;
        sourceChainId = sourceChainId_;
        destinationChainId = destinationChainId_;
        origin = originContract;
        destination = destinationContract;
        callbackGasLimit = 1_000_000;
    }

    function setRoute(
        uint256 nextSourceChainId,
        uint256 nextDestinationChainId,
        address nextOrigin,
        address nextDestination
    ) external onlyOwner {
        sourceChainId = nextSourceChainId;
        destinationChainId = nextDestinationChainId;
        origin = nextOrigin;
        destination = nextDestination;
        emit RouteUpdated(nextSourceChainId, nextDestinationChainId, nextOrigin, nextDestination);
    }

    function setCallbackGasLimit(uint64 nextGasLimit) external onlyOwner {
        callbackGasLimit = nextGasLimit;
        emit CallbackGasLimitUpdated(nextGasLimit);
    }

    function react(LogRecord calldata log) external override {
        require(log.chainId == sourceChainId, "Reactive: invalid chain");
        require(log.emitter == origin, "Reactive: invalid origin");
        require(log.topic0 == AI_RESULT_SUBMITTED_TOPIC, "Reactive: invalid topic");

        bytes32 challengeId = log.topic1;
        address player = address(uint160(uint256(log.topic2)));
        (bool success, , ) = abi.decode(log.data, (bool, bytes32, string));

        bytes memory payload = abi.encodeWithSelector(
            bytes4(keccak256("handleReactiveCallback(address,bytes32,address,bool)")),
            address(this),
            challengeId,
            player,
            success
        );

        emit Callback(destinationChainId, destination, callbackGasLimit, payload);

        emit ReactiveCallbackExecuted(
            challengeId,
            player,
            success,
            origin,
            destination
        );
    }
}
