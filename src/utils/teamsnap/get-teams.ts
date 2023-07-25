import payload from "payload";
import { AGES } from "./utils";
import { getRosterById } from "./get-rosters";
import { getTeamData } from "./get-team-data";

export interface iTeamsAPI {
  [key: string]: {
    teams: {
      id: number;
      name: string;
      webcal: string;
      roster?: any;
    }[];
  };
}

export async function getTeams(): Promise<iTeamsAPI> {
  try {
    // Step 1: Get self
    const self = await fetch("https://api.teamsnap.com/v3/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PAYLOAD_PUBLIC_TEAMSNAP_AUTH_TOKEN}`,
      },
    });

    const selfData = await self.json();

    // Step 2: Get League
    const leaguesObject = selfData.collection.items[0].links.find(
      (link: any) => link.rel === "divisions"
    );

    const leagues = await fetch(leaguesObject.href, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PAYLOAD_PUBLIC_TEAMSNAP_AUTH_TOKEN}`,
      },
    });

    const leaguesData = await leagues.json();

    const leagueObject = leaguesData.collection.items.find((item: any) =>
      item.data.find(
        (data: any) =>
          data.name === "name" &&
          data.value.trim().toLowerCase() ===
            "Canadian Pro Baseball Academy".trim().toLowerCase()
      )
    );

    // Step 3: Get Divisions / Age Groups
    const ageGroupObject = leagueObject.links.find(
      (link: any) => link.rel === "children"
    );

    const ageGroup = await fetch(ageGroupObject.href, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PAYLOAD_PUBLIC_TEAMSNAP_AUTH_TOKEN}`,
      },
    });

    const ageGroupData = await ageGroup.json();

    const selectedAgeGroups = ageGroupData.collection.items.filter(
      (item: any) => {
        const age = item.data.find((data: any) => data.name === "name");
        return AGES.includes(age.value);
      }
    );
    // Step 4: Get Teams
    const map = await Promise.all(
      selectedAgeGroups.map(async (ageGroup: any) => {
        const name = ageGroup.data.find((data: any) => data.name === "name");

        const teamObject = ageGroup.links.find(
          (link: any) => link.rel === "active_teams"
        );

        const teams = await fetch(teamObject.href, {
          headers: {
            Authorization: `Bearer ${process.env.PAYLOAD_PUBLIC_TEAMSNAP_AUTH_TOKEN}`,
          },
        });

        const json = await teams.json();

        const teamsObject = await Promise.all(
          json.collection.items.map(async (item: any) => {
            const teamName = item.data.find(
              (data: any) => data.name === "name"
            );
            const teamId = item.data.find((data: any) => data.name === "id");

            const rosters = await getRosterById(teamId.value);
            const teamData = await getTeamData(teamId.value);

            return {
              id: teamId.value,
              name: teamName.value,
              webcal: teamData.links.webCal,
              roster: rosters,
            };
          })
        );

        return {
          name: name.value,
          teams: teamsObject,
        };
      })
    );

    // Step 5: Filter and Return Teams
    const ages = map.reduce((acc, obj) => {
      acc[obj.name] = {
        teams: obj.teams,
      };
      return acc;
    }, {});

    return ages;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
}
