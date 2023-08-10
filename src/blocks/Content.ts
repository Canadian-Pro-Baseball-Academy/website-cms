import { Block, Field } from "payload/types";
import linkGroup from "../fields/linkGroup";
import Video from "../fields/richText/video";
import HR from "../fields/richText/hr";
import { richText } from "../fields/richText";
import { blockFields } from "../fields/blockFields";

type ContentType = (options?: {
  displayWidth?: boolean;
  displayAlignment?: boolean;
  singleColumn?: boolean;
}) => Block;

const Content: ContentType = ({
  displayWidth = true,
  displayAlignment = true,
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
    minRows: 1,
    labels: {
      singular: "Column",
      plural: "Columns",
    },
    fields: contentFields,
    hidden: singleColumn,
  };

  let fields = [comlumnFields, singleColumnFields];

  let Content: Block = {
    slug: "content",
    labels: {
      singular: "Content",
      plural: "Content Blocks",
    },
    fields: [
      blockFields({
        name: "contentFields",
        fields: fields,
      }),
    ],
  };

  return Content;
};

export default Content;
