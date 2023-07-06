import type { Field } from "payload/types";

import formatSlug from "./format-slug";
import deepMerge from "../../utils/deep-merge";

type Slug = (fieldToUse?: string, overrides?: Partial<Field>) => Field;

export const slug: Slug = (fieldToUse = "title", overrides = {}) =>
  deepMerge<Field, Partial<Field>>(
    {
      name: "slug",
      label: "Slug",
      type: "text",
      index: true,
      admin: {
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [formatSlug(fieldToUse)],
      },
    },
    overrides
  );
