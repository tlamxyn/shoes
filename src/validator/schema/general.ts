import { Static, Type } from "@sinclair/typebox";

export enum Name {
    PaginationSchema = "PaginationSchema"
}

/**
 * @description
 * Create New ProductType Schema and Type
 */
export const PaginationSchema = Type.Object({
    limit: Type.Number({minimum: 0, maximum: 50}),
    page: Type.Number({minimum: 1})
})
export type PaginationSchema = Static<typeof PaginationSchema>