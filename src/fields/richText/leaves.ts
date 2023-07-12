import { RichTextLeaf } from "payload/dist/fields/config/types";
import richTextHightlight from "./highlight";
import highlight from "./highlight";

const defaultLeaves: RichTextLeaf[] = [
  "bold",
  "italic",
  "underline",
  highlight,
];

export default defaultLeaves;
