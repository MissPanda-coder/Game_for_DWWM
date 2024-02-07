// Route pour récupérer une question avec ses réponses
app.get('/question/:id', (req, res) => {
    const questionId = req.params.id;
    const sql = `
      SELECT q.question_text, a.answer_text, a.answer_id, cr.correctreponse_id
      FROM question q
      JOIN answer a ON q.question_id = a.question_id
      LEFT JOIN correctreponse cr ON q.question_id = cr.question_id AND a.answer_id = cr.answer_id
      WHERE q.question_id = ?
    `;
    
    db.query(sql, [questionId], (err, result) => {
      if (err) {
        console.error('Erreur lors de la récupération de la question et de ses réponses :', err);
        res.json({ error: 'Erreur lors de la récupération de la question et de ses réponses', success: false });
      } else {
        const questionData = {
          question_text: result[0].question_text,
          answers: result.map(row => ({
            answer_id: row.answer_id,
            answer_text: row.answer_text,
            is_correct: row.correctreponse_id !== null
          })),
        };
        res.json({ question: questionData, success: true });
      }
    });
  });
  