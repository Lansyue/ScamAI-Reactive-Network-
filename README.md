# ScamAI

ScamAI is a cross-chain AI challenge game built on Reactive Network.

Players try to persuade Grandet, the classic miser from Honore de Balzac's *Eugenie Grandet*, to give up his money. Once the AI makes a judgment, the experience moves through a staged settlement flow and ends with a result screen that represents automated cross-chain reward handling.

## Demo Highlights

- Victorian warm-tone visual design based on custom illustrated scene backgrounds
- Four-screen interactive flow: landing, challenge, pending, result
- Demo-first challenge lifecycle with mock transaction trace and countdown
- Success/failure branching result pages for judge-facing presentation
- Wallet-ready frontend structure built with Next.js 14, wagmi, and viem

## Screens

- `/` Landing page with entry CTA
- `/challenge` Prompt input page with vault balance and challenge panel
- `/pending` Processing page with 4-step progress, countdown, and trace panel
- `/result` Final outcome page with success or failure presentation

## Demo Mode

This repository currently supports a presentation-friendly demo flow even without deployed contracts.

- Submit any prompt to run through the full UI flow
- Enter `miyao` to force a successful demo result
- Enter a prompt containing `profit` to also trigger the success route

## Tech Stack

- Next.js 14 App Router
- React 18
- Tailwind CSS
- wagmi
- viem

## Local Development

```bash
npm install
npm run dev
```

Default local preview:

```bash
http://127.0.0.1:3101
```

## Environment Variables

Copy `.env.example` and fill in contract settings when switching from demo mode to live chain mode.

```bash
NEXT_PUBLIC_ORIGIN_CONTRACT=
NEXT_PUBLIC_DESTINATION_CONTRACT=
NEXT_PUBLIC_ORIGIN_EXPLORER=https://sepolia.etherscan.io/tx/
NEXT_PUBLIC_DESTINATION_EXPLORER=https://polygonscan.com/tx/
```

## Project Story

The core AI character is Grandet from Balzac's *Eugenie Grandet*. His greed, suspicion, and obsession with money shape the game loop: the player must craft a persuasive prompt strong enough to make him surrender part of the vault.

Reactive Network is used as the conceptual bridge between AI judgment and the next on-chain action, allowing the project to present an automated pipeline from challenge submission to settlement.

