import type { RichTextCustomElement } from "payload/types";

import withLabel from "./plugin";
import ToolbarButton from "./button";
import KickerElement from "./element";

const richTextKicker: RichTextCustomElement = {
  name: "label",
  Button: ToolbarButton,
  Element: KickerElement,
  plugins: [withLabel],
};

export default richTextKicker;
