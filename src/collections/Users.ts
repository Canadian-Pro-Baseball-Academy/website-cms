import { CollectionConfig } from "payload/types";
import { admins } from "../access/admins";
import adminsOrSelf from "../access/admins-self";
import { anyone } from "../access/anyone";
import { checkRole } from "../utils/check-roles";

const UserFields: CollectionConfig["fields"] = [
  {
    name: "name",
    type: "text",
  },
  {
    name: "roles",
    type: "select",
    hasMany: true,
    saveToJWT: true,
    options: [
      {
        label: "Admin",
        value: "admin",
      },
      {
        label: "Editor",
        value: "editor",
      },
      // {
      //   label: "Author",
      //   value: "author",
      // },
      // {
      //   label: "Contributor",
      //   value: "contributor",
      // },
    ],
    access: {
      read: admins,
      create: admins,
      update: admins,
    },
  },
];

const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email"],
    group: "Admin",
  },
  access: {
    read: anyone,
    create: admins,
    update: adminsOrSelf,
    delete: adminsOrSelf,
  },
  auth: true,
  fields: UserFields,
  timestamps: true,
};

export default Users;
