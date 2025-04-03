import { default as dataCartoons } from "../../dataset.json";
import { CartoonType } from "../types/cartoon.type";

const copyDataCartoons: CartoonType[] = [...dataCartoons];

//-----------------------------------------------------------

type getOneCartoonByIdArgs = {
  id: number;
};

function getOneCartoonById (_: unknown, args: getOneCartoonByIdArgs): CartoonType | undefined {
  return dataCartoons.find((test) => test.id === +args.id) as CartoonType;
}

export {getOneCartoonById};

//-----------------------------------------------------------

// NewCartoon: Omit<CartoonType, "id"> Veux dire qu'on reçois un objet de type CartoonType sans la propriété id

function createCartoon (_: unknown, args: {NewCartoon: Omit<CartoonType, "id">}): CartoonType {
  const newId = copyDataCartoons.length > 0 ? copyDataCartoons[copyDataCartoons.length - 1].id + 1 : 1;
  
  // Création du nouvel objet CartoonType avec un id unique
  const newCartoon: CartoonType = {
    id: newId,
    ...args.NewCartoon,
  };

  // Ajout du nouveau cartoon à la liste des cartoons
  copyDataCartoons.push(newCartoon);

  // retourne le nouveau cartoon au client
  return newCartoon;  
}

export {createCartoon};
