/*
  Demo workflow checklist:

  1. User calls Origin.submitChallenge(prompt)
  2. Backend listener catches ChallengeSubmitted
  3. AI judge decides YES/NO and relayer calls Origin.submitAIResult(...)
  4. After delay window, Reactive.react(...) forwards the result
  5. Destination.handleReactiveCallback(...) settles the reward

  Replace the environment variables below before running against live testnets.
*/

async function main() {
  console.log("Use this script as a workflow guide for manual end-to-end testing.");
  console.log("Required env:");
  console.log("- ORIGIN_CONTRACT");
  console.log("- REACTIVE_CONTRACT");
  console.log("- DESTINATION_CONTRACT");
  console.log("- PLAYER_PRIVATE_KEY");
  console.log("- RELAYER_PRIVATE_KEY");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
