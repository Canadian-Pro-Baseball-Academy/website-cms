import type { Field, GroupField } from "payload/types";
import deepMerge from "../utils/deep-merge";
import { backgroundColor } from "./backgroundColor";

interface Args {
  name: string;
  fields: Field[];
  overrides?: Partial<GroupField>;
}

export const blockFields = ({ name, fields, overrides }: Args): Field => {
  return deepMerge(
    {
      name,
      label: false,
      type: "group",
      admin: {
        hideGutter: true,
        style: {
          margin: 0,
          padding: 0,
        },
      },
      fields: fields,
    },
    overrides
  );
};
