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
      name: "aspectRatio",
      type: "select",
      options: [
        {
          label:
            "16:9 - Widescreen look, often used for big images and video previews.",
          value: "1.7778",
        },
        {
          label:
            "4:3 - Balanced and versatile, great for galleries and slideshows.",
          value: "1.3333",
        },
        {
          label:
            "3:2 - Standard for many cameras, commonly used for product images.",
          value: "1.5",
        },
        {
          label:
            "1:1 - Perfectly square, used for profile pictures and social media icons.",
          value: "1",
        },
        {
          label:
            "5:4 - A bit taller, sometimes seen in banners or specific content.",
          value: "1.25",
        },
        {
          label: "3:1 - Extra-wide for panoramic images or special sections.",
          value: "3",
        },
        {
          label: "2:3 - Taller format, suitable for portrait-oriented images.",
          value: "0.6667",
        },
        {
          label:
            "9:16 - Vertical look, used for mobile-friendly video thumbnails.",
          value: "0.5625",
        },
        {
          label:
            "21:9 - Uncommon but used for special design elements or wide content.",
          value: "2.3333",
        },
      ],
    },
    {
      name: "blurURL",
      type: "textarea",
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
