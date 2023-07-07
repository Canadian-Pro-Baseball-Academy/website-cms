import type { AfterChangeHook } from "payload/dist/collections/config/types";

// Revalidate the page in the background, so the user doesn't have to wait
// Notice that the hook itself is not async and we are not awaiting `revalidate`
export const revalidatePage: AfterChangeHook = ({ doc, req }) => {
  const revalidate = async (): Promise<void> => {
    try {
      const res = await fetch(
        `${process.env.PAYLOAD_PUBLIC_SITE_URL}/api/revalidate?secret=${process.env.PAYLOAD_PUBLIC_REVALIDATION_KEY}&tag=pages`
      );

      const json = await res.json();
      if (res.ok) {
        req.payload.logger.info(
          `${process.env.PAYLOAD_PUBLIC_SITE_URL}/api/revalidate?secret=${process.env.PAYLOAD_PUBLIC_REVALIDATION_KEY}&tag=pages`
        );
        req.payload.logger.info(`Revalidated path ${req.collection}`);
      } else {
        req.payload.logger.error(`Error revalidating path ${req.collection}`);
      }
    } catch (err: unknown) {
      req.payload.logger.error(
        `Error hitting revalidate route for ${req.collection}`
      );
    }
  };

  revalidate();

  return doc;
};
