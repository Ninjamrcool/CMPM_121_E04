export interface PrefabType {
  kind: string;
  hp: number;
  score: number;
  radius: number;
  dropChance: number;
  canShoot: boolean;
  isPickup: boolean;
}

export const droneEnemyPrefabType: PrefabType = {
  kind: "drone",
  hp: 2,
  score: 100,
  radius: 13,
  dropChance: 0.015,
  canShoot: true,
  isPickup: false,
};
export const dartEnemyPrefabType: PrefabType = {
  kind: "dart",
  hp: 1,
  score: 150,
  radius: 12,
  dropChance: 0.015,
  canShoot: false,
  isPickup: false,
};
export const turretEnemyPrefabType: PrefabType = {
  kind: "turret",
  hp: 12,
  score: 400,
  radius: 19,
  dropChance: 0.3,
  canShoot: true,
  isPickup: false,
};
export const lancerEnemyPrefabType: PrefabType = {
  kind: "lancer",
  hp: 4,
  score: 250,
  radius: 15,
  dropChance: 0.06,
  canShoot: true,
  isPickup: false,
};

export const bossEnemyPrefabType: PrefabType = {
  kind: "boss",
  hp: 900,
  score: 10000,
  radius: 46,
  dropChance: 0,
  canShoot: true,
  isPickup: false,
};

export const spreadPowerUpPrefabType: PrefabType = {
  kind: "spread",
  hp: 0,
  score: 0,
  radius: 14,
  dropChance: 0,
  canShoot: false,
  isPickup: true,
};
export const shieldPowerUpPrefabType: PrefabType = {
  kind: "shield",
  hp: 0,
  score: 0,
  radius: 14,
  dropChance: 0,
  canShoot: false,
  isPickup: true,
};
