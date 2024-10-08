import { NextResponse } from "next/server";
import { loadFixtures, TeamInformation } from "./load-fixtures";
import { initiateCache } from "./cache";

type Team = {
  id: number;
  name: string;
  divisionId: string;
};

const season = "2024";
const clubId = 33651;
const teams: Team[] = [
  { id: 90611, name: "A", divisionId: "12" },
  { id: 162063, name: "B", divisionId: "874" },
  { id: 185788, name: "C", divisionId: "885" },
  { id: 107121, name: "F1", divisionId: "801" },
  { id: 184677, name: "F2", divisionId: "802" },
];

export async function POST() {
  console.log("POST request received");
  await initiateCache();
  for (const team of teams) {
    const testData: TeamInformation = {
      season,
      clubId,
      teamId: team.id,
      teamName: team.name,
      divisionId: team.divisionId,
    };
    console.debug(`Loading data for team ${team.name}`);
    await loadFixtures(testData);
    console.debug(`Loaded data for team ${team.name}`);
  }
  return NextResponse.json({ status: 200, body: "Data loaded" });
}
