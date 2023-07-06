import type { Field } from "payload/types";

export const hero: Field = {
  name: "hero",
  label: false,
  type: "group",
  fields: [
    {
      name: "previewTest",
      label: "Preview Test",
      type: "text",
    },
  ],
};
