import { Static, Type } from "@sinclair/typebox";

export enum Name {
    CreateProductTypeSchema = "CreateProductTypeSchema",
    UpdateProductTypeSchema = "UpdateProductTypeSchema",
    GetOneProductTypeSchema = "GetOneProductTypeSchema",
    DeleteProductTypeSchema = "DeleteProductTypeSchema"
}

/**
 * @description
 * Create New ProductType Schema and Type
 */
export const CreateProductTypeSchema = Type.Object({
    Name: Type.String()
})
export type CreateProductTypeSchema = Static<typeof CreateProductTypeSchema>

/**
 * @description
 * Update ProductType Schema and Type
 */
export const UpdateProductTypeSchema = Type.Object({
    ID: Type.String({ format: "uuid" }),
    Name: Type.String()
})
export type UpdateProductTypeSchema = Static<typeof UpdateProductTypeSchema>

/**
 * @description
 * Delete ProductType Schema and Type
 */
export const DeleteProductTypeSchema = Type.Object({
    ID: Type.String({ format: "uuid" })
})
export type DeleteProductTypeSchema = Static<typeof DeleteProductTypeSchema>

/**
 * @description
 * Get One ProductType Schema and Type
 */
export const GetOneProductTypeSchema = Type.Object({
    ID: Type.String({ format: "uuid" })
})
export type GetOneProductTypeSchema = Static<typeof GetOneProductTypeSchema>