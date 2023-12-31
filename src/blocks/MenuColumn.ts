import { Block } from "payload/types";
import linkGroup from "../fields/linkGroup";

export const MenuColumn: Block = {
  slug: "menuColumn",
  labels: {
    plural: "Menu Columns",
    singular: "Menu Column",
  },
  fields: [
    {
      name: "name",
      label: "Column Name",
      type: "text",
    },
    linkGroup({
      appearances: false,
    }),
  ],
};
