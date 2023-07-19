import { CollectionConfig } from "payload/types";
import { admins } from "../access/admins";
import { richText } from "../fields/richText";
import { anyone } from "../access/anyone";

export const RegistrationForms: CollectionConfig = {
  slug: "registration-forms",
  admin: {
    useAsTitle: "title",
    group: "Settings",
  },
  versions: {
    drafts: true,
  },
  access: {
    read: anyone,
    update: admins,
    create: admins,
    delete: admins,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "formId",
      type: "number",
      required: true,
      admin: {
        description:
          "The form id is at the end of the form URL: https://go.teamsnap.com/forms/<teamsnapId>",
      },
    },
    richText({
      name: "description",
      admin: {
        elements: [],
      },
    }),
  ],
};
