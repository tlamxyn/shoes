import { Static, Type } from "@sinclair/typebox";

export enum Name {
    CreateProductSchema = "CreateProductSchema",
    GetOneProductSchema = "GetOneProductSchema",
    UpdateProductSchema = "UpdateProductSchema",
    DeleteProductSchema = "DeleteProductSchema"
}

/**
 * @description
 * Create New Product Schema and Type
 */
export const CreateProductSchema = Type.Object({
    ProductTypeID: Type.String({ format: "uuid" }),
    Name: Type.String(),
    Description: Type.String()
})
export type CreateProductSchema = Static<typeof CreateProductSchema>

/**
 * @description
 * Get 1 Product Schema and Type
 */
export const GetOneProductSchema = Type.Object({
    ID: Type.String({ format: "uuid" }),
})
export type GetOneProductSchema = Static<typeof GetOneProductSchema>

/**
 * @description
 * Update Product Schema and Type
 */
export const UpdateProductSchema = Type.Object({
    ID: Type.String({ format: "uuid" }),
    ProductTypeID: Type.String({ format: "uuid" }),
    Name: Type.String(),
    Description: Type.String()
})
export type UpdateProductSchema = Static<typeof UpdateProductSchema>

/**
 * @description
 * Delete Product Schema and Type
 */
export const DeleteProductSchema = Type.Object({
    ID: Type.String({ format: "uuid" })
})
export type DeleteProductSchema = Static<typeof DeleteProductSchema>
