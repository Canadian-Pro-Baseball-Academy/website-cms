import { Block, Field } from "payload/types";
import { aspectRatio } from "../fields/aspectRatio";
import { blockFields } from "../fields/blockFields";
import { backgroundColor } from "../fields/backgroundColor";

type MediaType = (options?: { hasBackgroundColor?: boolean }) => Block;

export const Media: MediaType = ({ hasBackgroundColor = true } = {}) => {
  let baseFields: Field[] = [
    blockFields({
      name: "mediaFields",
      fields: [
        {
          name: "embed",
          type: "checkbox",
          label: "Embed Media",
          admin: {
            description:
              "Check this box if the media is an from Youtube or Vimeo.",
          },
        },
        {
          name: "embedVideo",
          label: "Embedded Video",
          type: "group",
          fields: [
            {
              name: "platform",
              type: "select",
              options: [
                {
                  label: "YouTube",
                  value: "youtube",
                },
                {
                  label: "Vimeo",
                  value: "vimeo",
                },
              ],
            },
            {
              name: "videoID",
              label: "Video ID",
              type: "text",
            },
            aspectRatio(),
            {
              name: "manualThumbnail",
              type: "upload",
              relationTo: "media",
              admin: {
                description:
                  "The photo chosen here will be displayed before the video is shown. If no photo is uploaded the thumbnail will be the default one Youtube or Vimeo selects. Maximum upload file size: 12MB. Recommended file size for images is <500KB.",
              },
            },
          ],
          admin: {
            condition: (_, siblingData) => siblingData.embed,
          },
        },
        {
          name: "internalMedia",
          label: "Internal Media",
          type: "group",
          fields: [
            {
              name: "media",
              label: "Media",
              type: "upload",
              relationTo: "media",
              admin: {
                description:
                  "Maximum upload file size: 12MB. Recommended file size for images is <500KB.",
              },
            },
          ],
          admin: {
            condition: (_, siblingData) => !siblingData.embed,
          },
        },
        {
          name: "size",
          label: "Size",
          type: "radio",
          defaultValue: "normal",
          options: [
            {
              label: "Normal",
              value: "normal",
            },
            {
              label: "Wide",
              value: "wide",
            },
            {
              label: "Fullscreen",
              value: "fullscreen",
            },
          ],
          admin: {
            layout: "horizontal",
          },
        },
        {
          name: "caption",
          label: "Caption",
          type: "richText",
          admin: {
            elements: ["link"],
          },
        },
      ],
    }),
  ];

  if (hasBackgroundColor) {
    baseFields = [
      backgroundColor({ overrides: { name: "mediaBackgroundColor" } }),
      ...baseFields,
    ];
  }

  return {
    slug: "media",
    labels: {
      singular: "Media Block",
      plural: "Media Blocks",
    },
    interfaceName: "MediaBlock",
    fields: baseFields,
  };
};
