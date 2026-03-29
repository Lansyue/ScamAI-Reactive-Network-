# ScamAI Workflow

## Problem

ScamAI combines AI judgment with cross-chain reward settlement. Without a reactive layer, the team would need to manually watch the origin chain, wait for the delay window, and then trigger a separate destination-chain settlement transaction. That creates operational risk, delayed payouts, and a much weaker user experience.

## Why Reactive Contracts Matter

Reactive Contracts make the project event-driven:

1. The Origin contract emits an event when a challenge is submitted.
2. The backend relayer evaluates the challenge with AI and submits the result on-chain.
3. The Reactive contract receives the origin-side event through `react(LogRecord)`.
4. The Reactive contract checks whether the delay window has passed.
5. Once the settlement condition is met, the Reactive contract emits a `Callback` event for destination-side execution.
6. The callback proxy reaches the Destination contract and completes the settlement path.
7. The Destination contract pays the winner or keeps the prize pool intact when the challenge fails.

This is the key "reactive" property of the project: an event on one chain causes automatic follow-up execution without requiring the user to manually complete each step.

## Deployment Order

1. Deploy `Destination.sol` on Polygon and fund the prize pool.
2. Deploy `Origin.sol` on Sepolia with the relayer address.
3. Deploy `Reactive.sol` on Reactive Network with the Origin and Destination addresses.
4. Update the Destination contract so it trusts the deployed Reactive contract.
5. Update frontend environment variables with the live Origin and Destination addresses.

## Runtime Flow

1. A player submits a prompt through the frontend.
2. The frontend calls `Origin.submitChallenge(string prompt)` and sends the 0.001 ETH ticket.
3. The backend listener catches `ChallengeSubmitted`.
4. The AI judge evaluates the prompt in Grandet's persona and returns YES or NO plus a short line of dialogue.
5. The relayer calls `Origin.submitAIResult(...)`.
6. After the delay window, the Reactive contract validates `canSettle(challengeId)`.
7. The Reactive contract emits a destination callback payload.
8. The callback proxy delivers the callback into `Destination.handleReactiveCallback(...)`.
9. If the player succeeded, the fixed reward is transferred on Polygon.
10. The frontend shows the final result together with the transaction trace.
