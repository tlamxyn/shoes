import fs from "fs/promises";
import path from "path";
import { ImageDestination, ImageExtension } from "../contant";
import { Table } from "../models/image";
import { Problem } from "../models/problem";
import { Product } from "../models/product";
import { Review } from "../models/review";
import { User } from "../models/user";
import { Notification } from "../models/notification";
import { Event } from "../models/event";
import { InferAttributes, InferCreationAttributes, Model } from "sequelize";

/**
 * 
 * @param {string} filename 
 * @returns {boolean}
 * @description
 * If extension of filename is allowed image type, return true, else false 
 */
export function isImageExtension(filename: string): boolean {
    return ImageExtension.includes(path.extname(filename).slice(1))
}

/**
 * 
 * @param {string} filename
 * @returns {boolean}
 * @description
 * Check if the file is exist in `ImageDestination`
 */
export async function isExist(filename: string): Promise<boolean> {
    try {
        const file = await fs.open(path.join(ImageDestination, filename))
        file.close();
        return true;
    } catch (error) {
        return false;
    }
}

export function generateImageName(id: string, original_filename: string): string {
    let ext = path.extname(original_filename).slice(1);
    return `${id}.${ext}`;
}

export async function saveImage(imagename: string, buffer: Buffer): Promise<null> {
    try {
        if (await isExist(imagename)) {
            throw Error("Image Existed");
        }
        await fs.writeFile(path.join(ImageDestination, imagename), buffer);
        return null
    } catch (error) {
        throw error as Error;
    }
}

export function getTable(table: string): Object | null {
    if(table == Table.Event) return Event;
    if(table == Table.Notification) return Notification;
    if(table == Table.Problem) return Problem;
    if(table == Table.Product) return Product;
    if(table == Table.Review) return Review;
    if(table == Table.User) return User;
    return null;
}
