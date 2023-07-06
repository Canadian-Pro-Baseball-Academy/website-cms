import type { Access } from "payload/types";

import { checkRole } from "../utils/check-roles";

const adminsOrSelf: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(["admin"], user)) {
      return true;
    }

    return {
      id: {
        equals: user.id,
      },
    };
  }

  return false;
};

export default adminsOrSelf;
