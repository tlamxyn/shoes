import { InferCreationAttributes } from "sequelize";
import { Product } from "../../models/product";

export const products: InferCreationAttributes<Product>[] = [
    {
        ID: "18fe3a64-f5df-4035-b6c5-760920f0fbaf",
        Name: "Air Jordan",
        Description: `Inspired by the original that debuted in 1985, the Air Jordan 1 Low offers a clean, classic look that's familiar yet always fresh. With an iconic design that pairs perfectly with any 'fit, these kicks ensure you'll always be on point.`,
        ProductTypeID: "3868ceb0-1207-49c3-bd6e-7995f1509d3f",
        CreatedAt: undefined,
        UpdatedAt: undefined,
        DeletedAt: undefined
    }, {
        ID: "eb831c53-cee2-4aac-886d-1ddc84113ed0",
        Name: "Nike Air Force 1 Low Retro QS",
        Description: `Can an icon get more iconic? This AF1 goes for it with an anniversary edition of the 2002 design honoring the cultures of the West Indies. Crisp white is punctuated with pops of color throughout, and features an embroidered "West Indies" and palm tree. Take a peek at the insole for your very own geography lesson, just in time for the annual parade in Brooklyn that celebrates the islands.`,
        ProductTypeID: "3868ceb0-1207-49c3-bd6e-7995f1509d3f",
        CreatedAt: undefined,
        UpdatedAt: undefined,
        DeletedAt: undefined
    }, {
        ID: "e10141bc-6931-4272-832c-2cada5fc9c6e",
        Name: "Nike Free Metcon 5",
        Description: `Nike Free Metcon 5 can meet you in the depths, help you dig deep to find that final ounce of force and come out of the other side on a high. It matches style with substance, forefoot flexibility with backend stability, perfect for flying through a cardio day or enhancing your agility. A revamped upper offers easier entry with a collar made just for your ankle.`,
        ProductTypeID: "3868ceb0-1207-49c3-bd6e-7995f1509d3f",
        CreatedAt: undefined,
        UpdatedAt: undefined,
        DeletedAt: undefined
    }, {
        ID: "7aa74cd7-0f24-418f-9200-5cf34fdb0edf",
        Name: "Mitchell & Ness",
        Description: `Denver Nuggets Team Seal Hwc Blue Trucker - Mitchell & Ness`,
        ProductTypeID: "5688cc39-5a95-4e35-958a-09b6ec5c123f",
        CreatedAt: undefined,
        UpdatedAt: undefined,
        DeletedAt: undefined
    }, {
        ID: "99d99627-6adc-435b-a0ae-b30e9120c8c4",
        Name: "ASOS DESIGN Tall relaxed mom jeans in light blue",
        Description: ``,
        ProductTypeID: "5688cc39-5a95-4e35-958a-09b6ec5c128a",
        CreatedAt: undefined,
        UpdatedAt: undefined,
        DeletedAt: undefined
    }, {
        ID: "c730a40f-d5dc-4353-abb6-b4817bcbfc9e",
        Name: "Chelsea Peers swim short in blue tile print",
        Description: ``,
        ProductTypeID: "5688cc39-5a95-4e35-958a-09b6ec5c128a",
        CreatedAt: undefined,
        UpdatedAt: undefined,
        DeletedAt: undefined
    },
]