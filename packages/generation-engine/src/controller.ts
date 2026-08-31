import type { GenerationContext, GenerationJob, GenerationPolicy, ModelProvider } from "./contracts";
import { DEFAULT_GENERATION_POLICY } from "./contracts";

export class LiveGenerationController {
  private active?: GenerationJob;
  private timer?: ReturnType<typeof setTimeout>;
  constructor(private readonly provider: ModelProvider, private readonly policy: GenerationPolicy = DEFAULT_GENERATION_POLICY) {}

  cancel() { clearTimeout(this.timer); this.active?.cancel(); this.active = undefined; }

  schedule(context: GenerationContext, onJob: (job: GenerationJob) => void) {
    clearTimeout(this.timer);
    this.active?.cancel();
    this.timer = setTimeout(async () => {
      const job = await this.provider.generate(context);
      this.active = job;
      onJob(job);
    }, this.policy.debounceMs);
  }
}
