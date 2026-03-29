export const destinationAbi = [
  {
    type: "event",
    name: "RewardClaimed",
    inputs: [
      { indexed: true, name: "challengeId", type: "bytes32" },
      { indexed: true, name: "player", type: "address" },
      { indexed: false, name: "amount", type: "uint256" }
    ],
    anonymous: false
  }
] as const;
