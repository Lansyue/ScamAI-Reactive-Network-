// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Destination {
    address public owner;
    address public reactiveContract;
    uint256 public immutable rewardAmount;

    mapping(bytes32 => bool) public settled;

    event RewardClaimed(bytes32 indexed challengeId, address indexed player, uint256 amount);
    event PrizePoolIncreased(bytes32 indexed challengeId, uint256 currentBalance);
    event ReactiveContractUpdated(address indexed reactiveContract);
    event PrizePoolFunded(address indexed from, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Destination: not owner");
        _;
    }

    modifier onlyReactive() {
        require(msg.sender == reactiveContract, "Destination: not reactive");
        _;
    }

    constructor(address initialReactiveContract, uint256 fixedRewardAmount) payable {
        owner = msg.sender;
        reactiveContract = initialReactiveContract;
        rewardAmount = fixedRewardAmount;
    }

    function setReactiveContract(address nextReactiveContract) external onlyOwner {
        reactiveContract = nextReactiveContract;
        emit ReactiveContractUpdated(nextReactiveContract);
    }

    function fundPrizePool() external payable {
        emit PrizePoolFunded(msg.sender, msg.value);
    }

    function handleReactiveCallback(
        bytes32 challengeId,
        address player,
        bool success
    ) external onlyReactive {
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
