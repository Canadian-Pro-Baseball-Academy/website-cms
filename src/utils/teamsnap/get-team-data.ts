import axios from "axios";
import { iTeamsAPI } from "./get-teams";
import { AGES } from "./utils";

interface ITeamData {
  links: {
    webCal: string;
  };
}

export async function getTeamData(id: string): Promise<ITeamData> {
  try {
    const response = await axios.get(
      `https://api.teamsnap.com/v3/teams/search?id=${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.PAYLOAD_PUBLIC_TEAMSNAP_AUTH_TOKEN}`,
        },
      }
    );

    const data = await response.data;

    const links = data.collection.items[0].links;

    const webCalObject = links.find(
      (link: any) => link.rel === "calendar_webcal_games_only"
    );

    return {
      links: {
        webCal: webCalObject.href as string,
      },
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.message);
      throw new Error(error.message);
    }
    throw new Error("Internal Server Error");
  }
}
