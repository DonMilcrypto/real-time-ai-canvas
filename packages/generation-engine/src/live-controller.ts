import type { GenerationContext, GenerationJob, GenerationPolicy, ModelProvider } from "./contracts";

export class LiveGenerationController {
  private timer: ReturnType<typeof setTimeout> | undefined;
  private active?: GenerationJob;
  private revision = 0;

  constructor(private readonly provider: ModelProvider, private readonly policy: GenerationPolicy) {}

  schedule(context: GenerationContext, onJob: (job: GenerationJob) => void): void {
    this.revision += 1;
    const revision = this.revision;
    if (this.timer) clearTimeout(this.timer);
    this.active?.cancel();
    this.timer = setTimeout(async () => {
      if (revision !== this.revision) return;
      try {
        const job = await this.provider.generate(context);
        if (revision !== this.revision) {
          job.cancel();
          return;
        }
        this.active = job;
        onJob(job);
      } catch (err) {
        if (revision === this.revision) {
          console.error("[generation] provider.generate failed", err);
        }
      } finally {
        if (revision === this.revision) this.timer = undefined;
      }
    }, this.policy.debounceMs);
  }

  cancel(): void {
    this.revision += 1;
    if (this.timer) clearTimeout(this.timer);
    this.timer = undefined;
    this.active?.cancel();
    this.active = undefined;
  }
}
