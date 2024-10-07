# Pic-A-Recipe

This app allows users to take a photo of the ingredients they have in their fridge, recognize the ingredients from the image, and get recipe suggestions based on those ingredients. Users can view a list of recognized ingredients, modify the list by adding or deleting items, and then proceed to find recipes that match the ingredients.

## Features
- Take a photo of ingredients using the camera.
- Automatic recognition of food items from the photo.
- Modify, delete, or add new ingredients manually.
- Get recipe suggestions based on the ingredients.

## Technologies Used
- **React Native**: For building the mobile app.
- **React Native Paper**: For UI components like buttons, lists, dialogs, etc.
- **Expo**: For our framework that helps build apps for Android, iOS, and the web using React Native
- **FoodVisor API**: For our food recognition technology
- **Gemini API**: For generating recipes

## Installation

1. **Clone the repository:**
2. Navigate to the project directory
```bash
cd sasehacks-2024
```
3. Install dependencies
```bash
npm install
```
4. Run the app: To run the app on an Android/iOS simulator or a real device, use Expo:
```bash
npx expo start
```
Follow the instructions in the terminal to open the app in an emulator or scan the QR code (must have Expo Go app installed)

## Usage
1. **Take a photo**: Use the camera feature in the app to capture a photo of the ingredients in your fridge.
2. **View Ingredient**: After taking the photo, the app will display a list of recognized food items.
3. **Modify Ingredients**: You can delete, modify, or add new ingredients to the list before proceeding.
4. **Get Recipe Suggestions**: Once the list is finalized, tap on the "Next" button to fetch recipe suggestions based on the provided ingredients.
