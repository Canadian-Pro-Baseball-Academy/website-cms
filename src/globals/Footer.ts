import { GlobalConfig } from "payload/types";
import { anyone } from "../access/anyone";
import { admins } from "../access/admins";
import link from "../fields/link";

export const Footer: GlobalConfig = {
  slug: "footer",
  access: {
    read: anyone,
    update: admins,
  },
  fields: [
    {
      name: "socialLinks",
      type: "group",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "facebook",
              type: "text",
            },
            {
              name: "instagram",
              type: "text",
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "twitter",
              type: "text",
            },
            {
              name: "github",
              type: "text",
            },
          ],
        },
      ],
    },
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
