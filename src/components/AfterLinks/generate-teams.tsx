import React from "react";

const baseClass = "generate-teams";

const GenerateTeams = () => {
  return (
    <div>
      <p className={`${baseClass}__group_label`}>Generation</p>
      <a
        className={`${baseClass}__links`}
        onClick={async () => {
          await fetch("/generate-teams");
          window.location.reload();
        }}
      >
        Generate Teams
      </a>
    </div>
  );
};

export default GenerateTeams;
