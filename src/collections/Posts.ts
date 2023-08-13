import { CollectionConfig } from "payload/types";
import { formatPreviewURL } from "../utils/format-preview";
import { anyone } from "../access/anyone";
import { revalidatePage } from "../hooks/revalidatePage";
import { slug } from "../fields/slug";
import { Media } from "../blocks/Media";
import Content from "../blocks/Content";
import { richText } from "../fields/richText";
import { BlogContent } from "../blocks/BlogContent";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
    preview: (doc) => formatPreviewURL("pages", doc),
    group: "Content",
  },
  versions: {
    drafts: true,
  },
  access: {
    read: anyone,
  },
  hooks: {
    afterChange: [revalidatePage],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
            },
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              required: true,
            },
            richText({
              name: "excerpt",
            }),
            {
              name: "content",
              type: "blocks",
              blocks: [BlogContent, Media({ hasBackgroundColor: false })],
              required: true,
            },
            {
              name: "relatedPosts",
              type: "relationship",
              relationTo: "posts",
              hasMany: true,
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                };
              },
            },
          ],
        },
      ],
    },
    slug(),
    {
      name: "authors",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "publishedOn",
      type: "date",
      required: true,
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
        position: "sidebar",
      },
    },
  ],
};
