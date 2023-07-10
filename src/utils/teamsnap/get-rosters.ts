import axios from "axios";
import { iTeamsAPI } from "./get-teams";
import { AGES } from "./utils";

export async function getRosterById(id: string) {
  try {
    const response = await axios.get(
      `https://api.teamsnap.com/v3/members/search?team_id=${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.PAYLOAD_PUBLIC_TEAMSNAP_AUTH_TOKEN}`,
        },
      }
    );

    const data = await response.data;

    let roster = data.collection.items.map((item: any) => {
      const firstNameObject = item.data.find(
        (data: any) => data.name === "first_name"
      );
      const lastNameObject = item.data.find(
        (data: any) => data.name === "last_name"
      );
      const homeTownObject = item.data.find(
        (data: any) => data.name === "address_city"
      );
      const homeStateObject = item.data.find(
        (data: any) => data.name === "address_state"
      );
      const isCoachObject = item.data.find(
        (data: any) => data.name === "is_coach"
      );
      const isNonPlayerObject = item.data.find(
        (data: any) => data.name === "is_non_player"
      );
      const numberObject = item.data.find(
        (data: any) => data.name === "jersey_number"
      );
      const positionObject = item.data.find(
        (data: any) => data.name === "position"
      );

      if (isNonPlayerObject.value) return null;

      return {
        firstName: firstNameObject.value as string,
        lastName: lastNameObject.value as string,
        homeTown: homeTownObject.value as string,
        homeState: homeStateObject.value as string,
        number: numberObject.value as string,
        positions: positionObject.value as string,
        isCoach: isCoachObject.value as string,
        isNonPlayer: isNonPlayerObject.value as string,
      };
    });

    roster = roster.filter((n) => n);

    return roster;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.message);
      throw new Error(error.message);
    }
    throw new Error("Internal Server Error");
  }
}
