import { Block } from "payload/types";
import { blockFields } from "../fields/blockFields";
import { richText } from "../fields/richText";
import linkGroup from "../fields/linkGroup";
import { backgroundColor } from "../fields/backgroundColor";

export const CallToAction: Block = {
  slug: "cta",
  labels: {
    singular: "Call to Action",
    plural: "Call to Actions",
  },
  fields: [
    backgroundColor({ overrides: { name: "ctaBackgroundColor" } }),
    blockFields({
      name: "ctaFields",
      fields: [
        richText(),
        linkGroup({
          overrides: {
            maxRows: 2,
          },
        }),
      ],
    }),
  ],
};
