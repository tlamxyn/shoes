import { Request, Response } from "express";
import { InternalServerError } from "../../services/response_content/response_content";

export default class ProductController {
    public static async GetProducts(req: Request, res: Response) {
        try {

        } catch (error) {
            console.log(error)
            return InternalServerError(res, { message: error });
        }
    }
    public static async GetProduct(req: Request, res: Response) {
        try {

        } catch (error) {
            console.log(error)
            return InternalServerError(res, { message: error });
        }
    }
    public static async CreateProduct(req: Request, res: Response) {
        try {

        } catch (error) {
            console.log(error)
            return InternalServerError(res, { message: error });
        }
    }
    public static async UpdateProduct(req: Request, res: Response) {
        try {

        } catch (error) {
            console.log(error)
            return InternalServerError(res, { message: error });
        }
    }
    public static async DeleteProduct(req: Request, res: Response) {
        try {

        } catch (error) {
            console.log(error)
            return InternalServerError(res, { message: error });
        }
    }
}