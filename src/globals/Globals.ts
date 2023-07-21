import { GlobalConfig } from "payload/types";
import { anyone } from "../access/anyone";
import { admins } from "../access/admins";

export const Globals: GlobalConfig = {
  slug: "site-settings",
  label: "Globals",
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
          label: "Social Media",
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
          ],
        },
        {
          label: "Contact Info",
          fields: [
            {
              name: "streetAddress",
              type: "text",
            },
            {
              type: "row",
              fields: [
                {
                  name: "city",
                  type: "text",
                },
                {
                  name: "province",
                  type: "text",
                  maxLength: 2,
                },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "postalCode",
                  type: "text",
                },
                {
                  name: "country",
                  type: "text",
                  maxLength: 2,
                },
              ],
            },
            {
              name: "email",
              type: "text",
            },
            {
              name: "phoneNumber",
              type: "text",
            },
          ],
        },
      ],
    },
  ],
};
