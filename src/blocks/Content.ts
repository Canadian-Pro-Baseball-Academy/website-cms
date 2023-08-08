import { Block } from "payload/types";
import linkGroup from "../fields/linkGroup";
import Video from "../fields/richText/video";
import HR from "../fields/richText/hr";
import { richText } from "../fields/richText";
import { blockFields } from "../fields/blockFields";

export const Content: Block = {
  slug: "content",
  labels: {
    singular: "Content",
    plural: "Content Blocks",
  },
  fields: [
    blockFields({
      name: "contentFields",
      fields: [
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
              type: "row",
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
                  admin: {
                    width: "50%",
                  },
                },
                {
                  name: "alignment",
                  label: "Alignment",
                  type: "select",
                  defaultValue: "left",
                  required: true,
                  options: [
                    {
                      label: "Left",
                      value: "left",
                    },
                    {
                      label: "Center",
                      value: "center",
                    },
                    {
                      label: "Right",
                      value: "right",
                    },
                  ],
                  admin: {
                    width: "50%",
                  },
                },
              ],
            },
            richText(
              {},
              {
                elements: ["indent", "relationship", Video, HR],
              }
            ),
            linkGroup({
              overrides: {
                maxRows: 10,
              },
            }),
          ],
        },
      ],
    }),
  ],
};

export default Content;