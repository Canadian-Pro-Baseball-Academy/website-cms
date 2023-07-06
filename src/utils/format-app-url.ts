export const formatAppURL = (collection, doc): string => {
  const { slug } = doc;

  let prefix = "";
  const pathToUse = doc.slug === "home" ? "" : doc.slug;

  if (collection) {
    switch (collection) {
      case "pages":
        prefix = "";
        break;
      default:
        prefix = `/${collection}`;
    }
  }

  return `${prefix}/${pathToUse}`;
};
