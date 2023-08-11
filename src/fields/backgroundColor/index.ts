import { Field, SelectField } from "payload/types";
import deepMerge from "../../utils/deep-merge";
import { InputField } from "./InputField";

type Args = {
  overrides?: Partial<SelectField>;
};

export const backgroundColor = ({ overrides }: Args = {}): Field =>
  deepMerge(
    {
      name: "backgroundColor",
      label: "Background Color",
      type: "select",
      defaultValue: "white",
      options: [
        { label: "White", value: "white" },
        { label: "Primary", value: "primary" },
        { label: "Dark", value: "shaded" },
        { label: "Secondary", value: "secondary" },
        { label: "Muted", value: "muted" },
      ],
      admin: {
        components: {
          Field: InputField,
        },
      },
    },
    overrides
  );
