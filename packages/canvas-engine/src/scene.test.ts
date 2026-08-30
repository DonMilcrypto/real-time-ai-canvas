import { describe, expect, it } from "vitest";
import { createScene } from "./scene";

describe("createScene", () => {
  it("creates a valid starter scene", () => {
    const scene = createScene(800, 600);
    expect(scene.version).toBe(1);
    expect(scene.width).toBe(800);
    expect(scene.height).toBe(600);
    expect(scene.layers).toHaveLength(1);
    expect(scene.layers[0]?.name).toBe("Artwork");
  });
});
