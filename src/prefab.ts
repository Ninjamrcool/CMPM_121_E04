import Phaser from "phaser";
import { Actor, type Arena, WIDTH } from "./actors.ts";
import { bossEnemyPrefabType, EnemyType, PrefabType } from "./prefabTypes.ts";

/**
 * Base class for everything the player can shoot or pick up: enemies, the
 * boss and power-ups. kind is the prefab's name and also its texture key.
 */
export class PrefabSprite extends Actor {
  public kind: string;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    prefabType: PrefabType,
  ) {
    super(scene, x, y, prefabType.kind, prefabType.radius);
    this.kind = prefabType.kind;
  }

  step(_arena: Arena): void {
    this.age++;
    const { x, y } = this;
    this.vx = this.x - x;
    this.vy = this.y - y;
  }
}

export class EnemySprite extends PrefabSprite {
  private maxHp: number;
  private flash: number = 0;
  public heading: number = 0;

  public homeX: number;
  public side: number;
  public hp: number;
  public score: number;
  public dropChance: number;
  public move: (enemy: EnemySprite, arena: Arena) => void;
  public fireWeapon: (enemy: EnemySprite, arena: Arena) => void;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    homeX: number,
    side: number,
    enemyType: EnemyType,
  ) {
    super(scene, x, y, enemyType.prefabType);
    this.homeX = homeX;
    this.side = side;
    this.hp = enemyType.hp;
    this.maxHp = enemyType.hp;
    this.score = enemyType.score;
    this.dropChance = enemyType.dropChance;
    this.move = enemyType.move;
    this.fireWeapon = enemyType.fireWeapon;
  }

  override step(arena: Arena): void {
    super.step(arena);

    this.move(this, arena);

    this.fireWeapon(this, arena);

    this.flash = Math.max(0, this.flash - 1);
    if (this.flash > 0) {
      this.setTint(0xffffff).setTintMode(Phaser.TintModes.FILL);
    } else {
      this.clearTint();
    }
  }

  aim(arena: Arena): number {
    return Math.atan2(arena.player.y - this.y, arena.player.x - this.x);
  }

  /** Returns true when this hit destroys the enemy. */
  takeDamage(amount: number): boolean {
    this.hp -= amount;
    this.flash = 3;
    return this.hp <= 0;
  }

  get fraction(): number {
    return this.hp / this.maxHp;
  }
}

/** The Warden: a three-phase finale whose attacks escalate as it weakens. */
export class BossSprite extends EnemySprite {
  readonly core: Phaser.GameObjects.Image;

  private spin: number = 0;

  constructor(scene: Phaser.Scene) {
    super(
      scene,
      WIDTH / 2,
      -90,
      WIDTH / 2,
      1,
      bossEnemyPrefabType,
    );
    this.core = scene.add.image(this.x, this.y, "boss-core").setBlendMode(
      Phaser.BlendModes.ADD,
    );
  }

  phase(): number {
    return this.fraction > 2 / 3 ? 1 : this.fraction > 1 / 3 ? 2 : 3;
  }

  /** The Warden ignores damage until it has finished descending. */
  get arrived(): boolean {
    return this.age > 150;
  }

  override takeDamage(amount: number): boolean {
    return this.arrived ? super.takeDamage(amount) : false;
  }

  override step(arena: Arena): void {
    super.step(arena);
    if (!this.arrived) {
      this.y += 1.4;
    } else {
      const sway = this.phase() === 3 ? 0.012 : 0.008;
      this.x = WIDTH / 2 + Math.sin((this.age - 150) * sway) * 140;
      this.attack(arena, this.age - 150);
    }
    this.core.setPosition(this.x, this.y + 6);
    this.core.setScale(1 + 0.15 * Math.sin(this.age * (0.08 * this.phase())));
  }

  private attack(arena: Arena, t: number): void {
    if (this.phase() === 1 && t % 55 === 0) this.fan(arena, 9, 1.1, 2.8);
    if (this.phase() === 2) {
      if (t % 80 === 0) this.fan(arena, 9, 1.2, 3);
      if (t % 80 === 40) {
        for (const d of [-0.12, 0, 0.12]) {
          arena.fire(this.x, this.y + 30, this.aim(arena) + d, 4.2, true);
        }
      }
      if (t % 360 === 180) {
        arena.summon("drone", this.x - 70, this.y);
        arena.summon("drone", this.x + 70, this.y);
      }
    }
    if (this.phase() === 3 && t % 6 === 0) {
      this.spin += 0.23;
      for (let arm = 0; arm < 4; arm++) {
        arena.fire(this.x, this.y + 6, this.spin + (arm * Math.PI) / 2, 2.6);
      }
      if (t % 48 === 0) {
        arena.fire(this.x, this.y + 30, this.aim(arena), 4.6, true);
      }
    }
  }

  private fan(arena: Arena, count: number, width: number, speed: number): void {
    for (let i = 0; i < count; i++) {
      const angle = Math.PI / 2 + (i / (count - 1) - 0.5) * width;
      arena.fire(this.x, this.y + 40, angle, speed);
    }
  }

  override destroy(fromScene?: boolean): void {
    this.core.destroy(fromScene);
    super.destroy(fromScene);
  }
}

export class ShmupPowerUp extends PrefabSprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    prefabType: PrefabType,
  ) {
    super(scene, x, y, prefabType);
  }

  override step(): void {
    this.age++;
    this.y += 1.1;
    this.rotation += 0.04;
    this.setScale(1 + 0.12 * Math.sin(this.age * 0.15));
  }
}
