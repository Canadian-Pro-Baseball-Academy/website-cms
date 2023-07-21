import { GlobalConfig } from "payload/types";
import { admins } from "../access/admins";
import { anyone } from "../access/anyone";
import link from "../fields/link";
import { MenuHighlight } from "../blocks/MenuHighlight";
import { MenuLink } from "../blocks/MenuLink";
import { MenuColumn } from "../blocks/MenuColumn";
import { richText } from "../fields/richText";

export const Header: GlobalConfig = {
  slug: "header",
  admin: {
    group: "Config",
  },
  access: {
    read: anyone,
    update: admins,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Top Bar",
          name: "topBar",
          fields: [
            richText({
              admin: {
                elements: [],
                leaves: ["bold", "underline", "italic"],
              },
            }),
          ],
        },
        {
          label: "Main Menu",
          name: "mainMenu",
          fields: [
            {
              name: "items",
              type: "array",
              maxRows: 6,
              fields: [
                {
                  name: "type",
                  type: "radio",
                  defaultValue: "single",
                  options: [
                    {
                      label: "Single Link",
                      value: "single",
                    },
                    {
                      label: "Dropdown Menu",
                      value: "dropdown",
                    },
                  ],
                },
                {
                  name: "label",
                  type: "text",
                  required: true,
                },
                link({
                  appearances: false,
                  disableLabel: true,
                  overrides: {
                    admin: {
                      condition: (_, siblingData) =>
                        siblingData?.type === "single",
                    },
                  },
                }),
                {
                  name: "menu",
                  type: "group",
                  label: false,
                  fields: [
                    {
                      name: "blocks",
                      labels: {
                        singular: "Menu Block",
                        plural: "Menu Blocks",
                      },
                      type: "blocks",
                      blocks: [MenuHighlight, MenuLink, MenuColumn],
                    },
                  ],
                  admin: {
                    condition: (_, siblingData) =>
                      siblingData?.type === "dropdown",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
