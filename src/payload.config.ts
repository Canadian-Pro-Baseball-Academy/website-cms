import { buildConfig } from "payload/config";
import path from "path";
import Users from "./collections/Users";
import { payloadCloud } from "@payloadcms/plugin-cloud";
import { Pages } from "./collections/Pages";
import redirects from "@payloadcms/plugin-redirects";
import { admins } from "./access/admins";
import nestedDocs from "@payloadcms/plugin-nested-docs";
import { Teams } from "./collections/Teams";
import BeforeTeams from "./components/BeforeTeams";
import GenerateTeams from "./components/AfterLinks/generate-teams";
import { Coaches } from "./collections/Coaches";
import { Media } from "./collections/Media";
import { Icon } from "./graphics/icon";
import { Logo } from "./graphics/logo";
import { Footer } from "./globals/Footer";
import { MainMenu } from "./globals/MainMenu";

export default buildConfig({
  admin: {
    user: Users.slug,
    css: path.resolve(__dirname, "./styles/globals.scss"),
    components: {
      afterNavLinks: [GenerateTeams],
      graphics: {
        Icon,
        Logo,
      },
    },
    meta: {
      favicon: "/assets/favicon.svg",
      ogImage: "https://calgarybisons.payloadcms.app/assets/og-image.svg",
      titleSuffix: " | Calgary Bisons CMS",
    },
  },
  collections: [Coaches, Media, Pages, Teams, Users],
  globals: [Footer, MainMenu],
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  cors: "*",
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
    redirects({
      overrides: {
        admin: {
          group: "Settings",
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
