import type { CollectionConfig } from "payload/types";
import { slug } from "../fields/slug";
import { hero } from "../fields/hero";
import { editors } from "../access/editors";
import { admins } from "../access/admins";
import { formatPreviewURL } from "../utils/format-preview";
import { anyone } from "../access/anyone";
import { revalidatePage } from "../hooks/revalidatePage";
import { Map } from "../blocks/Map";
import { ContentGrid } from "../blocks/ContentGrid";
import { GalleryImages } from "../blocks/GalleryImages";
import Content from "../blocks/Content";
import { Media } from "../blocks/Media";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
    preview: (doc) => formatPreviewURL("pages", doc),
    group: "Content",
  },
  access: {
    // TODO: Add security to read access
    // read: editorsOrPublished,
    read: anyone,
    update: editors,
    create: editors,
    delete: admins,
  },
  versions: {
    drafts: true,
    maxPerDoc: 10,
  },
  hooks: {
    afterChange: [revalidatePage],
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
              name: "layout",
              label: "Layout",
              type: "blocks",
              minRows: 1,
              localized: true,
              blocks: [Content(), ContentGrid, GalleryImages(), Map(), Media()],
            },
          ],
        },
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
