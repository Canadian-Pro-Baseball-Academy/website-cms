import { Field, SelectField } from "payload/types";
import deepMerge from "../utils/deep-merge";

type AspectRatioType = (options?: {
  overrides?: Partial<SelectField>;
}) => Field;

export const aspectRatio: AspectRatioType = ({ overrides } = {}) => {
  const aspectRatioField: Field = {
    name: "aspectRatio",
    type: "select",
    defaultValue: "1.7778",
    options: [
      {
        label:
          "16:9 - Widescreen look, often used for big images and video previews.",
        value: "1.7778",
      },
      {
        label:
          "4:3 - Balanced and versatile, great for galleries and slideshows.",
        value: "1.3333",
      },
      {
        label:
          "3:2 - Standard for many cameras, commonly used for product images.",
        value: "1.5",
      },
      {
        label:
          "1:1 - Perfectly square, used for profile pictures and social media icons.",
        value: "1",
      },
      {
        label:
          "5:4 - A bit taller, sometimes seen in banners or specific content.",
        value: "1.25",
      },
      {
        label: "3:1 - Extra-wide for panoramic images or special sections.",
        value: "3",
      },
      {
        label: "4:5 - Taller format, suitable for portrait-oriented images.",
        value: "0.8",
      },
    ],
  };

  return deepMerge(aspectRatioField, overrides);
};
