const SERVER_URL = "https://pen.gesic.edu.np"
export const SERVER_BASE_URL = SERVER_URL + "/api/";
export const IMAGE_PREFIX = SERVER_URL + "/uploads/assessment/"
export const ASSIGNMENT_IMAGE_PREFIX = SERVER_URL + "/uploads/student_assignment/"
export const CHECK_IMAGE_PREFIX = SERVER_URL + "/uploads/assignment_check/"
export const SOLUTION_VIDEO_PREFIX = SERVER_URL + "/uploads/assessment/"

export const routes = {
  questionStore: SERVER_BASE_URL + "unit/assessment/store",
  getAnswers: SERVER_BASE_URL + "unit/getAssignment/",
  checkResult: SERVER_BASE_URL + "unit/assignment/checkAssignment",
  answerStore: SERVER_BASE_URL + "getUnit/assessment/store",
  getResult: SERVER_BASE_URL + "getUnit/checkResult/",
  questions: SERVER_BASE_URL + "unit/assessment/",
  unitStore: SERVER_BASE_URL + "unit/store",
  unit: SERVER_BASE_URL + "unit",

};
