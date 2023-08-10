import type { Field, GroupField } from "payload/types";
import richTextLargeBody from "./richText/largeBody";
import richTextKicker from "./richText/kicker";
import richTextHightlight from "./richText/highlight";
import linkGroup from "./linkGroup";
import deepMerge from "../utils/deep-merge";

type HeroType = (options?: {
  disableLabel?: boolean;
  overrides?: Partial<GroupField>;
}) => Field;

export const hero: HeroType = (
  { disableLabel, overrides } = { disableLabel: true }
) => {
  const heroFields: Field = {
    name: "hero",
    label: disableLabel ? false : "Hero",
    type: "group",
    fields: [
      {
        type: "select",
        name: "type",
        label: "Type",
        required: true,
        defaultValue: "default",
        options: [
          { label: "Default", value: "default" },
          { label: "Content Media", value: "contentMedia" },
          { label: "Form", value: "form" },
          { label: "Home", value: "home" },
          { label: "Registration", value: "registration" },
        ],
      },
      {
        name: "richText",
        type: "richText",
        admin: {
          elements: ["h1", richTextLargeBody, "ul", richTextKicker],
          leaves: ["underline", richTextHightlight],
        },
      },
      linkGroup({
        overrides: {
          admin: {
            condition: (_, { type } = {}) =>
              ["contentMedia", "default"].includes(type),
          },
        },
      }),
      linkGroup({
        appearances: ["primary", "secondary"],
        overrides: {
          label: "Buttons",
          maxRows: 2,
          admin: {
            condition: (_, { type }) => type === "home",
          },
        },
      }),
      {
        name: "media",
        type: "upload",
        relationTo: "media",
        required: true,
      },
      {
        name: "values",
        type: "array",
        minRows: 3,
        maxRows: 6,
        fields: [
          {
            name: "value",
            type: "text",
            required: true,
          },
        ],
        admin: {
          condition: (_, { type }) => type === "home",
        },
      },
      {
        name: "forms",
        type: "relationship",
        relationTo: "team-snap-forms",
        hasMany: true,
        admin: {
          condition: (_, { type }) => type === "registration",
        },
      },
      {
        name: "previewTest",
        label: "Preview Test",
        type: "text",
      },
    ],
  };

  return deepMerge(heroFields, overrides);
};
