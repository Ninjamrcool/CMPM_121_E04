import { HEIGHT, WIDTH } from "../actors.ts";
import { Hud } from "../hud.ts";
import { ParentScene } from "./parentScene.ts";
import { TINTS } from "../textures.ts";
import { Run } from "./play.ts";
import { play } from "../sounds.ts";

/** Lines of the closing story and when (seconds) each appears. */
const STORY: [number, string][] = [
  [0.8, "The Warden's lights go dark, one ring at a time."],
  [4.2, "Behind you, five sectors of open sky."],
  [7.6, "Ahead, the long way home."],
];
const WARP_AT = 9;
const CREDITS_AT = 11;
const RETURN_AT = 18;

export class CutsceneScene extends ParentScene {
  private run?: Run;
  private attract: boolean = false;

  constructor(
    private readonly hud: Hud,
  ) {
    super("cutscene");
  }

  override init(data?: { run?: Run; attract?: boolean }): void {
    super.init();
    if (data) {
      this.run = data.run;
      this.attract = data.attract ?? false;
    }
  }

  override create(): void {
    super.create();

    this.hud.setMode("cutscene");
    this.hud.setBoss(null);

    const ship = this.add.image(WIDTH / 2, HEIGHT - 120, "player");
    ship.enableFilters();
    ship.filters?.internal.addGlow(TINTS.player, 5, 0, 1);
    this.add.particles(0, 0, "spark", {
      speedY: { min: 120, max: 260 },
      lifespan: 420,
      scale: { start: 1.2, end: 0 },
      tint: TINTS.player,
      blendMode: "ADD",
      frequency: 16,
    }).startFollow(ship, 0, 18);
    this.tweens.add({
      targets: ship,
      y: HEIGHT - 140,
      duration: 1600,
      yoyo: true,
      repeat: -1,
      ease: "Sine.inOut",
    });

    for (const [at, line] of STORY) {
      this.time.delayedCall(at * 1000, () => this.hud.say(line));
    }
    this.time.delayedCall(WARP_AT * 1000, () => {
      this.hud.say("");
      play(this, "pickup", 0.7);
      this.tweens.add({
        targets: this.scene.get("backdrop"),
        warp: 18,
        duration: 900,
        ease: "Quad.in",
      });
      this.tweens.killTweensOf(ship);
      this.tweens.add({
        targets: ship,
        y: -80,
        scale: 0.4,
        duration: 1100,
        ease: "Back.in",
      });
      this.time.delayedCall(
        1000,
        () => this.cameras.main.flash(500, 220, 250, 255),
      );
    });
    this.time.delayedCall(CREDITS_AT * 1000, () => {
      this.hud.announce(
        "THANK YOU FOR PLAYING",
        `Final score ${this.run?.score}`,
      );
      if (this.attract) {
        this.hud.say(
          `Self-play: ${this.run?.kills} kills, ${this.run?.hits} hits, ${this.run?.continues} continues`,
        );
      }
    });
    this.time.delayedCall(RETURN_AT * 1000, () => this.endCutscene());
  }

  override onSpace(): void {
    this.endCutscene();
  }

  private endCutscene(): void {
    if (this.leavingScene) return;
    this.hud.say("");

    this.switchScene("title");
  }
}
