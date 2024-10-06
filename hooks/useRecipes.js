import { useState, useCallback } from 'react';

const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateRecipes = useCallback(async (ingredients) => {
    try {
      setLoading(true);
      setError(null);

      const apiKey = process.env.GEMINI_KEY
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
      
      const prompt = `Create 3 recipe ideas based on these ingredients: ${ingredients.join(', ')}. For each recipe, provide a name and a brief description. Format the output as a JSON array of objects, each with 'name' and 'description' fields.`;

      const requestBody = {
        contents: [{ parts: [{ text: prompt }] }],
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        const generatedText = data.candidates[0].content.parts[0].text;
        const parsedRecipes = JSON.parse(generatedText);
        setRecipes(parsedRecipes);
      } else {
        throw new Error(data.error.message || 'Failed to generate recipes');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { recipes, loading, error, generateRecipes };
};

export default useRecipes;