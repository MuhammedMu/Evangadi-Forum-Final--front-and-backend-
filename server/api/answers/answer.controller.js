const { answerQuestion, answerByQuestionId } = require("./answer.service");

module.exports = {
  // Creating questions 
  answerQuestion: (req, res) => {
    const { answer, id, questionId } = req.body;

    //Validation for allfield require
    if (!answer || !id || !questionId) {
      return res
        .status(400)
        .json({ msg: "Not all fields has been provided!!!" });
    }

    //Sending data to answer table
    answerQuestion(req.body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "Database connection error" });
      }
      return res.status(200).json({
        msg: "Answer was successfully inserted",
        data: results,
      });
    });
  },
  // Fetching answer by question id 
  getAnswerByQuestionId: (req, res) => {
    let qId = req.params.id;
    answerByQuestionId(qId, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "Database connection error" });
      }
      if (!results) {
        return res.status(400).json({ msg: "Record not found" });
      }
      return res.status(200).json({ data: results });
    });
  },
};
