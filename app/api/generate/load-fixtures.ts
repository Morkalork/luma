import { MatchInfo } from "@/app/types/match-info";
import { getSeasonCache, saveSeasonCache } from "./cache";
import { createWebPage } from "../utils/create-web-page";
import { loadPlayerInformation } from "./load-player-information";

export type TeamInformation = {
  season: string;
  clubId: string;
  teamId: number;
  divisionId: string;
};

const getFixturesUrl = (args: TeamInformation) =>
  `https://bits.swebowl.se/seriespel?seasonId=${args.season}&clubId=${args.clubId}&teamId=${args.teamId}&divisionId=${args.divisionId}&showTeamGames=true&showTeamDetails=true`;

export async function loadFixtures(fixturesArgs: TeamInformation) {
  const page = await createWebPage();
  const url = getFixturesUrl(fixturesArgs);
  page.setRequestInterception(false);
  let fixturesLoaded = false;
  console.log(`Loading fixtures from ${url}`);

  page.on("response", async (response) => {
    if (
      !fixturesLoaded &&
      response.url().startsWith("https://api.swebowl.se/api/v1/Match")
    ) {
      console.log(`Checking for fixtures from ${response.url()}`);
      const headers = response.headers();
      const contentTypes = headers["content-type"];
      if (!contentTypes.includes("application/json")) {
        return;
      }

      console.log("Loading fixtures...");
      const seasonCache = getSeasonCache();
      const data: MatchInfo[] = await response.json();
      data.forEach((match) => {
        seasonCache[match.matchId] = match;
      });

      saveSeasonCache(seasonCache);

      const matchIds = Object.keys(seasonCache);
      if (matchIds.length > 0) {
        console.log("Fixtures loaded!");
        fixturesLoaded = true;

        for (const matchIdStr of matchIds) {
          const matchId = parseInt(matchIdStr);
          const isHome =
            seasonCache[matchId].matchHomeTeamId === fixturesArgs.teamId;
          console.log(`Loading player information for match ${matchId}`);
          await loadPlayerInformation(matchId, isHome);
        }
      }
    }
  });

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
  );

  console.log("Launching page at url", url);
  try {
    await page.goto(url, { waitUntil: "networkidle2" });
    const response = await page.waitForResponse(
      (response) => response.url().includes("desired-endpoint"),
      { timeout: 20000 }
    );
    console.log("Response received", response.url());
  } catch (e) {
    console.error("Error loading page", e);
  }
  console.log("Fixtures loading initiaited");
}
