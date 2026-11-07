import Phaser from "phaser";
import { HEIGHT, WIDTH } from "../actors.ts";
import { ParentScene } from "./parentScene.ts";

/** Parallax space shared by every scene, plus the camera's glow treatment. */
export class Backdrop extends ParentScene {
  /** Scroll speed multiplier; the cutscene raises it for the warp jump. */
  private warp = 1;
  private layers: [Phaser.GameObjects.TileSprite, number][];

  constructor() {
    super("backdrop");
  }

  override init(): void {
    super.init();

    this.warp = 1;
  }

  override create(): void {
    super.create();

    const tile = (key: string, speed: number, alpha = 1) =>
      [
        this.add.tileSprite(0, 0, WIDTH, HEIGHT, key).setOrigin(0).setAlpha(
          alpha,
        ),
        speed,
      ] as [Phaser.GameObjects.TileSprite, number];
    this.layers = [
      tile("nebula", 0.25, 0.9),
      tile("stars-far", 0.6),
      tile("stars-near", 1.6),
    ];

    this.scene.sendToBack();
  }

  override update(_time: number, delta: number): void {
    const frames = delta / (1000 / 60);
    for (const [layer, speed] of this.layers) {
      layer.tilePositionY -= speed * this.warp * frames;
    }
  }
}
