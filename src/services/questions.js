import axios from "axios";
import { routes } from "../constants";

export const saveQuestion = async (questionData) => {
  const saveResult = await axios.post(routes.questionStore, questionData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return saveResult;
};

export const getQuestions = async (unit_id) => {
  const units = await axios.get(routes.questions+unit_id);
  return units.data.theoryAssessment;
};
