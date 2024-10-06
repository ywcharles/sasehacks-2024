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
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`

      const prompt = `Create 3 recipe ideas based on these ingredients: ${ingredients.join(
        ", "
      )}. For each recipe, provide a name, a brief description, ingredients' measurements and the instructions. Format the output as follows:

Recipe 1:
Name: [Recipe Name]
Description: [Brief description]
Ingredients: [Ingredients and it's measurements]
Instructions" [Instructions on how to complete the recipe]

Recipe 2:
Name: [Recipe Name]
Description: [Brief description]
Ingredients: [Ingredients and it's measurements]
Instructions" [Instructions on how to complete the recipe]

Recipe 3:
Name: [Recipe Name]
Description: [Brief description]
Ingredients: [Ingredients and it's measurements]
Instructions" [Instructions on how to complete the recipe]
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
    const recipeRegex = /Recipe \d+:\nName: (.+)\nDescription: (.+)/g;
    const parsedRecipes = [];
    let match;

    while ((match = recipeRegex.exec(text)) !== null) {
      parsedRecipes.push({
        name: match[1].trim(),
        description: match[2].trim(),
      });
    }

    return parsedRecipes;
  };

  return { recipes, loading, error, generateRecipes };
};

export default useRecipes;