import Phaser from "phaser";
import { makeTextures } from "../textures.ts";
import { loadSounds } from "../sounds.ts";
import { Run } from "./play.ts";

export abstract class ParentScene extends Phaser.Scene {
  protected leavingScene = false;

  constructor(sceneKey: string) {
    super(sceneKey);
  }

  init(): void {
    this.leavingScene = false;
  }

  create(): void {
    // first run only: draw every texture and synthesize every sound
    if (!this.textures.exists("player")) {
      makeTextures(this);
      loadSounds(this);
    }

    this.input.keyboard?.on("keydown-SPACE", () => this.onSpace());

    const camera = this.cameras.main;
    Phaser.Actions.AddEffectBloom(camera, {
      threshold: 0.55,
      blurRadius: 3,
      blendAmount: 0.9,
    });
    camera.filters.external.addVignette(0.5, 0.5, 0.75, 0.45);

    this.cameras.main.fadeIn(400, 4, 2, 12);
  }

  protected switchScene(
    scene: string,
    run?: Run,
    attract?: boolean,
  ): void {
    if (this.leavingScene) return;
    this.leavingScene = true;

    this.cameras.main.fadeOut(450, 4, 2, 12);
    this.cameras.main.once("camerafadeoutcomplete", () => {
      this.leavingScene = false;
      this.scene.start(scene, { run: run, attract: attract });
      this.scene.get("backdrop").scene.restart();
    });
  }

  protected onSpace(): void {
    return;
  }
}
