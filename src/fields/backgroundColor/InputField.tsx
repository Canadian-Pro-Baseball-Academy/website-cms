import React from "react";
import { Props } from "payload/components/fields/Select";
import { Label, useFieldType } from "payload/components/forms";

export const InputField: React.FC<Props> = (props) => {
  const { label, path, required, options } = props;

  const { value = "white", setValue } = useFieldType({
    path,
  });

  const color = {
    primary: "#033987",
    secondary: "#dadcfb",
    accent: "#cf573f",
    shaded: "#050724",
    muted: "#f1f5f9",
    white: "#ffffff",
  };

  const baseClass = "custom-color-picker";

  return (
    <div className={baseClass}>
      <Label htmlFor={path} label={label} required={required} />
      <ul className={`${baseClass}__colors`}>
        {options.map((option, i) => (
          <li key={i}>
            {typeof option === "object" && (
              <>
                <button
                  type="button"
                  key={option.value}
                  className={`chip ${
                    option.value === value ? "chip--selected" : ""
                  } chip--clickable`}
                  style={{ backgroundColor: color[option.value] }}
                  aria-label={option.value}
                  onClick={() => setValue(option.value)}
                />
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
