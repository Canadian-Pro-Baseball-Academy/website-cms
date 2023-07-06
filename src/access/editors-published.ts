import type { Access } from "payload/config";

import { checkRole } from "../utils/check-roles";

export const editorsOrPublished: Access = ({ req: { user } }) => {
  if (user && checkRole(["admin", "editor"], user)) {
    return true;
  }

  return {
    _status: {
      equals: "published",
    },
  };
};
