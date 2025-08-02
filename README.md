# Recipes App 🍳

A React Native mobile application built with Expo that displays recipes with search functionality and detailed recipe views.

## Features

### ✅ Recipe List
- Display recipes with name, image, preparation time, and difficulty
- Infinite scroll pagination
- Search recipes by name
- Pull-to-refresh functionality

### ✅ Recipe Details
- Complete recipe information including ingredients and instructions
- Rating and review count
- Nutritional information
- Cooking time and servings
- Tags and difficulty level

### ✅ Technical Features
- TypeScript with strict mode
- React Navigation with Expo Router
- Custom hooks for state management
- Comprehensive error handling
- Loading states throughout the app
- Responsive design with SafeAreaView
- Full test coverage

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm start
   ```

3. **Run on device**
   - Scan the QR code with Expo Go (Android) or Camera app (iOS)
   - Or press 'a' for Android emulator, 'i' for iOS simulator

## Available Scripts

```bash
npm start          # Start Expo development server
npm run android    # Run on Android device/emulator
npm run ios        # Run on iOS device/simulator
npm run web        # Run in web browser
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript type checking
npm run test       # Run tests
npm run test:watch # Run tests in watch mode
```

## Project Structure

```
app/
├── (tabs)/           # Tab navigation screens
├── recipe/           # Recipe detail dynamic routes
├── screens/          # Screen components
├── utils/            # API utilities and types
├── tests/            # Test files
components/           # Reusable components
├── LoadingSpinner.tsx
├── ErrorComponent.tsx
├── SearchBar.tsx
└── RecipeCard.tsx
constants/            # Design tokens and constants
hooks/                # Custom React hooks
```

## API

The app uses the [DummyJSON Recipes API](https://dummyjson.com/recipes):
- `GET /recipes` - List recipes with pagination
- `GET /recipes/search` - Search recipes by name
- `GET /recipes/{id}` - Get recipe details

## Dependencies Note

This project uses React 19 which may cause peer dependency conflicts with some testing libraries. The `.npmrc` file is configured with `legacy-peer-deps=true` to resolve these conflicts.

## Development Guidelines

- **TypeScript**: Strict mode enabled with `noUnusedParameters` and `noUncheckedIndexedAccess`
- **Components**: One component per file, functional components only
- **Styling**: No inline styles, use `StyleSheet.create`
- **Navigation**: File-based routing with Expo Router
- **State**: Custom hooks with proper error handling
- **Testing**: Comprehensive test coverage for components and hooks

## Built With

- React Native 0.79
- Expo 53
- TypeScript 5.8
- Expo Router 5.1
- React Navigation 7
- @testing-library/react-native