import { buildConfig } from "payload/config";
import path from "path";
import Users from "./collections/Users";
import { payloadCloud } from "@payloadcms/plugin-cloud";
import { Pages } from "./collections/Pages";
import redirects from "@payloadcms/plugin-redirects";
import { admins } from "./access/admins";
import nestedDocs from "@payloadcms/plugin-nested-docs";

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Pages, Users],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  plugins: [
    nestedDocs({
      collections: ["pages"],
      generateLabel: (_, doc) => doc.title as string,
      generateURL: (docs) =>
        docs.reduce((url, doc) => `${url}/${doc.slug}`, ""),
    }),
    redirects({
      overrides: {
        admin: {
          group: "Admin",
        },
        access: {
          read: admins,
          create: admins,
          update: admins,
          delete: admins,
        },
      },
      collections: ["pages"],
    }),
    payloadCloud(),
  ],
});
