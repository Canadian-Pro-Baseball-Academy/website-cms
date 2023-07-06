import type { CollectionConfig } from "payload/types";
import { slug } from "../fields/slug";
import { hero } from "../fields/hero";
import { editorsOrPublished } from "../access/editors-published";
import { editors } from "../access/editors";
import { admins } from "../access/admins";
import { formatPreviewURL } from "../utils/format-preview";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
    preview: (doc) => formatPreviewURL("pages", doc),
    group: "Content",
  },
  access: {
    read: editorsOrPublished,
    update: editors,
    create: editors,
    delete: admins,
  },
  versions: {
    drafts: true,
    maxPerDoc: 10,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [hero],
        },
        {
          label: "Content",
          fields: [],
        },
      ],
    },
    slug(),
  ],
};
