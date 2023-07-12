import { RichTextElement } from "payload/dist/fields/config/types";
import richTextKicker from "./kicker";
import richTextLargeBody from "./largeBody";

const defaultElements: RichTextElement[] = [
  "blockquote",
  "h2",
  "h3",
  "h4",
  richTextKicker,
  richTextLargeBody,
  "ul",
  "ol",
  "link",
  "upload",
];

export default defaultElements;
