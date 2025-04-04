import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm";
import { CartoonClass } from "./Cartoon.entity";

@Entity()
export class PersonnageClass extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  role: string;

  @Column()
  short_description: string;

  @ManyToOne(() => CartoonClass, (cartoon) => cartoon.personnages, {
    onDelete: "CASCADE", // si tu supprimes un cartoon, ça supprime les personnages liés
  })
  cartoon: CartoonClass;
}
