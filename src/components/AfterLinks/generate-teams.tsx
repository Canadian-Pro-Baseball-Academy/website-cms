import React from "react";

import "./generate-teams.scss";

const baseClass = "generate-teams";

const GenerateTeams = () => {
  return (
    <div>
      <div className={`${baseClass}__label`}>Generation</div>
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
