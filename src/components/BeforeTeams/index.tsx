import React from "react";
import { Banner, Button, Pill } from "payload/components";
import { Gutter } from "payload/components/elements";

import "./index.scss";

const baseClass = "before-teams";

const BeforeTeams: React.FC = () => {
  return (
    <div className={baseClass}>
      <Gutter>
        <Banner className={`${baseClass}__banner`} type="info">
          <h4>Generate Teams From TeamSnap</h4>
          <p>
            During a new season you can genereate all the teams with the button
            below.
          </p>
          <p>
            <small>
              **NOTE** The generation is not perfect, manual corrections may be
              needed, due to this the generator does NOT overwrite any existing
              teams, it will only create new ones. If you need to delete a team,
              you can do so manually.",
            </small>
          </p>
          <Button
            className={`${baseClass}__button`}
            icon="plus"
            iconStyle="without-border"
            onClick={async () => {
              await fetch("/generate-teams");
              window.location.reload();
            }}
          >
            Generate New Teams
          </Button>
        </Banner>
      </Gutter>
    </div>
  );
};

export default BeforeTeams;
