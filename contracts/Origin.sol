// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Origin {
    enum Status {
        PENDING,
        AI_SUBMITTED,
        COMPLETED
    }

    struct Challenge {
        address player;
        string prompt;
        bytes32 promptHash;
        bytes32 aiResponseHash;
        string aiResponse;
        bool success;
        uint256 timestamp;
        Status status;
    }

    uint256 public constant ticketPrice = 0.001 ether;
    uint256 public constant delayWindow = 10 minutes;
    uint256 public constant rewardAmount = 0.005 ether;

    address public owner;
    address public relayer;

    mapping(bytes32 => Challenge) public challenges;

    event ChallengeSubmitted(bytes32 indexed id, address indexed player, string prompt);
    event AIResultSubmitted(
        bytes32 indexed id,
        address indexed player,
        bool success,
        bytes32 aiResponseHash,
        string aiResponse
    );
    event ChallengeCompleted(bytes32 indexed id, address indexed player, bool success);
    event RelayerUpdated(address indexed relayer);

    modifier onlyOwner() {
        require(msg.sender == owner, "Origin: not owner");
        _;
    }

    modifier onlyRelayer() {
        require(msg.sender == relayer, "Origin: not relayer");
        _;
    }

    constructor(address initialRelayer) {
        owner = msg.sender;
        relayer = initialRelayer;
    }

    function submitChallenge(string calldata prompt) external payable returns (bytes32 id) {
        require(msg.value == ticketPrice, "Origin: wrong ticket price");
        require(bytes(prompt).length > 0, "Origin: empty prompt");

        id = keccak256(abi.encodePacked(msg.sender, prompt, block.timestamp, block.number));
        Challenge storage challenge = challenges[id];
        require(challenge.timestamp == 0, "Origin: challenge exists");

        challenge.player = msg.sender;
        challenge.prompt = prompt;
        challenge.promptHash = keccak256(bytes(prompt));
        challenge.timestamp = block.timestamp;
        challenge.status = Status.PENDING;

        emit ChallengeSubmitted(id, msg.sender, prompt);
    }

    function submitAIResult(
        bytes32 id,
        bool success,
        bytes32 aiHash,
        string calldata aiResponse
    ) external onlyRelayer {
        Challenge storage challenge = challenges[id];
        require(challenge.timestamp != 0, "Origin: missing challenge");
        require(challenge.status == Status.PENDING, "Origin: bad status");

        challenge.aiResponseHash = aiHash;
        challenge.aiResponse = aiResponse;
        challenge.success = success;
        challenge.status = Status.AI_SUBMITTED;

        emit AIResultSubmitted(id, challenge.player, success, aiHash, aiResponse);
    }

    function markCompleted(bytes32 id) external onlyRelayer {
        Challenge storage challenge = challenges[id];
        require(challenge.status == Status.AI_SUBMITTED, "Origin: not ready");
        challenge.status = Status.COMPLETED;
        emit ChallengeCompleted(id, challenge.player, challenge.success);
    }

    function canSettle(bytes32 id) external view returns (bool) {
        Challenge storage challenge = challenges[id];
        if (challenge.status != Status.AI_SUBMITTED) {
            return false;
        }
        return block.timestamp >= challenge.timestamp + delayWindow;
    }

    function getChallengePlayer(bytes32 id) external view returns (address) {
        return challenges[id].player;
    }

    function setRelayer(address nextRelayer) external onlyOwner {
        relayer = nextRelayer;
        emit RelayerUpdated(nextRelayer);
    }

    function withdraw(address payable to, uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Origin: insufficient balance");
        to.transfer(amount);
    }
}
