const router = require('express').Router();
const {
  answerQuestion,
  getAnswerByQuestionId,
} = require("./answer.controller");

// Route for creating question
router.post('/', answerQuestion);
// Route for fetching answers by answer id
router.get('/:id', getAnswerByQuestionId);

module.exports = router;