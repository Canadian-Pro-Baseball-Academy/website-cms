import { Block, Field } from "payload/types";
import { blockFields } from "../fields/blockFields";
import { richText } from "../fields/richText";
import { backgroundColor } from "../fields/backgroundColor";

type PostsHighlightType = (options?: { hasBackgroundColor?: boolean }) => Block;

export const PostsHighlight: PostsHighlightType = ({
  hasBackgroundColor = true,
} = {}) => {
  let baseFields: Field[] = [
    blockFields({
      name: "postHighlightFields",
      fields: [
        {
          name: "useLeadingHeader",
          label: "Use Leading Header",
          type: "checkbox",
        },
        richText({
          name: "leadingHeader",
          label: "Leading Header",
          admin: {
            condition: (_, siblingData) => siblingData.useLeadingHeader,
          },
        }),
        {
          name: "posts",
          type: "relationship",
          relationTo: "posts",
          hasMany: true,
          required: true,
        },
      ],
    }),
  ];

  if (hasBackgroundColor) {
    baseFields = [
      backgroundColor({ overrides: { name: "postsHighlightBackgroundColor" } }),
      ...baseFields,
    ];
  }

  return {
    slug: "postsHighlight",
    fields: baseFields,
  };
};
