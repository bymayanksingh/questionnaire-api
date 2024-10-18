import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

function Answers() {
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [newAnswer, setNewAnswer] = useState({
    answer: '',
    question_id: '',
    correct_answer: false
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnswers();
    fetchQuestions();
  }, []);

  const fetchAnswers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/answers');
      setAnswers(response.data.answers);
    } catch (err) {
      setError('Failed to fetch answers');
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/questions');
      setQuestions(response.data.questions);
    } catch (err) {
      setError('Failed to fetch questions');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAnswer({ ...newAnswer, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/v1/answers', newAnswer);
      fetchAnswers();
      setNewAnswer({
        answer: '',
        question_id: '',
        correct_answer: false
      });
    } catch (err) {
      setError('Failed to add answer');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Answers</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="answer">Answer</Label>
          <Input
            id="answer"
            name="answer"
            value={newAnswer.answer}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="question">Question</Label>
          <Select name="question_id" onValueChange={(value) => setNewAnswer({ ...newAnswer, question_id: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select a question" />
            </SelectTrigger>
            <SelectContent>
              {questions.map((question) => (
                <SelectItem key={question.id} value={question.id.toString()}>{question.question}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="correct_answer"
            checked={newAnswer.correct_answer}
            onCheckedChange={(checked) => setNewAnswer({ ...newAnswer, correct_answer: checked })}
          />
          <Label htmlFor="correct_answer">Correct Answer</Label>
        </div>
        <Button type="submit">Add Answer</Button>
      </form>
      <ul className="space-y-2">
        {answers.map((answer) => (
          <li key={answer.id} className="bg-white p-4 rounded shadow">
            <p><strong>Answer:</strong> {answer.answer}</p>
            <p><strong>Question ID:</strong> {answer.question_id}</p>
            <p><strong>Correct:</strong> {answer.correct_answer ? 'Yes' : 'No'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Answers;