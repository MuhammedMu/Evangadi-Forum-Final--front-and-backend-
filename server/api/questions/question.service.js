const pool = require('../../config/database').pool;

module.exports = {
  // Query to insert question to question table
  addQuestion: (data, callback) => {
    pool.query(
      `INSERT INTO question(question,question_description,question_code_block,tags,post_id,user_id)VALUES(?,?,?,?,?,?)`,
      [
        data.question,
        data.questionDescription,
        data.questionCodeBlock,
        data.tags,
        data.postId,
        data.id,
      ],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
  // Query to fetch all questions
  getAllQuestions: (callback) => {
    pool.query(
      `SELECT registration.user_name, question,question_description,question_code_block,tags,post_id,question_id FROM question JOIN registration ON question.user_id = registration.user_id  ORDER BY question_id DESC`,
      [],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
  // Query to fetch single questions
  questionById: (id, callback) => {
    //id is question id
    pool.query(
      `SELECT * FROM question WHERE question_id = ?`,
      [id],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result[0]);
      }
    );
  },
};