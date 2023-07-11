import { GlobalConfig } from "payload/types";
import { admins } from "../access/admins";
import { anyone } from "../access/anyone";
import link from "../fields/link";

export const MainMenu: GlobalConfig = {
  slug: "main-menu",
  access: {
    read: anyone,
    update: admins,
  },
  fields: [
    {
      name: "right",
      label: "Right Side Menu",
      labels: {
        singular: "Right Side Menu Item",
        plural: "Right Side Menu Items",
      },
      type: "array",
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: "type",
          label: "Is this a single link? Or a dropdown?",
          type: "radio",
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
          defaultValue: "single",
        },
        link({
          appearances: false,
          overrides: {
            admin: {
              condition: (_, siblingData) => siblingData?.type === "single",
            },
          },
        }),
        {
          name: "dropdownItems",
          type: "array",
          fields: [
            link({
              appearances: false,
              enableDescription: true,
            }),
          ],
          admin: {
            condition: (_, siblingData) => siblingData?.type === "dropdown",
            components: {
              RowLabel: ({ data }) => {
                return data?.link.label;
              },
            },
          },
        },
      ],
    },
    {
      name: "left",
      label: "Left Side Menu",
      labels: {
        singular: "Left Side Menu Item",
        plural: "Left Side Menu Items",
      },
      type: "array",
      maxRows: 3,
      fields: [
        link({
          appearances: ["primary", "secondary", "outline", "ghost", "link"],
        }),
      ],
    },
  ],
};
