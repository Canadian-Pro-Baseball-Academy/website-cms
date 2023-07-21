import React, { Fragment } from "react";
import { List, type Props } from "payload/components/views/List";
import { Pill } from "payload/components";

const baseClass = "custom-list";

export const TeamsList: React.FC<Props> = (props) => {
  const CustomHeader = () => {
    return (
      <Fragment>
        {typeof props.collection.labels.plural === "string" && (
          <h1>{props.collection.labels.plural}</h1>
        )}
        {props.hasCreatePermission && (
          <Pill
            className={`${baseClass}__pill`}
            pillStyle="dark"
            onClick={async () => {
              const res = await fetch("/generate-teams");
              window.location.reload();
            }}
          >
            Generate Rosters
          </Pill>
        )}
        {props.hasCreatePermission && (
          <Pill to={props.newDocumentURL}>Create New</Pill>
        )}
        {typeof props.collection.admin.description === "string" && (
          <div>{props.collection.admin.description}</div>
        )}
      </Fragment>
    );
  };

  return (
    <Fragment>
      {/* <div className={`${baseClass}__loading`}></div> */}
      <List customHeader={<CustomHeader />} {...props} />
    </Fragment>
  );
};
