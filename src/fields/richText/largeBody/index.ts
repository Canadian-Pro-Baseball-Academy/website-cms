import type { RichTextCustomElement } from "payload/types";

import ToolbarButton from "./button";
import withLargeBody from "./plugin";
import LargeBodyElement from "./element";

const richTextLargeBody: RichTextCustomElement = {
  name: "large-body",
  Button: ToolbarButton,
  Element: LargeBodyElement,
  plugins: [withLargeBody],
};

export default richTextLargeBody;
