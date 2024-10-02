import { createWebPage } from "../utils/create-web-page";
import { PlayerMatchInfo } from "@/app/types/player-match-info";
import { getPlayerCache, savePlayerCache } from "./cache";

const getMatchInfoUrl = (matchId: number) =>
  `https://bits.swebowl.se/match-detail?matchid=${matchId}`;

type ResponseData = {
  playerListHome: PlayerMatchInfo[];
  playerListAway: PlayerMatchInfo[];
};

export async function loadPlayerInformation(
  matchId: number,
  isHomeTeam: boolean
) {
  const page = await createWebPage();
  const url = getMatchInfoUrl(matchId);
  page.setRequestInterception(false);
  let matchesLoaded = false;

  page.on("response", async (response) => {
    if (
      !matchesLoaded &&
      response
        .url()
        .startsWith("https://api.swebowl.se/api/v1/matchResult/GetMatchResults")
    ) {
      const headers = response.headers();
      const contentTypes = headers["content-type"];
      if (contentTypes.includes("application/json")) {
        const data: ResponseData = await response.json();
        const players: PlayerMatchInfo[] = isHomeTeam
          ? data.playerListHome
          : data.playerListAway;

        if (players.length > 0) {
          console.log("Match information loaded!");
          matchesLoaded = true;
          const playerCache = getPlayerCache();
          playerCache[matchId] = players;
          savePlayerCache(playerCache);
        }
      }
    }
  });

  await page.goto(url);
  console.log("Match information loading initiaited");
}
