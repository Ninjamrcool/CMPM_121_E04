import {
  dartEnemyPrefabType,
  droneEnemyPrefabType,
  EnemyType,
  lancerEnemyPrefabType,
  turretEnemyPrefabType,
} from "./prefabTypes.ts";

interface Sector {
  name: string;
  title: string;
  subtitle: string;
  minStartTime: number;
  maxStartTime: number;
  waves: Wave[];
}

export interface Wave {
  x: (index: number) => number;
  y: (index: number) => number;
  sectorTime: (index: number) => number;
  enemyCount: number;
  enemyType: EnemyType;
}

function constantValue(value: number): (index: number) => number {
  return () => value;
}

function linearChange(
  start: number,
  change: number,
): (index: number) => number {
  return (index: number) => {
    return start + change * index;
  };
}

function groupedLinearChange(
  start: number,
  change: number,
  groupSize: number,
): (index: number) => number {
  return (index: number) => {
    return start + change * Math.floor(index / groupSize);
  };
}

function absoluteValueChange(
  start: number,
  change: number,
  center: number,
): (index: number) => number {
  return (index: number) => {
    return start + change * Math.abs(index - center);
  };
}

function alternatingValue(
  even: number,
  odd: number,
): (index: number) => number {
  return (index: number) => {
    return index % 2 === 0 ? even : odd;
  };
}

