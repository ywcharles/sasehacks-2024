import { useState, useCallback } from 'react';
import axios from 'axios';

import { FOODADVISOR_KEY } from '@env';

const useFoodvisor = (uri) => {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeImageWithFoodvisor = useCallback(async (imageUri) => {
    const apiUrl = "https://vision.foodvisor.io/api/1.0/en/analysis/"
    const apiKey = FOODADVISOR_KEY;

    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpg', 
      name: 'photo.jpg',
    });

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Api-Key ${apiKey}`,
        },
      });

      const foods = []
      const responseItems = response.data.items
      for (let i = 0; i < responseItems.length; i++){
        foods.push(responseItems[i].food[0].food_info.display_name)
      }

      setIngredients(foods);
    } catch (error) {
      console.error('Error analyzing image:', error);
      setError('Failed to analyze image');
    } finally {
      setLoading(false);
    }
  }, []);

  return { ingredients, analyzeImageWithFoodvisor, loading, error };
};

export default useFoodvisor;
