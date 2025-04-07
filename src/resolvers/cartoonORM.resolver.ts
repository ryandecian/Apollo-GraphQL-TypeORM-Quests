import { CartoonClass } from "../entities/Cartoon.entity";
import { PersonnageClass } from "../entities/Personnage.entity";


/*--------------------------------------------------------------*/

async function getCartoons(): Promise<CartoonClass[]> {
    return await CartoonClass.find({
        relations: ["personnages"],
    });
}

export { getCartoons };

/*--------------------------------------------------------------*/

// Ici on va écrire la nouvelle mutation `createCartoon` version BDD

async function createCartoon(
  _: unknown,
  args: {
    NewCartoon: Omit<CartoonClass, "id" | "personnages"> & {
      personnages: Omit<PersonnageClass, "id" | "cartoon">[];
    };
  }
): Promise<CartoonClass> {
  // On crée une instance CartoonClass avec ses personnages
  const cartoon = CartoonClass.create({
    ...args.NewCartoon, // toutes les données du cartoon
    personnages: args.NewCartoon.personnages.map((p) => PersonnageClass.create(p)) // chaque personnage est transformé en entité
  });

  // On enregistre dans la base (cartoon + personnages)
  await cartoon.save();

  // On retourne le cartoon créé
  return cartoon;
}

export { createCartoon };
