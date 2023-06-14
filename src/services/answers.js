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
  const answers = await axios.get(routes.getAnswers+unit_id);
  return answers.data.assignment;
};

export const submitResult = async (resultData) => {
  const saveResult = await axios.post(routes.checkResult, resultData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return saveResult;
}

export const getResult = async (unitId) => {
  const result = await axios.get(routes.getResult+unitId);
  console.log(result)

  return result.data.checkAssignment;
}
