import { users } from "./seed/user"
import { permissions } from "./seed/permission"
import { devices } from "./seed/device"
import { producttypes } from "./seed/producttype"
import { products } from "./seed/product"
import { items } from "./seed/item"
import { variations } from "./seed/variation"
import { variationvalues } from "./seed/variationvalue"
import { variationvaluegroups } from "./seed/variationvaluegroup"
import { images } from "./seed/image"

export const seed = {
    users, 
    permissions, 
    devices,
    producttypes,
    items,
    products,
    variations,
    variationvalues,
    variationvaluegroups,
    images
}