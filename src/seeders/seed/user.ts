import { InferCreationAttributes } from "sequelize";
import { Gender, Status, User } from "../../models/user";

export const users: InferCreationAttributes<User>[] = [{
    ID: "650e5335-f88e-11ed-af84-d8d0903a8665",
    Username: "lam",
    FullName: "Đặng Trần Lam",
    Email: "lam@gmail.com",
    Password: "123456",
    Salt: "sfweoijwi$$xvos_55tE",
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
    Password: "123456",
    Salt: "sfweoijwi$$xvos_TThu",
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
    Password: "123456",
    Salt: "sfweoijwi$$xvos_R!as",
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
    Password: "123456",
    Salt: "sfweoijwi$$xvos_Sat0s",
    Gender: Gender.Female,
    Birthday: new Date(),
    Status: Status.Available,
    CreatedAt: undefined,
    UpdatedAt: undefined,
    DeletedAt: undefined
}]