import { Block } from "payload/types";
import link from "../fields/link";

export const MenuLink: Block = {
  slug: "menu-link",
  labels: {
    singular: "Menu Link",
    plural: "Menu Links",
  },
  fields: [
    link({
      appearances: false,
      enableDescription: true,
    }),
  ],
};
