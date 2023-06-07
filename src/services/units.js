import axios from "axios";
import { routes } from "../constants";

export const saveUnits = async (unitData) => {
  const saveResult = await axios.post(routes.unitStore, unitData);

  return saveResult;
};

export const getUnits = async () => {
  const units = await axios.get(routes.unit);

  return units.data.unit;
};
