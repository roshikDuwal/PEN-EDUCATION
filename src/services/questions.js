import axios from "axios";
import { routes } from "../constants";

export const saveQuestion = async (questionData) => {
  const saveResult = await axios.post(routes.question, questionData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return saveResult;
};
