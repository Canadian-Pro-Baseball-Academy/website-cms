import { CollectionConfig } from "payload/types";
import { hero } from "../fields/hero";
import { GalleryImages } from "../blocks/GalleryImages";
import { GallerySlider } from "../blocks/GallerySlider";
import { slug } from "../fields/slug";
import { anyone } from "../access/anyone";

export const PageSettings: CollectionConfig = {
  slug: "page-settings",
  admin: {
    useAsTitle: "title",
    group: "Config",
  },
  access: {
    read: anyone,
  },
  versions: {
    drafts: true,
    maxPerDoc: 10,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [hero()],
        },
        {
          label: "Content",
          fields: [
            {
              name: "gallery",
              label: false,
              type: "group",
              admin: {
                condition: (_, { type } = {}) => type === "gallery",
              },
              fields: [
                {
                  name: "gallery",
                  labels: {
                    singular: "Gallery Block",
                    plural: "Gallery Blocks",
                  },
                  type: "blocks",
                  blocks: [GallerySlider(), GalleryImages()],
                },
              ],
            },
            {
              name: "coachingStaff",
              label: false,
              type: "group",
              admin: {
                condition: (_, { type } = {}) => type === "coaching-staff",
              },
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
            {
              name: "news",
              label: false,
              type: "group",
              admin: {
                condition: (_, { type } = {}) => type === "news",
              },
              fields: [
                {
                  type: "text",
                  name: "test",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "select",
      name: "type",
      label: "Type",
      required: true,
      defaultValue: "gallery",
      admin: {
        position: "sidebar",
      },
      options: [
        { value: "gallery", label: "Gallery" },
        { value: "coaching-staff", label: "Coaching Staff" },
        { value: "news", label: "News" },
      ],
    },
    {
      name: "title",
      type: "text",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    slug(),
  ],
};
