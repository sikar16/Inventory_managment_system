// ''model ProductCategory {
//   id          Int                  @id @default(autoincrement())
//   name        String
//   createdAt   DateTime             @default(now())
//   // relation
//   subCategory ProductSubCategory[]
// }

export interface ProductCategoryType {
    id: number;
    name: string;
}
