import { Block } from "payload/types";
import link from "../fields/link";

export const MenuHighlight: Block = {
  slug: "menu-highlight",
  labels: {
    plural: "Menu Highlights",
    singular: "Menu Highlight",
  },
  fields: [
    {
      name: "menuHighlightMedia",
      type: "upload",
      relationTo: "media",
      admin: {
        description:
          "Maximum upload file size: 2MB. Recommended file size for images is <500KB.",
      },
    },
    link({
      appearances: false,
      enableDescription: true,
    }),
  ],
};
