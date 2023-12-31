// const { v4: uuidv4 } = require('uuid');
const {
  questionById,
  getAllQuestions,
  addQuestion,
} = require("./question.service");

module.exports = {
  // Creation question 
  createQuestion: (req, res) => {
    //id is user id
    const { question, id } = req.body;
    console.log(req.body);

    req.body.postId = Math.floor(Math.random() * 10000);

    //Validation for allfield require
    if (!question || !id) {
      return res
        .status(400)
        .json({ msg: "Not all fields have been provided!" });
    }

    //Sending data to question table
    addQuestion(req.body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection err" });
      }
      return res.status(200).json({
        msg: "New question was created successfully",
        data: results,
      });
    });
  },
  // Fetching all questions
  getQuestions: (req, res) => {
    getAllQuestions((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection error" });
      }
      return res.status(200).json({ data: results });
    });
  },
  // Fetching single question by question id
  getQuestionById: (req, res) => {
    //id is question id
    var id = req.params.id;
    // console.log(id)
    questionById(id, (err, results) => {
      if (err) {
        console.log(id);
        console.log(err);
        return res.status(500).json({ msg: "database connection error" });
      }
      if (!results) {
        return res.status(400).json({ msg: "Record not found" });
      }
      return res.status(200).json({ data: results });
    });
  },
};
