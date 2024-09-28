import { MatchInfo, SeasonMatches } from "@/app/types/match-info";
import puppeteer from "puppeteer";
import { addSeasonMatchesToCache } from "./season-cache";

export type TeamInformation = {
  season: string;
  clubId: string;
  teamId: string;
  divisionId: string;
};

const buildFixturesUrl = (args: TeamInformation) =>
  `https://bits.swebowl.se/seriespel?seasonId=${args.season}&clubId=${args.clubId}&teamId=${args.teamId}&divisionId=${args.divisionId}&showTeamGames=true&showTeamDetails=true`;

export async function loadMatchData(fixturesArgs: TeamInformation) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  const url = buildFixturesUrl(fixturesArgs);
  page.setRequestInterception(true);

  page.on("request", (request) => {
    request.continue();
  });

  page.on("response", async (response) => {
    if (response.url().startsWith("https://api.swebowl.se/api/v1/Match")) {
      const seasonMatches: SeasonMatches = {};
      const headers = response.headers();
      const contentTypes = headers["content-type"];
      if (contentTypes.includes("application/json")) {
        const data: MatchInfo[] = await response.json();
        console.log(data.length);
        data.forEach((match) => {
          seasonMatches[match.matchId] = match;
        });

        addSeasonMatchesToCache(seasonMatches);
      }

      if (Object.keys(seasonMatches).length > 0) {
        console.log("Data loaded!");
      }
    }
  });

  await page.goto(url);
  console.log("Data loaded!");
}
