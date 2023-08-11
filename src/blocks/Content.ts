import { Block, Field } from "payload/types";
import linkGroup from "../fields/linkGroup";
import Video from "../fields/richText/video";
import HR from "../fields/richText/hr";
import { richText } from "../fields/richText";
import { blockFields } from "../fields/blockFields";
import { backgroundColor } from "../fields/backgroundColor";

type ContentType = (options?: {
  displayWidth?: boolean;
  displayAlignment?: boolean;
  hasBackgroundColor?: boolean;
  singleColumn?: boolean;
}) => Block;

const Content: ContentType = ({
  displayWidth = true,
  displayAlignment = true,
  hasBackgroundColor = true,
  singleColumn = false,
} = {}) => {
  let widthField: Field = {
    name: "width",
    label: "Column Width",
    type: "select",
    defaultValue: "full",
    required: true,
    options: [
      {
        label: "One Third",
        value: "oneThird",
      },
      {
        label: "Half",
        value: "half",
      },
      {
        label: "Two Thirds",
        value: "twoThirds",
      },
      {
        label: "Full Width",
        value: "full",
      },
    ],
  };

  let alignmentField: Field = {
    name: "alignment",
    label: "Alignment",
    type: "select",
    defaultValue: "left",
    required: true,
    options: [
      {
        label: "Left",
        value: "left",
      },
      {
        label: "Center",
        value: "center",
      },
      {
        label: "Right",
        value: "right",
      },
    ],
  };

  let contentFields: Field[] = [
    richText(
      {},
      {
        elements: ["indent", "relationship", Video, HR],
      }
    ),
    linkGroup({
      overrides: {
        maxRows: 10,
      },
    }),
  ];

  if (displayWidth) {
    contentFields = [widthField, ...contentFields];
  }

  if (displayAlignment) {
    contentFields = [alignmentField, ...contentFields];
  }

  let singleColumnFields: Field = {
    name: "singleColumn",
    label: false,
    admin: {
      hideGutter: true,
    },
    type: "group",
    fields: contentFields,
    hidden: !singleColumn,
  };

  let comlumnFields: Field = {
    name: "columns",
    type: "array",
    labels: {
      singular: "Column",
      plural: "Columns",
    },
    fields: contentFields,
    hidden: singleColumn,
  };

  let fields: Field[] = [
    blockFields({
      name: "contentFields",
      fields: [comlumnFields, singleColumnFields],
    }),
  ];

  if (hasBackgroundColor) {
    fields = [
      backgroundColor({ overrides: { name: "contentBackgroundColor" } }),
      ...fields,
    ];
  }

  let Content: Block = {
    slug: "content",
    labels: {
      singular: "Content",
      plural: "Content Blocks",
    },
    fields: fields,
  };

  return Content;
};

export default Content;
