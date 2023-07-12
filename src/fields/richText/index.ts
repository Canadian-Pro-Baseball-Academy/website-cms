import {
  RichTextElement,
  RichTextLeaf,
} from "payload/dist/fields/config/types";
import { RichTextField } from "payload/types";
import deepMerge from "../../utils/deep-merge";
import defaultElements from "./elements";
import defaultLeaves from "./leaves";
import link from "../link";

type RichText = (
  overrides?: Partial<RichTextField>,
  additions?: {
    elements?: RichTextElement[];
    leaves?: RichTextLeaf[];
  }
) => RichTextField;

export const richText: RichText = (
  overrides,
  additions = {
    elements: [],
    leaves: [],
  }
) =>
  deepMerge<RichTextField, Partial<RichTextField>>(
    {
      name: "richText",
      type: "richText",
      admin: {
        upload: {
          collections: {
            media: {
              fields: [
                {
                  name: "enableLink",
                  type: "checkbox",
                  label: "Enable Link",
                },
                link({
                  appearances: false,
                  disableLabel: true,
                  overrides: {
                    admin: {
                      condition: (_, data) => Boolean(data?.enableLink),
                    },
                  },
                }),
              ],
            },
          },
        },
        elements: [...defaultElements, ...(additions.elements || [])],
        leaves: [...defaultLeaves, ...(additions.leaves || [])],
      },
    },
    overrides
  );
