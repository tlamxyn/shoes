import { Static, Type } from "@sinclair/typebox";

export enum Name {
    CreateVariationValueSchema = "CreateVariationValueSchema",
    UpdateVariationValueSchema = "UpdateVariationValueSchema",
    GetOneVariationValueSchema = "GetOneVariationValueSchema",
    GetListVariationValueSchema = "GetListVariationValueSchema",
    DeleteVariationValueSchema = "DeleteVariationValueSchema",
}

/**
 * @description
 * Create New VariationValue Schema and Type
 */
export const CreateVariationValueSchema = Type.Object({
    VariationID: Type.String({ format: "uuid" }),
    Value: Type.String()
})
export type CreateVariationValueSchema = Static<typeof CreateVariationValueSchema>

/**
 * @description
 * Update VariationValue Schema and Type
 */
export const UpdateVariationValueSchema = Type.Object({
    ID: Type.String({ format: "uuid" }),
    VariationID: Type.String({ format: "uuid" }),
    Value: Type.String()
})
export type UpdateVariationValueSchema = Static<typeof UpdateVariationValueSchema>

/**
 * @description
 * Get 1 VariationValue Schema and Type
 */
export const GetOneVariationValueSchema = Type.Object({
    ID: Type.String({ format: "uuid" }),
    VariationID: Type.String({ format: "uuid" })
})
export type GetOneVariationValueSchema = Static<typeof GetOneVariationValueSchema>

/**
 * @description
 * Get List of VariationValue Schema and Type
 */
export const GetListVariationValueSchema = Type.Object({
    VariationID: Type.String({ format: "uuid" })
})
export type GetListVariationValueSchema = Static<typeof GetListVariationValueSchema>

/**
 * @description
 * Delete a VariationValue Schema and Type
 */
export const DeleteVariationValueSchema = Type.Object({
    VariationID: Type.String({ format: "uuid" }),
    ID: Type.String({ format: "uuid" })
})
export type DeleteVariationValueSchema = Static<typeof DeleteVariationValueSchema>