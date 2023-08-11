import { Block } from "payload/types";
import { blockFields } from "../fields/blockFields";
import { richText } from "../fields/richText";
import { Map } from "./Map";
import Content from "./Content";
import { GalleryImages } from "./GalleryImages";
import { backgroundColor } from "../fields/backgroundColor";

export const ContentGrid: Block = {
  slug: "contentGrid",
  fields: [
    backgroundColor({ overrides: { name: "contentGridBackgroundColor" } }),
    blockFields({
      name: "contentGridFields",
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
          name: "alignment",
          label: "Cell Alignment",
          type: "select",
          defaultValue: "start",
          required: true,
          options: [
            {
              label: "Start",
              value: "start",
            },
            {
              label: "Center",
              value: "center",
            },
            {
              label: "End",
              value: "end",
            },
          ],
        },
        {
          name: "columns",
          type: "array",
          minRows: 1,
          labels: {
            singular: "Cell",
            plural: "Cells",
          },
          fields: [
            {
              name: "width",
              label: "Cell Width",
              type: "select",
              defaultValue: "full",
              required: true,
              options: [
                {
                  label: "One Third",
                  value: "oneThird",
                },
                {
                  label: "Half",
                  value: "half",
                },
                {
                  label: "Two Thirds",
                  value: "twoThirds",
                },
                {
                  label: "Full Width",
                  value: "full",
                },
              ],
            },
            {
              type: "blocks",
              name: "content",
              maxRows: 1,
              blocks: [
                Content({
                  displayWidth: false,
                  displayAlignment: false,
                  hasBackgroundColor: false,
                  singleColumn: true,
                }),
                GalleryImages({ hasBackgroundColor: false }),
                Map({ hasBackgroundColor: false }),
              ],
            },
          ],
        },
      ],
    }),
  ],
};
