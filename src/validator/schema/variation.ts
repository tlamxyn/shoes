import { Static, Type } from "@sinclair/typebox";
import { Type as VariationType } from "../../models/variation";

export enum Name {
    CreateVariationSchema,
    UpdateVariationSchema,
    GetOneVariationSchema,
    DeleteVariationSchema
}

/**
 * @description
 * Create New Variation Schema and Type
 */
export const CreateVariationSchema = Type.Object({
    Name: Type.String(),
    Type: Type.Enum(VariationType)
})
export type CreateVariationSchema = Static<typeof CreateVariationSchema>

/**
 * @description
 * Update Variation Schema and Type
 */
export const UpdateVariationSchema = Type.Object({
    ID: Type.String({ format: "uuid" }),
    Name: Type.String(),
    Type: Type.Enum(VariationType)
})
export type UpdateVariationSchema = Static<typeof UpdateVariationSchema>

/**
 * @description
 * Get 1 Variation Schema and Type
 */
export const GetOneVariationSchema = Type.Object({
    ID: Type.String({ format: "uuid" })
})
export type GetOneVariationSchema = Static<typeof GetOneVariationSchema>

/**
 * @description
 * Delete a Variation Schema and Type
 */
export const DeleteVariationSchema = Type.Object({
    ID: Type.String({ format: "uuid" })
})
export type DeleteVariationSchema = Static<typeof DeleteVariationSchema>