import { CollectionConfig } from "payload/types";
import { richText } from "../fields/richText";
import richTextKicker from "../fields/richText/kicker";
import richTextLargeBody from "../fields/richText/largeBody";
import hr from "../fields/richText/hr";

export const Coaches: CollectionConfig = {
  slug: "coaches",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "updatedAt"],
    group: "Content",
  },
  versions: {
    drafts: true,
    maxPerDoc: 10,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "headshot",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: {
        description: "Headshot of the coach. Should be a square image.",
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Main Information",
          fields: [
            {
              name: "role",
              type: "group",
              fields: [
                {
                  name: "title",
                  label: "Organizational Title",
                  type: "text",
                  admin: {
                    description:
                      "This is the main title that will be displayed on the website. It should be the title of the coach's main/fanciest position at the organization. Ex: General Manger, Head Coach, Coordinator, etc.",
                  },
                },
                {
                  name: "roles",
                  label: "Subsidary Roles",
                  type: "array",
                  labels: {
                    singular: "Role",
                    plural: "Roles",
                  },
                  fields: [
                    {
                      name: "role",
                      type: "text",
                      required: true,
                    },
                  ],
                  admin: {
                    description:
                      "Any subsidary roles this coach performs. There can be more than one allowed. Ex: General Manger, Head Coach, Coordinator, etc.",
                    components: {
                      RowLabel: ({ data }) => {
                        return data.role;
                      },
                    },
                  },
                },
                {
                  name: "joinDate",
                  label: "Join Date",
                  type: "date",
                  admin: {
                    description: "When did this coach join the organization?",
                    date: {
                      pickerAppearance: "monthOnly",
                    },
                  },
                },
              ],
            },
            {
              name: "socials",
              label: "Social Media",
              type: "group",
              fields: [
                {
                  name: "twitter",
                  type: "text",
                },
                {
                  name: "instagram",
                  type: "text",
                },
                {
                  name: "facebook",
                  type: "text",
                },
                {
                  name: "youtube",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          label: "Biography",
          fields: [
            richText({
              name: "biography",
              admin: {
                elements: [
                  "blockquote",
                  "h2",
                  "h3",
                  "h4",
                  richTextKicker,
                  richTextLargeBody,
                  "link",
                  "ol",
                  "ul",
                  hr,
                ],
              },
            }),
            {
              name: "career",
              label: "Career Achievements",
              type: "array",
              labels: {
                singular: "Achievement",
                plural: "Achievements",
              },
              fields: [
                {
                  name: "achievement",
                  type: "text",
                  required: true,
                },
              ],
              admin: {
                description:
                  "Short list of career accomplishments. There can be more than one allowed. Ex: CCBC Champion, Rookie of the Year, All-Stars, Coach of the Year, etc.",
                components: {
                  RowLabel: ({ data }) => {
                    return data.achievement;
                  },
                },
              },
            },
          ],
        },
      ],
    },
  ],
};
