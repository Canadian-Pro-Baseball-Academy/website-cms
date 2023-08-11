import { Block, Field } from "payload/types";
import { blockFields } from "../fields/blockFields";
import { richText } from "../fields/richText";
import { backgroundColor } from "../fields/backgroundColor";

type GalleryImagesType = (options?: { hasBackgroundColor?: boolean }) => Block;

export const GalleryImages: GalleryImagesType = ({
  hasBackgroundColor = true,
} = {}) => {
  let baseFields: Field[] = [
    blockFields({
      name: "imagesFields",
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
          name: "columns",
          label: "Number of columns",
          type: "select",
          options: [
            { label: "One Column", value: "1" },
            { label: "Two Columns", value: "2" },
            { label: "Three Columns", value: "3" },
            { label: "Four Columns", value: "4" },
            { label: "Five Columns", value: "5" },
          ],
        },
        {
          type: "relationship",
          name: "images",
          required: true,
          minRows: 1,
          hasMany: true,
          relationTo: "media",
        },
      ],
    }),
  ];

  if (hasBackgroundColor) {
    baseFields = [backgroundColor(), ...baseFields];
  }

  return {
    slug: "gallery-images",
    labels: {
      singular: "Gallery Images",
      plural: "Gallery Images",
    },
    fields: baseFields,
  };
};
