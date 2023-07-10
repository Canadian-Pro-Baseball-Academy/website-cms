import { CollectionConfig } from "payload/types";
import path from "path";
import { anyone } from "../access/anyone";
import { admins } from "../access/admins";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    group: "Content",
  },
  upload: {
    staticDir: path.resolve(__dirname, "../../media"),
  },
  access: {
    read: anyone,
    create: admins,
    update: admins,
    delete: admins,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
    {
      name: "darkModeFallback",
      type: "upload",
      relationTo: "media",
      admin: {
        description:
          "**Optional** Choose an upload to render if the visitor is using dark mode.",
      },
    },
  ],
};
