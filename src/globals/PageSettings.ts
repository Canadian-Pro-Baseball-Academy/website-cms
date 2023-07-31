import { GlobalConfig } from "payload/types";
import { anyone } from "../access/anyone";
import { editors } from "../access/editors";
import { hero } from "../fields/hero";
import { revalidatePage } from "../hooks/revalidatePage";

export const PageSettings: GlobalConfig = {
  slug: "page-settings",
  admin: {
    group: "Config",
  },
  access: {
    read: anyone,
    update: editors,
  },
  hooks: {
    afterChange: [revalidatePage],
  },
  fields: [
    {
      label: "Pages",
      type: "tabs",
      tabs: [
        {
          name: "coachingStaff",
          label: "Coaching Staff",
          fields: [
            hero({ disableLabel: false }),
            {
              name: "coaches",
              type: "group",
              fields: [
                {
                  name: "mainCoaches",
                  label: "Main Coaches",
                  type: "relationship",
                  hasMany: true,
                  relationTo: "coaches",
                  admin: {
                    description:
                      "Select the important coaches that we would like to highlight. Note: order matters, the order that you select the coaches in will determine the order they show up on the page",
                  },
                },
                {
                  name: "subsidaryCoaches",
                  label: "Subsidary Coaches",
                  type: "relationship",
                  hasMany: true,
                  relationTo: "coaches",
                  admin: {
                    description:
                      "Select any other coach that we would like to highlight. Note: Only there name and organizational role will be displayed",
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