export const sectors: Sector[] = [
  // Sector 1
  {
    name: "Outer Drift",
    title: "Sector 1: Outer Drift",
    subtitle: "Scouts ahead",
    minStartTime: 1560,
    maxStartTime: 1800,
    waves: [
      {
        x: linearChange(144, 64),
        y: constantValue(-30),
        sectorTime: constantValue(60),
        enemyCount: 4,
        enemyType: droneEnemyPrefabType,
      },
      {
        x: linearChange(80, 44),
        y: constantValue(-30),
        sectorTime: absoluteValueChange(360, 10, 2),
        enemyCount: 5,
        enemyType: droneEnemyPrefabType,
      },
      {
        x: linearChange(224, 44),
        y: constantValue(-30),
        sectorTime: absoluteValueChange(660, 10, 2),
        enemyCount: 5,
        enemyType: droneEnemyPrefabType,
      },
      {
        x: linearChange(80, 64),
        y: constantValue(-30),
        sectorTime: constantValue(960),
        enemyCount: 6,
        enemyType: droneEnemyPrefabType,
      },
      {
        x: constantValue(120),
        y: constantValue(-30),
        sectorTime: linearChange(1200, 24),
        enemyCount: 4,
        enemyType: droneEnemyPrefabType,
      },
      { // column
        x: constantValue(360),
        y: constantValue(-30),
        sectorTime: linearChange(1260, 24),
        enemyCount: 4,
        enemyType: droneEnemyPrefabType,
      },
    ],
  },

  // Sector 2
  {
    name: "Shatter Belt",
    title: "Sector 2: Shatter Belt",
    subtitle: "Divers Incoming",
    minStartTime: 1800,
    maxStartTime: 2040,
    waves: [
      {
        x: linearChange(130, 44),
        y: constantValue(-30),
        sectorTime: absoluteValueChange(60, 10, 2.5),
        enemyCount: 6,
        enemyType: droneEnemyPrefabType,
      },
      {
        x: linearChange(144, 64),
        y: constantValue(-30),
        sectorTime: constantValue(300),
        enemyCount: 4,
        enemyType: dartEnemyPrefabType,
      },
      {
        x: constantValue(144),
        y: constantValue(-30),
        sectorTime: linearChange(600, 24),
        enemyCount: 5,
        enemyType: dartEnemyPrefabType,
      },
      {
        x: constantValue(336),
        y: constantValue(-30),
        sectorTime: linearChange(720, 24),
        enemyCount: 5,
        enemyType: dartEnemyPrefabType,
      },
      {
        x: linearChange(48, 64),
        y: constantValue(-30),
        sectorTime: constantValue(1020),
        enemyCount: 7,
        enemyType: droneEnemyPrefabType,
      },
      {
        x: linearChange(152, 44),
        y: constantValue(-30),
        sectorTime: absoluteValueChange(1140, 10, 2),
        enemyCount: 5,
        enemyType: dartEnemyPrefabType,
      },
      {
        x: linearChange(80, 64),
        y: constantValue(-30),
        sectorTime: constantValue(1440),
        enemyCount: 6,
        enemyType: dartEnemyPrefabType,
      },
    ],
  },

  // Sector 3
  {
    name: "Gun Lanes",
    title: "Sector 3: Gun Lanes",
    subtitle: "Turrets online",
    minStartTime: 1920,
    maxStartTime: 2160,
    waves: [
      {
        x: constantValue(240),
        y: constantValue(-30),
        sectorTime: constantValue(60),
        enemyCount: 1,
        enemyType: turretEnemyPrefabType,
      },
      {
        x: linearChange(130, 44),
        y: constantValue(-30),
        sectorTime: absoluteValueChange(240, 10, 2.5),
        enemyCount: 6,
        enemyType: droneEnemyPrefabType,
      },
      {
        x: linearChange(208, 64),
        y: constantValue(-30),
        sectorTime: constantValue(540),
        enemyCount: 2,
        enemyType: turretEnemyPrefabType,
      },
      {
        x: constantValue(240),
        y: constantValue(-30),
        sectorTime: linearChange(840, 24),
        enemyCount: 6,
        enemyType: dartEnemyPrefabType,
      },
      {
        x: linearChange(208, 64),
        y: constantValue(-30),
        sectorTime: constantValue(1080),
        enemyCount: 2,
        enemyType: turretEnemyPrefabType,
      },
      {
        x: linearChange(80, 64),
        y: constantValue(-30),
        sectorTime: constantValue(1140),
        enemyCount: 6,
        enemyType: droneEnemyPrefabType,
      },
      {
        x: linearChange(176, 64),
        y: constantValue(-30),
        sectorTime: constantValue(1500),
        enemyCount: 3,
        enemyType: turretEnemyPrefabType,
      },
    ],
  },

  // Sector 4
  {
    name: "Lancer Gate",
    title: "Sector 4: Lancer Gate",
    subtitle: "Crossfire",
    minStartTime: 1920,
    maxStartTime: 2160,
    waves: [
      {
        x: alternatingValue(-30, 510),
        y: groupedLinearChange(70, 50, 2),
        sectorTime: groupedLinearChange(60, 30, 2),
        enemyCount: 4,
        enemyType: lancerEnemyPrefabType,
      },
      {
        x: linearChange(130, 44),
        y: constantValue(-30),
        sectorTime: absoluteValueChange(360, 10, 2.5),
        enemyCount: 6,
        enemyType: dartEnemyPrefabType,
      },
      {
        x: alternatingValue(-30, 510),
        y: groupedLinearChange(70, 50, 2),
        sectorTime: groupedLinearChange(600, 30, 2),
        enemyCount: 6,
        enemyType: lancerEnemyPrefabType,
      },
      {
        x: linearChange(208, 64),
        y: constantValue(-30),
        sectorTime: constantValue(780),
        enemyCount: 2,
        enemyType: turretEnemyPrefabType,
      },
      {
        x: alternatingValue(-30, 510),
        y: groupedLinearChange(70, 50, 2),
        sectorTime: groupedLinearChange(1140, 30, 2),
        enemyCount: 6,
        enemyType: lancerEnemyPrefabType,
      },
      {
        x: linearChange(86, 44),
        y: constantValue(-30),
        sectorTime: absoluteValueChange(1260, 10, 3.5),
        enemyCount: 8,
        enemyType: droneEnemyPrefabType,
      },
      {
        x: linearChange(16, 64),
        y: constantValue(-30),
        sectorTime: constantValue(1560),
        enemyCount: 8,
        enemyType: dartEnemyPrefabType,
      },
    ],
  },

  // Sector 5
  {
    name: "Last Approach",
    title: "Sector 5: Last Approach",
    subtitle: "Everything they have",
    minStartTime: 2040,
    maxStartTime: 2280,
    waves: [
      {
        x: linearChange(176, 64),
        y: constantValue(-30),
        sectorTime: constantValue(60),
        enemyCount: 3,
        enemyType: turretEnemyPrefabType,
      },
      {
        x: alternatingValue(-30, 510),
        y: groupedLinearChange(70, 50, 2),
        sectorTime: groupedLinearChange(180, 30, 2),
        enemyCount: 6,
        enemyType: lancerEnemyPrefabType,
      },
      {
        x: constantValue(120),
        y: constantValue(-30),
        sectorTime: linearChange(540, 24),
        enemyCount: 6,
        enemyType: dartEnemyPrefabType,
      },
      {
        x: constantValue(360),
        y: constantValue(-30),
        sectorTime: linearChange(540, 24),
        enemyCount: 6,
        enemyType: dartEnemyPrefabType,
      },
      {
        x: linearChange(64, 44),
        y: constantValue(-30),
        sectorTime: absoluteValueChange(900, 10, 4),
        enemyCount: 9,
        enemyType: droneEnemyPrefabType,
      },
      {
        x: linearChange(208, 64),
        y: constantValue(-30),
        sectorTime: constantValue(1020),
        enemyCount: 2,
        enemyType: turretEnemyPrefabType,
      },
      {
        x: alternatingValue(-30, 510),
        y: groupedLinearChange(70, 50, 2),
        sectorTime: groupedLinearChange(1320, 30, 2),
        enemyCount: 8,
        enemyType: lancerEnemyPrefabType,
      },
      {
        x: linearChange(86, 44),
        y: constantValue(-30),
        sectorTime: absoluteValueChange(1560, 10, 3.5),
        enemyCount: 8,
        enemyType: dartEnemyPrefabType,
      },
    ],
  },

  // Sector 6
  {
    name: "The Warden",
    title: "WARNING",
    subtitle: "The Warden approaches",
    minStartTime: -1,
    maxStartTime: -1,
    waves: [],
  },
];
