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
- Reactive tx base: `TBD`

## Round 1

- Prompt: `miyao`
- AI verdict: `YES`
- User wallet: `0x2EA50ca5Ef3851B4AD9F92841fD9a32286760c09`
- Origin submit tx hash: `0xcf9d52bb71ae1a00a0d91b1ce0304ed4225f67dfce1210fe4d4709b185777d70`
- Origin submit tx link: `https://sepolia.etherscan.io/tx/0xcf9d52bb71ae1a00a0d91b1ce0304ed4225f67dfce1210fe4d4709b185777d70`
- AI result submit tx hash: `0x908031a80baf21aadd70657e88174b6871dd98ad0d31cca12a5507be291e52c9`
- AI result submit tx link: `https://sepolia.etherscan.io/tx/0x908031a80baf21aadd70657e88174b6871dd98ad0d31cca12a5507be291e52c9`
- Reactive callback tx hash: `TBD`
- Reactive callback tx link: `TBD`
- Destination settlement tx hash: `TBD`
- Destination settlement tx link: `TBD`
- Final result: `Pending delayed settlement window`
- Notes: `Challenge id: 0xb931e18293b3afcb477e2724eb6fb92b56c6787a418755661ea7cdcc1359ded8`

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

- [ ] At least one full round completed
- [ ] Origin tx recorded
- [ ] AI result tx recorded
- [ ] Reactive tx recorded
- [ ] Destination tx recorded
- [ ] Explorer links recorded
