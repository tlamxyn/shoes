import { Static, Type } from "@sinclair/typebox";

export enum Name {
    CreateProductSchema,
    GetOneProductSchema,
    UpdateProductSchema,
    DeleteProductSchema
}

/**
 * @description
 * Create New Product Schema and Type
 */
export const CreateProductSchema = Type.Object({
    
})
export type CreateProductSchema = Static<typeof CreateProductSchema>

/**
 * @description
 * Get 1 Product Schema and Type
 */
export const GetOneProductSchema = Type.Object({
    
})
export type GetOneProductSchema = Static<typeof GetOneProductSchema>

/**
 * @description
 * Update Product Schema and Type
 */
export const UpdateProductSchema = Type.Object({
    
})
export type UpdateProductSchema = Static<typeof UpdateProductSchema>

/**
 * @description
 * Delete Product Schema and Type
 */
export const DeleteProductSchema = Type.Object({
    
})
export type DeleteProductSchema = Static<typeof DeleteProductSchema>
