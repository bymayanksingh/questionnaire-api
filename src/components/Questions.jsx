import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    category_id: '',
    level: '',
    true_false_question: false
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchQuestions();
    fetchCategories();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/questions');
      setQuestions(response.data.questions);
    } catch (err) {
      setError('Failed to fetch questions');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/categories');
      setCategories(response.data.categories);
    } catch (err) {
      setError('Failed to fetch categories');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion({ ...newQuestion, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setNewQuestion({ ...newQuestion, true_false_question: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/v1/questions', newQuestion);
      fetchQuestions();
      setNewQuestion({
        question: '',
        category_id: '',
        level: '',
        true_false_question: false
      });
    } catch (err) {
      setError('Failed to add question');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Questions</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="question">Question</Label>
          <Input
            id="question"
            name="question"
            value={newQuestion.question}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select name="category_id" onValueChange={(value) => setNewQuestion({ ...newQuestion, category_id: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="level">Level</Label>
          <Select name="level" onValueChange={(value) => setNewQuestion({ ...newQuestion, level: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select a level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="true_false_question"
            checked={newQuestion.true_false_question}
            onCheckedChange={(checked) => setNewQuestion({ ...newQuestion, true_false_question: checked })}
          />
          <Label htmlFor="true_false_question">True/False Question</Label>
        </div>
        <Button type="submit">Add Question</Button>
      </form>
      <ul className="space-y-2">
        {questions.map((question) => (
          <li key={question.id} className="bg-white p-4 rounded shadow">
            <p><strong>Question:</strong> {question.question}</p>
            <p><strong>Category ID:</strong> {question.category_id}</p>
            <p><strong>Level:</strong> {question.level}</p>
            <p><strong>True/False:</strong> {question.true_false_question ? 'Yes' : 'No'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Questions;