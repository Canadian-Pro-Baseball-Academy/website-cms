import type { AccessArgs } from "payload/config";

import { checkRole } from "../utils/check-roles";
import type { User } from "../payload-types";

type isEditor = (args: AccessArgs<any, User>) => boolean;

export const editors: isEditor = ({ req: { user } }) => {
  return checkRole(["admin", "editor"], user);
};
