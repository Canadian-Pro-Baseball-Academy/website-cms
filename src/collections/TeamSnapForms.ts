import { CollectionConfig } from "payload/types";
import { anyone } from "../access/anyone";
import { richText } from "../fields/richText";

export const TeamSnapForms: CollectionConfig = {
  slug: "team-snap-forms",
  admin: {
    useAsTitle: "title",
    group: "Content",
  },
  access: {
    read: anyone,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "teamSnapId",
      type: "text",
      required: true,
    },
    richText({
      name: "description",
      admin: {
        elements: [],
      },
    }),
  ],
};
