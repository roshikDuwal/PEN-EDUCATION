import axios from "axios";
import { routes } from "../constants";

export const saveAnswer = async (answerData) => {
  const saveResult = await axios.post(routes.answerStore, answerData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return saveResult;
};


export const getAnswers = async (unit_id) => {
  const units = await axios.get(routes.questions+unit_id);
  return units.data.theoryAssessment;
};
