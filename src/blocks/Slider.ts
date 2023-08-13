import { Block, Field } from "payload/types";
import { blockFields } from "../fields/blockFields";
import { richText } from "../fields/richText";
import { backgroundColor } from "../fields/backgroundColor";
import richTextKicker from "../fields/richText/kicker";
import richTextLargeBody from "../fields/richText/largeBody";
import highlight from "../fields/richText/highlight";

type SliderType = (options?: { hasBackgroundColor?: boolean }) => Block;

export const Slider: SliderType = ({ hasBackgroundColor = true } = {}) => {
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
          type: "select",
          name: "sliderType",
          required: true,
          options: [
            {
              label: "Content Slider",
              value: "contentSlider",
            },
            {
              label: "Image Slider",
              value: "imageSlider",
            },
            {
              label: "Relationship Slider",
              value: "relationshipSlider",
            },
          ],
        },
        {
          name: "imageSlides",
          type: "array",
          required: true,
          minRows: 3,
          admin: {
            description:
              "For the best results, use images that the same aspect ratio.",
            condition: (_, siblingData) =>
              siblingData.sliderType === "imageSlider",
          },
          fields: [
            {
              type: "upload",
              name: "image",
              relationTo: "media",
              required: true,
            },
          ],
        },
        {
          name: "contentSlides",
          type: "array",
          required: true,
          minRows: 3,
          admin: {
            condition: (_, siblingData) =>
              siblingData.sliderType === "contentSlider",
          },
          fields: [
            richText({
              name: "richText",
              required: true,
              admin: {
                description:
                  "Please keep the content to a single sentence - no more than 25 words - if possible.",
                elements: [],
                leaves: ["bold", "italic", "underline", highlight],
              },
            }),
            {
              type: "checkbox",
              name: "isQuote",
              defaultValue: false,
            },
            {
              type: "date",
              name: "quoteDate",
              required: true,
              admin: {
                condition: (_, siblingData) => siblingData.isQuote,
              },
            },
          ],
        },
        {
          name: "relationshipSlides",
          type: "relationship",
          hasMany: true,
          relationTo: ["pages", "pageSettings", "coaches", "teams"],
          required: true,
          minRows: 3,
          admin: {
            condition: (_, siblingData) =>
              siblingData.sliderType === "relationshipSlider",
          },
        },
      ],
    }),
  ];

  if (hasBackgroundColor) {
    baseFields = [
      backgroundColor({ overrides: { name: "sliderBackgroundColor" } }),
      ...baseFields,
    ];
  }

  return {
    slug: "slider",
    labels: {
      singular: "Slider",
      plural: "Sliders",
    },
    fields: baseFields,
  };
};
