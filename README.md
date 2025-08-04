# Recipes App

A React Native mobile application built with Expo that displays recipes with search functionality and detailed recipe views.

## Setup

Install required dependencies:
```bash
npm install
```

## Running the App

Android:
```bash
npx expo run:android
```

iOS:
```bash
npx expo run:ios
```

## Tests

Run tests using:
```bash
npm test
```

## Features

### Recipe List
- Display recipes with name, image, preparation time, and difficulty
- Infinite scroll pagination
- Search recipes by name
- Pull-to-refresh functionality

### Recipe Details
- Complete recipe information including ingredients and instructions
- Rating and review count
- Nutritional information
- Cooking time and servings
- Tags and difficulty level

### Technical Features
- TypeScript with strict mode
- React Navigation with Expo Router
- Custom hooks for state management
- Comprehensive error handling
- Loading states throughout the app
- Responsive design with SafeAreaView
- Full test coverage