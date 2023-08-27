import { Block } from "payload/types"
import { blockFields } from "../fields/blockFields"
import { richText } from "../fields/richText"
import linkGroup from "../fields/linkGroup"
import { backgroundColor } from "../fields/backgroundColor"

export const CallToAction: Block = {
    slug: "cta",
    labels: {
        singular: "Call to Action",
        plural: "Call to Actions",
    },
    fields: [
        backgroundColor({ overrides: { name: "ctaBackgroundColor" } }),
        blockFields({
            name: "ctaFields",
            fields: [
                {
                    type: "row",
                    fields: [
                        {
                            type: "select",
                            name: "logo",
                            options: [
                                { label: "Primary", value: "primary" },
                                { label: "Alternate", value: "alternate" },
                            ],
                            admin: {
                                width: "50%",
                            },
                        },
                        {
                            type: "select",
                            name: "alignment",
                            options: [
                                { label: "Left", value: "left" },
                                { label: "Center", value: "center" },
                                { label: "Right", value: "right" },
                            ],
                            admin: {
                                width: "50%",
                            },
                        },
                    ],
                },
                richText(),
                linkGroup({
                    overrides: {
                        maxRows: 2,
                    },
                }),
            ],
        }),
    ],
}
