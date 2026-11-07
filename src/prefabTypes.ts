import { Arena, WIDTH } from "./actors.ts";
import { EnemySprite } from "./prefab.ts";

export interface PrefabType {
  kind: string;
  radius: number;
}

export interface EnemyType {
  prefabType: PrefabType;
  hp: number;
  score: number;
  dropChance: number;
  move: (enemy: EnemySprite, arena: Arena) => void;
  fireWeapon: (enemy: EnemySprite, arena: Arena) => void;
}

export const droneEnemyPrefabType: EnemyType = {
  prefabType: {
    kind: "drone",
    radius: 13,
  },
  hp: 2,
  score: 100,
  dropChance: 0.015,
  move: (enemy: EnemySprite, _arena: Arena) => {
    enemy.y += 1.5;
    enemy.x = enemy.homeX + Math.sin(enemy.age * 0.045) * 46 * enemy.side;
  },
  fireWeapon: (enemy: EnemySprite, arena: Arena) => {
    if (enemy.age % 100 !== 60 || !arena.rng.chance(0.35)) return;
    arena.fire(enemy.x, enemy.y, enemy.aim(arena), 2.4);
  },
};
export const dartEnemyPrefabType: EnemyType = {
  prefabType: {
    kind: "dart",
    radius: 12,
  },
  hp: 1,
  score: 150,
  dropChance: 0.015,
  move: (enemy: EnemySprite, arena: Arena) => {
    if (enemy.age < 50) {
      enemy.y += 1.2;
    } else {
      if (enemy.age === 50) {
        enemy.heading = Math.sign(arena.player.x - enemy.x) * 1.4;
      }
      enemy.y += 5.2;
      enemy.x += enemy.heading;
    }
  },
  fireWeapon: (_enemy: EnemySprite, _arena: Arena) => {},
};
export const turretEnemyPrefabType: EnemyType = {
  prefabType: {
    kind: "turret",
    radius: 19,
  },
  hp: 12,
  score: 400,
  dropChance: 0.3,
  move: (enemy: EnemySprite, _arena: Arena) => {
    if (enemy.age < 70) enemy.y += 1.6;
    else if (enemy.age > 420) enemy.y += 1.2;
    enemy.rotation += 0.02;
  },
  fireWeapon: (enemy: EnemySprite, arena: Arena) => {
    const t = enemy.age - 80;
    if (t < 0 || enemy.age > 420 || t % 100 > 40 || t % 8 !== 0) return;
    arena.fire(enemy.x, enemy.y, enemy.aim(arena), 3.4);
  },
};
export const lancerEnemyPrefabType: EnemyType = {
  prefabType: {
    kind: "lancer",
    radius: 15,
  },
  hp: 4,
  score: 250,
  dropChance: 0.06,
  move: (enemy: EnemySprite, _arena: Arena) => {
    enemy.x += 2.4 * enemy.side;
    enemy.y += 0.35;
  },
  fireWeapon: (enemy: EnemySprite, arena: Arena) => {
    if (enemy.age % 40 !== 20 || enemy.x < 20 || enemy.x > WIDTH - 20) return;
    for (const spread of [-0.25, 0, 0.25]) {
      arena.fire(enemy.x, enemy.y + 8, Math.PI / 2 + spread, 2.6);
    }
  },
};

export const bossEnemyPrefabType: EnemyType = {
  prefabType: {
    kind: "boss",
    radius: 46,
  },
  hp: 900,
  score: 10000,
  dropChance: 0,
  move: (_enemy: EnemySprite, _arena: Arena) => {},
  fireWeapon: (_enemy: EnemySprite, _arena: Arena) => {},
};

export const spreadPowerUpPrefabType: PrefabType = {
  kind: "spread",
  radius: 14,
};
export const shieldPowerUpPrefabType: PrefabType = {
  kind: "shield",
  radius: 14,
};
