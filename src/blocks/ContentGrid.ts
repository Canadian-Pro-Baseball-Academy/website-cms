import { Block } from "payload/types";
import { blockFields } from "../fields/blockFields";
import { richText } from "../fields/richText";
import { Map } from "./Map";
import Content from "./Content";

export const ContentGrid: Block = {
  slug: "content-grid",
  fields: [
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
          name: "columns",
          type: "array",
          minRows: 1,
          labels: {
            singular: "Column",
            plural: "Columns",
          },
          fields: [
            {
              name: "width",
              label: "Column Width",
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
              blocks: [Map, Content],
            },
          ],
        },
      ],
    }),
  ],
};
