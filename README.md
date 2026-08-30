# Real-Time AI Canvas

A production-oriented visual workspace for real-time AI image generation. The canvas, annotation layer, live preview, prompt system, image-to-image workspace, history, and model-provider abstraction are designed as separate concerns so the application can evolve from local/open models to hosted providers without coupling the UI to a vendor.

## Product architecture

```text
Drawing + Annotation Layers
          |
          v
     Scene Context
       Compiler
          |
Prompt --> Generation Engine <-- Model Provider
          |
          v
     Live AI Preview
          |
       History
```

## Repository layout

- `apps/web`: browser application shell and UI
- `packages/canvas-engine`: canvas primitives and scene model
- `packages/drawing-tools`: tool contracts and tool registry
- `packages/annotation-engine`: semantic AI guidance annotations
- `packages/image-engine`: image transforms and serialization boundaries
- `packages/generation-engine`: debouncing, request lifecycle, and provider-neutral generation contracts
- `packages/model-providers`: provider adapters
- `packages/prompt-engine`: prompt/context composition
- `packages/project-store`: persistence interfaces
- `packages/asset-store`: asset persistence interfaces
- `server`: future API and worker boundary
- `tests`: unit and end-to-end test boundaries

## Principles

1. The artwork bitmap and AI annotations are distinct data.
2. The UI never talks directly to a model vendor.
3. Generation requests are cancellable and coalesced.
4. Local-first persistence is the default foundation.
5. Provider policy is outside the editor architecture.
6. Features should be testable without a live model.

## Development

The initial repository is intentionally dependency-light. Add the framework/runtime selected for the deployment target at the application layer while keeping the domain packages framework-independent.

## License

MIT
