const SERVER_URL = "https://pen.gesic.edu.np"
export const SERVER_BASE_URL = SERVER_URL + "/api/";
export const IMAGE_PREFIX = SERVER_URL + "/uploads/assessment/"

export const routes = {
  questionStore: SERVER_BASE_URL + "unit/assessment/store",
  answerStore: SERVER_BASE_URL + "unit/getUnit/assessment/store",
  questions: SERVER_BASE_URL + "unit/assessment/",
  unitStore: SERVER_BASE_URL + "unit/store",
  unit: SERVER_BASE_URL + "unit",

};
