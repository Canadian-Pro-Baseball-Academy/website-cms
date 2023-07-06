import { formatAppURL } from "./format-app-url";

export const formatPreviewURL = (
  collection: string,
  doc: any // eslint-disable-line @typescript-eslint/no-explicit-any
): string => {
  return `${
    process.env.PAYLOAD_PUBLIC_SITE_URL
  }/api/enable-draft-mode?redirect=${formatAppURL(collection, doc)}&secret=${
    process.env.PAYLOAD_PUBLIC_DRAFT_SECRET
  }`;
};
