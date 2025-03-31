import { default as cartoons } from "../../dataset.json";
import { CartoonType } from "../types/cartoon.type";

type getOneCartoonByIdArgs = {
  id: number;
};

function getOneCartoonById (_: unknown, args: getOneCartoonByIdArgs): CartoonType | undefined {
  return cartoons.find((test) => test.id === +args.id) as CartoonType;
}

export {getOneCartoonById};
