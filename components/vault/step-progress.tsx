import { cn } from "@/lib/utils";

interface StepProgressProps {
  currentStep: number;
}

const steps = [
  "Step 1: Review",
  "Step 2: Judge",
  "Step 3: Reactive",
  "Step 4: Reward"
];

export function StepProgress({ currentStep }: StepProgressProps) {
  return (
    <div className="space-y-5">
      <div className="relative h-2 rounded-full bg-[#6e4d2c]/70">
        <div
          className="absolute left-0 top-0 h-2 rounded-full bg-[linear-gradient(90deg,#f7dfa2,#d4af37,#f7dfa2)] shadow-glow transition-all duration-700"
          style={{ width: `${Math.max(10, (currentStep / 4) * 100)}%` }}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {steps.map((step, index) => {
          const active = index + 1 <= currentStep;
          return (
            <div key={step} className="flex items-center gap-3">
              <div
                className={cn(
                  "h-6 w-6 rounded-full border border-[#d7b26e] transition",
                  active ? "bg-[#f7dfa2] shadow-glow" : "bg-transparent"
                )}
              />
              <p
                className={cn(
                  "font-display text-lg tracking-wide",
                  active ? "text-vault-candle" : "text-vault-blush"
                )}
              >
                {step}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
