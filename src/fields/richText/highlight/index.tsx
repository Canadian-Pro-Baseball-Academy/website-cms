import React from "react";
import { LeafButton } from "payload/components/rich-text";
import Icon from "./icon";
import { RichTextLeaf } from "payload/dist/fields/config/types";

const Underline = ({ attributes, children }) => (
  <mark {...attributes}>{children}</mark>
);

const highlight: RichTextLeaf = {
  name: "highlight",
  Button: () => (
    <LeafButton format="highlight">
      <Icon />
    </LeafButton>
  ),
  Leaf: Underline,
};

export default highlight;
