import { CollectionConfig } from "payload/types";
import BeforeTeams from "../components/BeforeTeams";

const PlayerFields: CollectionConfig["fields"] = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    required: true,
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    required: true,
  },
  {
    name: "number",
    label: "Number",
    type: "text",
  },
  {
    name: "positions",
    label: "Positions",
    type: "select",
    hasMany: true,
    options: [
      {
        label: "Pitcher",
        value: "pitcher",
      },
      {
        label: "Catcher",
        value: "catcher",
      },
      {
        label: "First Base",
        value: "firstBase",
      },
      {
        label: "Second Base",
        value: "secondBase",
      },
      {
        label: "Third Base",
        value: "thirdBase",
      },
      {
        label: "Shortstop",
        value: "shortstop",
      },
      {
        label: "Middle Infield",
        value: "middleInfield",
      },
      {
        label: "Corner Infield",
        value: "cornerInfield",
      },
      {
        label: "Infield",
        value: "infield",
      },
      {
        label: "Outfield",
        value: "outfield",
      },
      {
        label: "Utility",
        value: "utility",
      },
    ],
  },
  {
    name: "homeTown",
    label: "Home Town",
    type: "text",
  },
];

export const Teams: CollectionConfig = {
  slug: "teams",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "_status", "updatedAt", "createdAt"],
    group: "Content",
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "coaches",
      type: "relationship",
      relationTo: "coaches",
      hasMany: true,
    },
    {
      name: "teamPhoto",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Team photo. Should be a landscape image.",
      },
    },
    {
      name: "teamsnapId",
      type: "text",
      required: true,
      admin: {
        components: {
          Field: () => null,
        },
      },
    },
    {
      name: "roster",
      type: "array",
      fields: PlayerFields,
      admin: {
        components: {
          RowLabel: ({ data }) => {
            const { firstName, lastName, number, homeTown, positions } = data;
            const baseName = `${
              number ? `#${number} ` : ""
            }${firstName} ${lastName}`;

            let missingObjects = [];
            if (!number) missingObjects.push("Number");
            if (!homeTown) missingObjects.push("Home Town");
            if (positions.length === 0) missingObjects.push("Positions");

            return (
              baseName +
              (missingObjects.length > 0
                ? ` — Missing Value(s): ${missingObjects.join(", ")}`
                : "")
            );
          },
        },
      },
    },
  ],
};
