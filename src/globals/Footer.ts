import { GlobalConfig } from "payload/types";
import { anyone } from "../access/anyone";
import { admins } from "../access/admins";
import link from "../fields/link";
import { richText } from "../fields/richText";

export const Footer: GlobalConfig = {
  slug: "footer",
  admin: {
    group: "Config",
  },
  access: {
    read: anyone,
    update: admins,
  },
  versions: {
    drafts: true,
    max: 10,
  },
  fields: [
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    richText({
      name: "summary",
      label: "Program Summary",
      admin: {
        description:
          "This is the summary that appears in the footer. It should be a short paragraph (<100 characters).",
        elements: ["h1"],
        leaves: [],
      },
    }),
    {
      name: "columns",
      type: "array",
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: "label",
          type: "text",
        },
        {
          name: "navItems",
          type: "array",
          fields: [
            link({
              appearances: false,
            }),
          ],
          admin: {
            components: {
              RowLabel: ({ data }) => {
                return data?.link.label;
              },
            },
          },
        },
      ],
      admin: {
        components: {
          RowLabel: ({ data }) => {
            return data?.label;
          },
        },
      },
    },
  ],
};
