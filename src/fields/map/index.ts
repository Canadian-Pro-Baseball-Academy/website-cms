import { Field, PointField } from "payload/types";
import deepMerge from "../../utils/deep-merge";
import InputField from "./InputField";

type Map = (options?: { overrides?: Partial<PointField> }) => Field;

export const map: Map = ({ overrides } = {}) => {
  const mapFields: Field = {
    name: "map",
    type: "point",
    admin: {
      components: {
        Field: InputField,
      },
    },
  };

  return deepMerge(mapFields, overrides);
};
