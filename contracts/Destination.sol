// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Destination {
    address public owner;
    address public callbackProxy;
    address public reactiveSender;
    uint256 public immutable rewardAmount;

    mapping(bytes32 => bool) public settled;

    event RewardClaimed(bytes32 indexed challengeId, address indexed player, uint256 amount);
    event PrizePoolIncreased(bytes32 indexed challengeId, uint256 currentBalance);
    event CallbackProxyUpdated(address indexed callbackProxy);
    event ReactiveSenderUpdated(address indexed reactiveSender);
    event PrizePoolFunded(address indexed from, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Destination: not owner");
        _;
    }

    modifier onlyCallbackProxy() {
        require(msg.sender == callbackProxy, "Destination: not callback proxy");
        _;
    }

    constructor(
        address initialCallbackProxy,
        address initialReactiveSender,
        uint256 fixedRewardAmount
    ) payable {
        owner = msg.sender;
        callbackProxy = initialCallbackProxy;
        reactiveSender = initialReactiveSender;
        rewardAmount = fixedRewardAmount;
    }

    function setCallbackProxy(address nextCallbackProxy) external onlyOwner {
        callbackProxy = nextCallbackProxy;
        emit CallbackProxyUpdated(nextCallbackProxy);
    }

    function setReactiveSender(address nextReactiveSender) external onlyOwner {
        reactiveSender = nextReactiveSender;
        emit ReactiveSenderUpdated(nextReactiveSender);
    }

    function fundPrizePool() external payable {
        emit PrizePoolFunded(msg.sender, msg.value);
    }

    function handleReactiveCallback(
        address reactiveContract,
        bytes32 challengeId,
        address player,
        bool success
    ) external onlyCallbackProxy {
        require(reactiveContract == reactiveSender, "Destination: invalid reactive sender");
        require(!settled[challengeId], "Destination: already settled");
        settled[challengeId] = true;

        if (success) {
            require(address(this).balance >= rewardAmount, "Destination: insufficient prize pool");
            (bool sent, ) = payable(player).call{value: rewardAmount}("");
            require(sent, "Destination: reward transfer failed");
            emit RewardClaimed(challengeId, player, rewardAmount);
        } else {
            emit PrizePoolIncreased(challengeId, address(this).balance);
        }
    }
}
