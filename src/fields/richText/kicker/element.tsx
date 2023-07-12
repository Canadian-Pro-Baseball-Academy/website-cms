import React from "react";

const baseClass = "rich-text-kicker";

const KickerElement: React.FC<{
  attributes: any;
  element: any;
  children: React.ReactNode;
}> = ({ attributes, children }) => (
  <div {...attributes}>
    <span className={baseClass}>{children}</span>
  </div>
);
export default KickerElement;
