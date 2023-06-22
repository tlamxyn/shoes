import { MySQL } from "../database/database";
import { Device } from "../models/device";
import { Image } from "../models/image";
import { Item } from "../models/item";
import { Permission } from "../models/permission";
import { Product } from "../models/product";
import { ProductType } from "../models/producttype";
import { User } from "../models/user";
import { Variation } from "../models/variation";
import { VariationValue } from "../models/variationvalue";
import { VariationValueGroup } from "../models/variationvaluegroup";
import { seed } from "./seed";

export const seeder = async () => {
    await MySQL.init()

    await User.bulkCreate(seed.users);
    await Permission.bulkCreate(seed.permissions);
    await Device.bulkCreate(seed.devices);
    await ProductType.bulkCreate(seed.producttypes);
    await Product.bulkCreate(seed.products);
    await Item.bulkCreate(seed.items);
    await Image.bulkCreate(seed.images);
    await Variation.bulkCreate(seed.variations);
    await VariationValue.bulkCreate(seed.variationvalues);
    await VariationValueGroup.bulkCreate(seed.variationvaluegroups);
}