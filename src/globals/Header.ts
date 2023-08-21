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
  versions: {
    drafts: true,
    max: 10,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Top Bar",
          name: "topBar",
          fields: [
            {
              type: "group",
              name: "announcement",
              label: "Announcement",
              admin: {
                description:
                  "This will appear at the top of the page. Make two versions, one for desktop and one for mobile, and the correct one will be shown depending on the screen size.",
              },
              fields: [
                richText({
                  name: "desktop",
                  label: "Desktop Version",
                  admin: {
                    elements: ["link"],
                    leaves: ["bold", "underline", "italic"],
                  },
                }),
                richText({
                  name: "mobile",
                  label: "Mobile Version",
                  admin: {
                    elements: ["link"],
                    leaves: ["bold", "underline", "italic"],
                  },
                }),
              ],
            },
          ],
        },
        {
          label: "Main Menu",
          name: "mainMenu",
          fields: [
            {
              name: "items",
              type: "array",
              required: true,
              minRows: 1,
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
