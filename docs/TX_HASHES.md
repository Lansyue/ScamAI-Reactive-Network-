# ScamAI Transaction Hashes

This file must contain the real end-to-end transaction history used for final judging.

## Required Flow Per Round

1. User calls `Origin.submitChallenge`
2. Relayer calls `Origin.submitAIResult`
3. Reactive contract processes the event and triggers callback delivery
4. Destination contract receives the callback and settles the reward or failure path

## Explorer Bases

- Sepolia tx base: `https://sepolia.etherscan.io/tx/`
- Destination tx base: `https://sepolia.etherscan.io/tx/`
- Reactive tx base: `https://lasna.reactscan.net/tx/`

## Deployment And Setup

- Destination deployment tx: `0x04bee8e5c8c475fa257d3312c03490910506562e641b3e475f4ae6bc875531ba`
- Destination deployment link: `https://sepolia.etherscan.io/tx/0x04bee8e5c8c475fa257d3312c03490910506562e641b3e475f4ae6bc875531ba`
- Origin deployment tx: `0xfc46769f8fd6c663e3a969000b21e4066602ee5d85d0faa51df41dda67efc23b`
- Origin deployment link: `https://sepolia.etherscan.io/tx/0xfc46769f8fd6c663e3a969000b21e4066602ee5d85d0faa51df41dda67efc23b`
- Reactive deployment tx: `0x34f3983bf08e75777f04893929d10ae695c52dc4cfccb8016eee44191d2715a4`
- Reactive deployment link: `https://lasna.reactscan.net/tx/0x34f3983bf08e75777f04893929d10ae695c52dc4cfccb8016eee44191d2715a4`
- Destination setReactiveSender tx: `0x27ea592409cd5ee18ee6e01404673e0dda78903161d12d17ac302178c2ff4a87`
- Destination setReactiveSender link: `https://sepolia.etherscan.io/tx/0x27ea592409cd5ee18ee6e01404673e0dda78903161d12d17ac302178c2ff4a87`
- Destination setCallbackProxy tx: `0xb7b8211f487131a91e734868d6bb9b34f94f262ad4c0e15640503b574f6db267`
- Destination setCallbackProxy link: `https://sepolia.etherscan.io/tx/0xb7b8211f487131a91e734868d6bb9b34f94f262ad4c0e15640503b574f6db267`

## Round 1

- Prompt: `miyao`
- AI verdict: `YES`
- User wallet: `0x2EA50ca5Ef3851B4AD9F92841fD9a32286760c09`
- Origin submit tx hash: `0xcf9d52bb71ae1a00a0d91b1ce0304ed4225f67dfce1210fe4d4709b185777d70`
- Origin submit tx link: `https://sepolia.etherscan.io/tx/0xcf9d52bb71ae1a00a0d91b1ce0304ed4225f67dfce1210fe4d4709b185777d70`
- AI result submit tx hash: `0x908031a80baf21aadd70657e88174b6871dd98ad0d31cca12a5507be291e52c9`
- AI result submit tx link: `https://sepolia.etherscan.io/tx/0x908031a80baf21aadd70657e88174b6871dd98ad0d31cca12a5507be291e52c9`
- Reactive callback tx hash: `0x0d3dbf70ce7bb967f2d933a519dd9b2c6e5ed45a994764c75e3ce44e93bc3f3d`
- Reactive callback tx link: `https://lasna.reactscan.net/tx/0x0d3dbf70ce7bb967f2d933a519dd9b2c6e5ed45a994764c75e3ce44e93bc3f3d`
- Destination settlement tx hash: `0xd382a188a801d4fe05eaa769f097ac12382037fafa9f5137d68475ab50769ede`
- Destination settlement tx link: `https://sepolia.etherscan.io/tx/0xd382a188a801d4fe05eaa769f097ac12382037fafa9f5137d68475ab50769ede`
- Final result: `Success`
- Notes: `Challenge id: 0xb931e18293b3afcb477e2724eb6fb92b56c6787a418755661ea7cdcc1359ded8. Callback delivery was finalized in the test run after updating the destination callback proxy to the signer wallet.`

## Round 2

- Prompt: `TBD`
- AI verdict: `TBD`
- User wallet: `TBD`
- Origin submit tx hash: `TBD`
- Origin submit tx link: `TBD`
- AI result submit tx hash: `TBD`
- AI result submit tx link: `TBD`
- Reactive callback tx hash: `TBD`
- Reactive callback tx link: `TBD`
- Destination settlement tx hash: `TBD`
- Destination settlement tx link: `TBD`
- Final result: `TBD`
- Notes: `TBD`

## Round 3

- Prompt: `TBD`
- AI verdict: `TBD`
- User wallet: `TBD`
- Origin submit tx hash: `TBD`
- Origin submit tx link: `TBD`
- AI result submit tx hash: `TBD`
- AI result submit tx link: `TBD`
- Reactive callback tx hash: `TBD`
- Reactive callback tx link: `TBD`
- Destination settlement tx hash: `TBD`
- Destination settlement tx link: `TBD`
- Final result: `TBD`
- Notes: `TBD`

## Final Checklist

- [x] At least one full round completed
- [x] Origin tx recorded
- [x] AI result tx recorded
- [x] Reactive tx recorded
- [x] Destination tx recorded
- [x] Explorer links recorded
