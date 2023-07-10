import { Payload } from "payload";
import { getTeams } from "./get-teams";
import { AGES, cleanPositions } from "./utils";

export const generateTeams = async (payload: Payload) => {
  payload.logger.info("Getting Teams");

  const teams = await getTeams();

  AGES.map((age) => {
    teams[age].teams.map(async (team) => {
      await payload.create({
        collection: "teams",
        draft: true,
        data: {
          name: team.name,
          teamsnapId: team.id.toString(),
          roster: team.roster.map((player: any) => ({
            firstName: player.firstName,
            lastName: player.lastName,
            ...(player.positions && {
              positions: cleanPositions(player.positions),
            }),
            ...(player.number && { number: player.number }),
            ...(player.homeState &&
              player.homeTown && {
                homeTown: `${player.homeTown}, ${player.homeState}`,
              }),
          })),
        },
      });
    });
  });

  // // Draft all current teams
  // await payload.update({
  //   collection: "teams",
  //   where: {
  //     _status: { equals: "published" },
  //   },
  //   data: {
  //     _status: "draft",
  //   },
  // });

  // // Create a new teams
  // await payload.create({
  //   collection: "teams",
  //   draft: true,
  //   data: {
  //     name: "Team 100",
  //     _status: "published",
  //   },
  // });
  payload.logger.info("Done");
};
