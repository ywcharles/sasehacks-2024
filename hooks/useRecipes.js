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

      const prompt = `Create 3 unique and creative recipe ideas based on some or all of these ingredients: ${ingredients.join(", ")}. 

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

Format the output as follows:

Recipe 1:
Name: [Creative Recipe Name]
Description: [Brief, enticing description]
Ingredients:
- [Ingredient 1 with measurement]
- [Ingredient 2 with measurement]
- ...
Instructions:
1. [Step 1]
2. [Step 2]
3. ...

Recipe 2:
[Same format as Recipe 1]

Recipe 3:
[Same format as Recipe 1]
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

      if (response.ok) {
        const generatedText = data.candidates[0].content.parts[0].text;
        const parsedRecipes = parseGeneratedText(generatedText);
        setRecipes(parsedRecipes);
      } else {
        throw new Error(data.error.message || "Failed to generate recipes");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const parseGeneratedText = (text) => {
    const recipeRegex = /Recipe \d+:\nName: (.+)\nDescription: (.+)\nIngredients:\n([\s\S]+?)\nInstructions:\n([\s\S]+?)(?=\n\nRecipe \d+:|$)/g;
    const parsedRecipes = [];
    let match;

    while ((match = recipeRegex.exec(text)) !== null) {
      parsedRecipes.push({
        name: match[1].trim(),
        description: match[2].trim(),
        ingredients: match[3].trim(),
        instructions: match[4].trim(),
      });
    }

    return parsedRecipes;
  };

  return { recipes, loading, error, generateRecipes };
};

export default useRecipes;