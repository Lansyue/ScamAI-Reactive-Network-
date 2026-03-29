export const originAbi = [
  {
    type: "function",
    name: "submitChallenge",
    stateMutability: "payable",
    inputs: [{ name: "_prompt", type: "string" }],
    outputs: [{ name: "", type: "bytes32" }]
  },
  {
    type: "function",
    name: "canSettle",
    stateMutability: "view",
    inputs: [{ name: "_id", type: "bytes32" }],
    outputs: [{ name: "", type: "bool" }]
  },
  {
    type: "event",
    name: "ChallengeSubmitted",
    inputs: [
      { indexed: true, name: "id", type: "bytes32" },
      { indexed: true, name: "player", type: "address" },
      { indexed: false, name: "prompt", type: "string" }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "AIResultSubmitted",
    inputs: [
      { indexed: true, name: "id", type: "bytes32" },
      { indexed: true, name: "player", type: "address" },
      { indexed: false, name: "success", type: "bool" },
      { indexed: false, name: "aiResponse", type: "string" },
      { indexed: false, name: "aiHash", type: "bytes32" }
    ],
    anonymous: false
  }
] as const;
