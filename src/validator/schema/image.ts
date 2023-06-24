import { Static, Type } from "@sinclair/typebox";
import { Table } from "../../models/image";

export enum Name {
    CreateImageSchema = "CreateImageSchema",
    CreateImagesSchema = "CreateImagesSchema",
    DeleteImageSchema = "DeleteImageSchema",
    DeleteOwnerImagesSchema = "DeleteOwnerImagesSchema",
}

/**
 * @description
 * Create New Image Schema and Type
 */
export const CreateImageSchema = Type.Object({
    OwnerID: Type.String({ format: "uuid" }),
    Table: Type.Enum(Table),
    image: Type.Any()
})
export type CreateImageSchema = Static<typeof CreateImageSchema>

/**
 * @description
 * Create New Image Schema and Type
 */
export const CreateImagesSchema = Type.Object({
    OwnerID: Type.String({ format: "uuid" }),
    Table: Type.Enum(Table),
    images: Type.Any()
})
export type CreateImagesSchema = Static<typeof CreateImagesSchema>

/**
 * @description
 * Delete a Image Schema and Type
 */
export const DeleteImageSchema = Type.Object({
    OwnerID: Type.String({ format: "uuid" }),
    Table: Type.Enum(Table),
    ID: Type.String({ format: "uuid" })
})
export type DeleteImageSchema = Static<typeof DeleteImageSchema>

/**
 * @description
 * Delete all Image of Owner Schema and Type
 */
export const DeleteOwnerImagesSchema = Type.Object({
    OwnerID: Type.String({ format: "uuid" }),
    Table: Type.Enum(Table)
})
export type DeleteOwnerImagesSchema = Static<typeof DeleteOwnerImagesSchema>