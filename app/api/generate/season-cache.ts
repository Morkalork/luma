import { SeasonMatches } from "@/app/types/match-info";
import fs from "fs";
import path from "path";

const seasonCache: SeasonMatches = {};
const cacheFilePath = path.join("data", "season-cache.json");

fs.readFile(cacheFilePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading cache file", err);
  } else {
    try {
      const cache = JSON.parse(data);
      Object.keys(cache).forEach((key) => {
        seasonCache[parseInt(key)] = cache[key];
      });
      console.log("Cache loaded from file");
    } catch (e) {
      console.error("Error parsing cache file", e);
    }
  }
});

function saveCache() {
  const data = JSON.stringify(seasonCache);
  fs.writeFile(cacheFilePath, data, (err) => {
    if (err) {
      console.error("Error writing cache to file", err);
    } else {
      console.log("Cache saved to file");
    }
  });
}

export function addSeasonMatchesToCache(matches: SeasonMatches) {
  Object.entries(matches).forEach(([matchId, match]) => {
    seasonCache[matchId] = match;
  });
  saveCache();
}
