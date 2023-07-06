import type { AccessArgs } from "payload/config";

import { checkRole } from "../utils/check-roles";
import type { User } from "../payload-types";

type isAdmin = (args: AccessArgs<any, User>) => boolean;

export const admins: isAdmin = ({ req: { user } }) => {
  return checkRole(["admin"], user);
};
