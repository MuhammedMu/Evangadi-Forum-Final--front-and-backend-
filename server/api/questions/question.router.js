const router = require('express').Router();
const { getQuestionById, getQuestions, createQuestion } = require('./question.controller');

// Route for creating question
router.post('/', createQuestion);
// Route for fetching single question by id
router.get("/:id", getQuestionById);
// Route for fetching all questions
router.get("/", getQuestions);

module.exports = router;