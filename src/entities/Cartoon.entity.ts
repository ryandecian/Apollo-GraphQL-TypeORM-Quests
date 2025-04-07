import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { PersonnageClass } from "./Personnage.entity";

@Entity()
export class CartoonClass extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    nb_of_episodes: number;

    @Column()
    nb_of_seasons: number;

    @Column("simple-array")
    genres: string[];

    @Column()
    realisator: string;

    @Column()
    autor: string;

    @Column()
    ft_diffusion: Date;

    @OneToMany(() => PersonnageClass, (personnage) => personnage.cartoon, {
        cascade: true, // permet de sauvegarder ou supprimer les personnages en même temps que le cartoon
      })
      personnages: PersonnageClass[];
}