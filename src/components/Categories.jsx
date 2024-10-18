import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Label } from "./ui/label"

function Categories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/categories');
      setCategories(response.data.categories);
    } catch (err) {
      setError('Failed to fetch categories');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/v1/categories', { name: newCategory });
      fetchCategories();
      setNewCategory('');
    } catch (err) {
      setError('Failed to add category');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Categories</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="category">New Category</Label>
          <Input
            id="category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Add Category</Button>
      </form>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id} className="bg-white p-4 rounded shadow">
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;