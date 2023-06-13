import { Static, Type } from "@sinclair/typebox";

export enum Name {
    CreateItemSchema = "CreateItemSchema",
    UpdateItemSchema = "UpdateItemSchema",
    GetOneItemSchema = "GetOneItemSchema",
    GetListItemSchema = "GetListItemSchema",
    DeleteItemSchema = "DeleteItemSchema",
}

/**
 * @description
 * Create New Item Schema and Type
 */
export const CreateItemSchema = Type.Object({
    ProductID: Type.String({ format: "uuid" }),
    Stock: Type.Number({ minimum: 0}),
    Price: Type.Number({ minimum: 0})
})
export type CreateItemSchema = Static<typeof CreateItemSchema>

/**
 * @description
 * Update Item Schema and Type
 */
export const UpdateItemSchema = Type.Object({
    ID: Type.String({ format: "uuid" }),
    ProductID: Type.String({ format: "uuid" }),
    Value: Type.String()
})
export type UpdateItemSchema = Static<typeof UpdateItemSchema>

/**
 * @description
 * Get 1 Item Schema and Type
 */
export const GetOneItemSchema = Type.Object({
    ID: Type.String({ format: "uuid" }),
    ProductID: Type.String({ format: "uuid" })
})
export type GetOneItemSchema = Static<typeof GetOneItemSchema>

/**
 * @description
 * Get List of Item Schema and Type
 */
export const GetListItemSchema = Type.Object({
    ProductID: Type.String({ format: "uuid" })
})
export type GetListItemSchema = Static<typeof GetListItemSchema>

/**
 * @description
 * Delete a Item Schema and Type
 */
export const DeleteItemSchema = Type.Object({
    ProductID: Type.String({ format: "uuid" }),
    ID: Type.String({ format: "uuid" })
})
export type DeleteItemSchema = Static<typeof DeleteItemSchema>