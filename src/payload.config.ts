import { buildConfig } from "payload/config";
import path from "path";
import Users from "./collections/Users";
import { payloadCloud } from "@payloadcms/plugin-cloud";
import { Pages } from "./collections/Pages";
import redirects from "@payloadcms/plugin-redirects";
import { admins } from "./access/admins";
import nestedDocs from "@payloadcms/plugin-nested-docs";
import { Teams } from "./collections/Teams";
import { Coaches } from "./collections/Coaches";
import { Media } from "./collections/Media";
import { Icon } from "./graphics/icon";
import { Logo } from "./graphics/logo";
import { Footer } from "./globals/Footer";
import { Header } from "./globals/Header";
import { Globals } from "./globals/Globals";
import seo from "@payloadcms/plugin-seo";
import formBuilder from "@payloadcms/plugin-form-builder";
import { PageSettings } from "./collections/PageSettings";
import { TeamSnapForms } from "./collections/TeamSnapForms";
import { Posts } from "./collections/Posts";
import { anyone } from "./access/anyone";

export default buildConfig({
  admin: {
    user: Users.slug,
    css: path.resolve(__dirname, "styles/globals.scss"),
    components: {
      graphics: {
        Icon,
        Logo,
      },
    },
    meta: {
      favicon: "/assets/favicon.svg",
      titleSuffix: " | Calgary Bisons CMS",
    },
  },
  collections: [
    Coaches,
    Media,
    Pages,
    PageSettings,
    Posts,
    Teams,
    TeamSnapForms,
    Users,
  ],
  globals: [Globals, Footer, Header],
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  cors: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL || "",
    process.env.PAYLOAD_PUBLIC_SITE_URL || "",
    "https://calgarybisons.payloadcms.app",
  ].filter(Boolean),
  csrf: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL || "",
    process.env.PAYLOAD_PUBLIC_SITE_URL || "",
  ].filter(Boolean),
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
    seo({
      collections: ["pages", "pageSettings", "posts"],
      globals: ["site-settings"],
      uploadsCollection: "media",
      tabbedUI: true,
      fields: [
        {
          name: "keywords",
          label: "Keywords",
          type: "text",
          admin: {
            description: "Please write in a comma seperated list.",
          },
        },
      ],
      // @ts-expect-error
      generateTitle: ({ doc }) => `${doc.title.value} | Calgary Bisons`,
    }),
    redirects({
      overrides: {
        admin: {
          group: "Admin",
        },
        access: {
          read: anyone,
          create: admins,
          update: admins,
          delete: admins,
        },
      },
      collections: ["pages", "pageSettings", "teams", "posts"],
    }),
    payloadCloud(),
  ],
});
