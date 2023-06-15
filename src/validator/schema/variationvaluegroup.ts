import { Static, Type } from "@sinclair/typebox";

export enum Name {
    CreateVariationValueGroupSchema = "CreateVariationValueGroupSchema",
    GetListVariationValueGroupSchema = "GetListVariationValueGroupSchema",
    DeleteVariationValueGroupSchema = "DeleteVariationValueGroupSchema",
}

/**
 * @description
 * Create New VariationValueGroup Schema and Type
 */
export const CreateVariationValueGroupSchema = Type.Object({
    ProductID: Type.String({ format: "uuid" }),
    ItemID: Type.String({ format: "uuid" }),
    VariationValueID: Type.String({ format: "uuid" })
})
export type CreateVariationValueGroupSchema = Static<typeof CreateVariationValueGroupSchema>

/**
 * @description
 * Get List of VariationValueGroup Schema and Type
 */
export const GetListVariationValueGroupSchema = Type.Object({
    ProductID: Type.String({ format: "uuid" }),
    ItemID: Type.String({ format: "uuid" })
})
export type GetListVariationValueGroupSchema = Static<typeof GetListVariationValueGroupSchema>

/**
 * @description
 * Delete a VariationValueGroup Schema and Type
 */
export const DeleteVariationValueGroupSchema = Type.Object({
    ProductID: Type.String({ format: "uuid" }),
    ItemID: Type.String({ format: "uuid" }),
    VariationValueID: Type.String({ format: "uuid" })
})
export type DeleteVariationValueGroupSchema = Static<typeof DeleteVariationValueGroupSchema>