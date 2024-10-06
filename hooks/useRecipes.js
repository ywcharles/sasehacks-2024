import { useState, useCallback } from "react";

const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateRecipes = useCallback(async (ingredients) => {
    try {
      setLoading(true);
      setError(null);

      const apiKey = "AIzaSyCqOUfraYwP_Ek_fE0MGxHntlYIxine2HI";
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

      // Modify the prompt to ask for JSON formatted response
      const prompt = `Create 3 unique and creative recipe ideas based on some or all of these ingredients: ${ingredients.join(
        ", "
      )}. 

Important guidelines:
1. You don't need to use all the ingredients listed. Use at least 2-3 of them in each recipe.
2. Limit additional ingredients to a maximum of 3-4 common household items per recipe.
3. Focus on simple, easy-to-make recipes that don't require specialized equipment.
4. Provide precise measurements for ingredients (e.g., "1 cup", "2 tablespoons", not "some" or "a handful").
5. Keep instructions concise but clear, with no more than 5-6 steps per recipe.

For each recipe, provide:
1. A creative name
2. A brief, enticing description (1-2 sentences)
3. A list of ingredients with measurements
4. Clear, step-by-step instructions

Format the output as a JSON object with the following structure:

[
  {
    "name": "[Recipe Name]",
    "description": "[Brief Description]",
    "ingredients": [
      "[Ingredient 1 with measurement]",
      "[Ingredient 2 with measurement]",
      ...
    ],
    "instructions": [
      "[Step 1]",
      "[Step 2]",
      ...
    ]
  },
  ...
]
`;

      const requestBody = {
        contents: [{ parts: [{ text: prompt }] }],
      };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok && data.candidates && data.candidates.length > 0) {
        const generatedJSON = data.candidates[0].content.parts[0].text.replace(/^```json|```$/g, '');
        console.log(generatedJSON)
        const parsedRecipes = JSON.parse(generatedJSON); // Parse the response as JSON

        // Validate if recipes are correctly parsed
        if (Array.isArray(parsedRecipes) && parsedRecipes.length > 0) {
          setRecipes(parsedRecipes);
        } else {
          throw new Error("No valid recipes found. Please try again.");
        }
      } else {
        throw new Error(data.error?.message || "Failed to generate recipes");
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
