export type MatchInfo = {
  allowOilProfileUpdationTillDate: string; // ISO date string
  awayTeamClubId: number;
  currentDate: string; // ISO date string with timezone
  homeTeamClubId: number;
  matchAlleyGroupName: string;
  matchAllot: boolean;
  matchAwayTeamAlias: string;
  matchAwayTeamId: number;
  matchAwayTeamName: string;
  matchAwayTeamResult: number;
  matchAwayTeamScore: number;
  matchCupId: number | null;
  matchDate: string; // ISO date string
  matchDateOld: string; // ISO date string
  matchDateTime: string; // ISO date string
  matchDivisionId: number;
  matchDivisionName: string;
  matchDivisionSeasonAverageFrom: number;
  matchDivisionSeasonAverageTo: number;
  matchDivisionSeasonConfirmed: boolean;
  matchDivisionSeasonHcpNettoOrBrutto: boolean;
  matchDivisionSeasonLanePoints: boolean;
  matchDivisionSeasonMaxHcp: number;
  matchDivisionSeasonNbrOfBonusPoints: number;
  matchDivisionSeasonNbrOfLanePoints: number;
  matchDivisionSeasonPercent: number;
  matchDivisionSeasonProtocolShared: boolean;
  matchDivisionSeasonRankType: string;
  matchFinished: boolean;
  matchFinishedAwayTeam: boolean;
  matchFinishedHomeTeam: boolean;
  matchHallCity: string;
  matchHallId: number;
  matchHallName: string;
  matchHallOnlineScoringUrl: string;
  matchHasBeenPlayed: boolean;
  matchHcp: number;
  matchHcpTypeDescription: string | null;
  matchHcpTypeId: number | null;
  matchHomeTeamAlias: string;
  matchHomeTeamId: number;
  matchHomeTeamName: string;
  matchHomeTeamResult: number;
  matchHomeTeamScore: number;
  matchId: number;
  matchIsInNationalLeague: boolean;
  matchIsUsingLanePoints: boolean;
  matchLeagueId: number;
  matchLeagueName: string;
  matchLeagueSeasonLevelRankType: string;
  matchLevelId: number;
  matchNbrOfLanes: number;
  matchNbrOfPlayers: number;
  matchOilPatternId: number;
  matchOilPatternName: string;
  matchOilProfile: {
    oilPatternId: number;
    oilPatternName: string;
  };
  matchRoundId: number;
  matchSchemeId: string;
  matchSchemeNbrOfLanes: number;
  matchSchemeNbrOfPlayers: number;
  matchSeason: number;
  matchStatus: number;
  matchStrikeOut: boolean;
  matchStrikeOutNbrOfRounds: number;
  matchTime: number;
  matchTimeOld: number;
  matchVsResult: string;
  matchVsTeams: string;
};


