import { InferCreationAttributes } from "sequelize";
import { Gender, Status, User } from "../../models/user";

export const users: InferCreationAttributes<User>[] = [{
    ID: "650e5335-f88e-11ed-af84-d8d0903a8665",
    Username: "lam",
    FullName: "Đặng Trần Lam",
    Email: "lam@gmail.com",
    Password: "e6a5c9ce34d159e148e3b13f6feacb5d8283d0fdcc6a1ac61b5de107f125d83d266abb24d4c5a00b54807fd90442e138597ffc65d7dbde88898e45bcf377e9f799477eeb1203bd689fee05052f137165ee222e2fba8b0475ff5a61033107646ff1c8daa4fe5b1bcdd48259df6b2151701c9a95b1215b5070",
    Salt: "241f1bd42f97c6621fef25cb998039aa",
    Gender: Gender.Male,
    Birthday: new Date(),
    Status: Status.Available,
    CreatedAt: undefined,
    UpdatedAt: undefined,
    DeletedAt: undefined
},{
    ID: "650e5335-f88e-11ed-af84-d8d0903a8664",
    Username: "kim",
    FullName: "Bùi Thành Kim",
    Email: "kim@gmail.com",
    Password: "25d2d034cc7dffb10b9c997bb50c28ca133de48ed787a10b86e80184bdd680d3bc48ac4b076c4645e2ae97f5beb969e6bfd30afa621e3570d24a52878c33cde6c75a9bc66a222f6795ef5017c7ff62b909f779b7925d656296d9c5ddc6aa794a7aabd156658febe9b6858bce71467a9c4786c9d874cbecff",
    Salt: "b174adccf1451827eef61b2414d55b2d",
    Gender: Gender.Male,
    Birthday: new Date(),
    Status: Status.Unavailable,
    CreatedAt: undefined,
    UpdatedAt: undefined,
    DeletedAt: undefined
},{
    ID: "650e5335-f88e-11ed-af84-d8d0903a8663",
    Username: "vong",
    FullName: "Nguyễn Tâm Vong",
    Email: "vong332@gmail.com",
    Password: "90f0efdfdbf9308d81b966c6ac168d778916d5b503210f59f2170ad563f80a78b7893fa027be5eb347c6844092a1b0b4de55115ce608c6e5b8db04486bc00d004bb788968c7de78c50666bf08dc89cbbd6a2514a793b0a6b062b866c8ef82d66f4f544b3cbf13663f68d64e1d9726abedb70a20e82e93286",
    Salt: "cc0abf19e3c6929337142ad87f83af9a",
    Gender: Gender.Male,
    Birthday: new Date(),
    Status: Status.Available,
    CreatedAt: undefined,
    UpdatedAt: undefined,
    DeletedAt: undefined
},{
    ID: "650e5335-f88e-11ed-af84-d8d0903a8662",
    Username: "han",
    FullName: "Hân Hân Hân",
    Email: "hanhanhan@gmail.com",
    Password: "f1a6a1046e27147dfe23661a66d55ecc1d7d27303fd6957b495863b1ffc911663d39945a545044e02169f960fb1c84d81c31d4acd30dfb0d7d63cc016503edadf61de623291e43d696c84d68060ea21a2475dfc7bd707b57a5266d5a2c9f1b288d7bdd80738d52c89cdb410dc8f3942fbf44c28f33cc287e",
    Salt: "c2353eba5300ef5c86daeb211895f0d0",
    Gender: Gender.Female,
    Birthday: new Date(),
    Status: Status.Available,
    CreatedAt: undefined,
    UpdatedAt: undefined,
    DeletedAt: undefined
}]