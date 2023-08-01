import { Block } from "payload/types";
import { blockFields } from "../fields/blockFields";
import { richText } from "../fields/richText";

export const GallerySlider: Block = {
  slug: "gallery-slider",
  fields: [
    blockFields({
      name: "sliderFields",
      fields: [
        {
          name: "useLeadingHeader",
          label: "Use Leading Header",
          type: "checkbox",
        },
        richText({
          name: "leadingHeader",
          label: "Leading Header",
          admin: {
            condition: (_, siblingData) => siblingData.useLeadingHeader,
          },
        }),
        {
          type: "array",
          name: "slides",
          required: true,
          minRows: 3,
          fields: [
            {
              type: "upload",
              name: "image",
              relationTo: "media",
              required: true,
            },
          ],
        },
      ],
    }),
  ],
};
