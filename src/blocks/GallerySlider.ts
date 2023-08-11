import { Block, Field } from "payload/types";
import { blockFields } from "../fields/blockFields";
import { richText } from "../fields/richText";
import { backgroundColor } from "../fields/backgroundColor";

type GallerySliderType = (options?: { hasBackgroundColor?: boolean }) => Block;

export const GallerySlider: GallerySliderType = ({
  hasBackgroundColor = true,
} = {}) => {
  let baseFields: Field[] = [
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
  ];

  if (hasBackgroundColor) {
    baseFields = [
      backgroundColor({ overrides: { name: "gallerySliderBackgroundColor" } }),
      ...baseFields,
    ];
  }

  return {
    slug: "gallerySlider",
    fields: baseFields,
  };
};
