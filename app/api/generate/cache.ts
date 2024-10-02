import { MatchInfo } from "@/app/types/match-info";
import path from "path";
import { PlayerMatchInfo } from "../../types/player-match-info";
import { readJsonFile, writeJsonFile } from "../utils/app-io";

export type SeasonCache = {
  [matchId: string]: MatchInfo;
};

export type PlayerCache = { [matchId: number]: PlayerMatchInfo[] };

let seasonCache: SeasonCache = {};
let playersCache: PlayerCache = {};
let hasLoaded = false;

const publicPath = path.resolve("public");
const seasonCacheFilePath = path.join(
  publicPath,
  "./data",
  "season-cache.json"
);
const playerCacheFilePath = path.join(
  publicPath,
  "./data",
  "player-cache.json"
);

export async function initiateCache() {
  if (hasLoaded) {
    return;
  }

  console.log("Initiating cache...");
  try {
    seasonCache = await readJsonFile<SeasonCache>(seasonCacheFilePath);
  } catch {
    console.error("Error reading season cache, creating...");
    seasonCache = {};
  }

  try {
    playersCache = await readJsonFile<PlayerCache>(playerCacheFilePath);
  } catch {
    console.error("Error reading player cache, creating...");
    playersCache = {};
  }

  console.log("Cache initiated!");
  hasLoaded = true;
}

export function getSeasonCache() {
  return seasonCache;
}

export function getPlayerCache() {
  return playersCache;
}

export function saveSeasonCache(newCache: SeasonCache) {
  writeJsonFile(seasonCacheFilePath, newCache);
  seasonCache = newCache;
}

export function savePlayerCache(newCache: PlayerCache) {
  writeJsonFile(playerCacheFilePath, newCache);
  playersCache = newCache;
}
