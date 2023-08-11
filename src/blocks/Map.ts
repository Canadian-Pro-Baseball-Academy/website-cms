import { Block, Field } from "payload/types";
import { map } from "../fields/map";
import { blockFields } from "../fields/blockFields";
import { backgroundColor } from "../fields/backgroundColor";

type MapType = (options?: { hasBackgroundColor?: boolean }) => Block;

export const Map: MapType = ({ hasBackgroundColor = true } = {}) => {
  let baseFields: Field[] = [
    blockFields({
      name: "mapFields",
      fields: [
        map(),
        {
          type: "group",
          name: "options",
          label: "Options",
          admin: {
            description:
              "1 is the furthest out (shows the entire globe), 15 is the closest in (shows a few city blocks). Note: 9 is the default zoom level of the map above. And 14 is recommended",
          },
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "zoom",
                  label: "Zoom Level",
                  type: "number",
                  required: true,
                  defaultValue: 7,
                  min: 1,
                  max: 15,
                  admin: {
                    width: "50%",
                  },
                },
                {
                  name: "animation",
                  type: "radio",
                  defaultValue: "none",
                  required: true,
                  options: [
                    { value: "none", label: "None" },
                    { value: "rotate", label: "Rotate" },
                  ],
                  admin: {
                    width: "50%",
                  },
                },
              ],
            },
          ],
        },
      ],
    }),
  ];

  if (hasBackgroundColor) {
    baseFields = [
      backgroundColor({ overrides: { name: "mapBackgroundColor" } }),
      ...baseFields,
    ];
  }

  return {
    slug: "map",
    fields: baseFields,
  };
};
