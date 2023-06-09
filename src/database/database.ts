import { Sequelize, Options, ConnectionError } from "sequelize";
import { shoesmanager } from "../manager";
import { User } from "../models/user";
import { Permission } from "../models/permission";
import { Verification } from "../models/verification";
import { SecretKey } from "../models/secretkey";
import { Device } from "../models/device";
import { ProductType } from "../models/producttype";
import { Product } from "../models/product";
import { Item } from "../models/item";
import { Address } from "../models/address";
import { Notification } from "../models/notification";
import { UserNotification } from "../models/usernotification";
import { Image } from "../models/image";
import { Problem } from "../models/problem";
import { Review } from "../models/review";
import { Favorite } from "../models/favorite";
import { Invoice } from "../models/invoice";
import { ShipWork } from "../models/shipwork";
import { Cart } from "../models/cart";
import { InvoiceDetail } from "../models/invoicedetail";
import { Event } from "../models/event";
import { Discount } from "../models/discount";
import { DiscountItem } from "../models/discountitem";
import { Variation } from "../models/variation";
import { VariationValue } from "../models/variationvalue";
import { VariationValueGroup } from "../models/variationvaluegroup";

export class MySQL {
    public static sequelize: Sequelize | undefined = undefined;
    public static config: Options = {
        dialect: "mysql",
        logging: false,
        define: {
            freezeTableName: true,
            timestamps: true,
        },
        timezone: "+07:00"
    }
    public static async init() {
        const {
            DB_NAME = "test",
            DB_USERNAME = "root",
            DB_PASSWORD,
        } = process.env;

        this.sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, this.config);

        try {
            await this.sequelize.authenticate();
            console.log("Database Inited")
        } catch (error) {
            if (error instanceof ConnectionError) {
                console.log(error.original.message)
                await shoesmanager.exit()
            }
        }

        User.defineUser(this.sequelize)
        ProductType.defineProductType(this.sequelize)
        Product.defineProduct(this.sequelize)
        Item.defineItem(this.sequelize)
        Device.defineDevice(this.sequelize)
        SecretKey.defineSecretKey(this.sequelize)
        Address.defineAddress(this.sequelize)
        Notification.defineNotification(this.sequelize)
        UserNotification.defineUserNotification(this.sequelize)
        Problem.defineProblem(this.sequelize)
        Favorite.defineFavorite(this.sequelize)
        Invoice.defineInvoice(this.sequelize)
        InvoiceDetail.defineInvoiceDetail(this.sequelize)
        Event.defineEvent(this.sequelize)
        Discount.defineDiscount(this.sequelize)
        DiscountItem.defineDiscountItem(this.sequelize)
        Variation.defineVariation(this.sequelize)
        VariationValue.defineVariationValue(this.sequelize)
        VariationValueGroup.defineVariationValueGroup(this.sequelize)
        Review.defineReview(this.sequelize)
        ShipWork.defineShipWork(this.sequelize)
        Cart.defineCart(this.sequelize)
        Permission.defindPermission(this.sequelize)
        Verification.defindVerification(this.sequelize)
        Image.defineImage(this.sequelize)

        Address.associateUser(this.sequelize)
        ProductType.associateProduct(this.sequelize)
        Variation.associateVariationValue(this.sequelize)
        VariationValue.associateVariationValueGroup(this.sequelize)
        VariationValue.associateVariation(this.sequelize)
        VariationValueGroup.associateVariationValue(this.sequelize)
        VariationValueGroup.associateItem(this.sequelize)
        Product.associateFavorite(this.sequelize)
        Product.associateImage(this.sequelize)
        Product.associateItem(this.sequelize)
        Product.associateProductType(this.sequelize)
        Product.associateReview(this.sequelize)
        Item.associateCart(this.sequelize)
        Item.associateDiscountItem(this.sequelize)
        Item.associateInvoiceDetail(this.sequelize)
        Item.associateProduct(this.sequelize)
        Item.associateVariationValueGroup
        Event.associateDiscount(this.sequelize)
        Event.associateImage(this.sequelize)
        Discount.associateDiscountItem(this.sequelize)
        Discount.associateEvent(this.sequelize)
        DiscountItem.associateDiscount(this.sequelize)
        DiscountItem.associateItem(this.sequelize)
        Review.associateImage(this.sequelize)
        Review.associateInvoice(this.sequelize)
        Review.associateProduct(this.sequelize)
        Review.associateUser(this.sequelize)
        Image.associateEvent(this.sequelize)
        Image.associateNotification(this.sequelize)
        Image.associateProblem(this.sequelize)
        Image.associateProduct(this.sequelize)
        Image.associateReview(this.sequelize)
        Invoice.associateInvoiceDetail(this.sequelize)
        Invoice.associateReview(this.sequelize)
        Invoice.associateShipWork(this.sequelize)
        Invoice.associateUser(this.sequelize)
        InvoiceDetail.associateInvoice(this.sequelize)
        InvoiceDetail.associateItem(this.sequelize)
        Favorite.associateProduct(this.sequelize)
        Favorite.associateUser(this.sequelize)
        Problem.associateImage(this.sequelize)
        Problem.associateUser(this.sequelize)
        ShipWork.associateInvoice(this.sequelize)
        ShipWork.associateUser(this.sequelize)
        Notification.associateImage(this.sequelize)
        Notification.associateUserNotification(this.sequelize)
        UserNotification.associateNotification(this.sequelize)
        UserNotification.associateUser(this.sequelize)
        Device.associateSecretKey(this.sequelize)
        Cart.associateUser(this.sequelize)
        Cart.associateItem(this.sequelize)
        SecretKey.associateDevice(this.sequelize)
        SecretKey.associateUser(this.sequelize)
        Permission.associateUser(this.sequelize)
        Verification.associateUser(this.sequelize)
        User.associatePermission(this.sequelize)
        User.associateSecretKey(this.sequelize)
        User.associateVerification(this.sequelize)
        User.associateAddress(this.sequelize)
        User.associateCart(this.sequelize)
        User.associateFavorite(this.sequelize)
        User.associateInvoice(this.sequelize)
        User.associateProblem(this.sequelize)
        User.associateReview(this.sequelize)
        User.associateShipWork(this.sequelize)
        User.associateUserNotification(this.sequelize)
    }
    public static async close() {
        await this.sequelize?.close()
        console.log("Database Closed")
    }
}