# Recipes App - Development Guidelines

## Commands

- **Lint**: `npm run lint`
- **Type Check**: `npm run typecheck` 
- **Test**: `npm run test`
- **Test Watch**: `npm run test:watch`
- **Build**: `npm start` (development)

## Project Structure

Based on the current codebase, the project follows this structure:

```
/app
  /screens               # Main screen components
    RecipesListScreen.tsx
    RecipeDetailsScreen.tsx
  /utils                # API utilities and types
    api.ts
    types.ts
  /tests               # All test files
    *.test.tsx
/components            # Reusable UI components
  RecipeCard.tsx
  SearchBar.tsx
  LoadingSpinner.tsx
  ErrorComponent.tsx
  ThemedText.tsx       # Theme-aware text component
  ThemedView.tsx       # Theme-aware view component
/hooks                 # Custom React hooks
  useRecipes.ts
  useThemeColor.ts
/constants             # App constants
  Colors.ts
  Spacing.ts
```

## Functional Requirements

### Recipe List Screen
- ✅ Recipe name, image, preparation time, difficulty
- ✅ Infinite scroll with `onEndReached` 
- ✅ Search by name
- ✅ Pull-to-refresh with `RefreshControl`

### Recipe Details Screen
- ✅ Loading and error handling implemented
- Route: `/recipe/[id].tsx`

## Technical Implementation

### Framework & Dependencies
- **React Native + Expo** (using expo-router for navigation)
- **TypeScript** with strict configuration
- **Testing**: `@testing-library/react-native` + `node:test`
- **Minimal external dependencies** ✅

### Code Style Standards

#### TypeScript Configuration
```json
{
  "strict": true,
  "noUnusedParameters": true, 
  "noUncheckedIndexedAccess": true
}
```

#### Naming Conventions
- ✅ **PascalCase** for components (`RecipeCard`, `SearchBar`)
- ✅ **camelCase** for variables and functions (`handleSearch`, `loadMore`)
- ✅ **UPPER_CASE** for constants (`SPACING`, `BORDER_RADIUS`)

#### Import Organization
- ✅ Use `type` imports where possible: `import type { Recipe } from '@/app/utils/types'`
- ✅ Sorted imports (React first, then external, then internal)
- ✅ No circular dependencies

#### Export Rules
- ✅ Named exports for components (only router files use default exports)
- ✅ One component per file

### Best Practices

#### Component Architecture
- ✅ **Functional components only** with hooks
- ✅ **FlatList** for lists (not `.map()`)
- ✅ **StyleSheet.create** for styles (no inline styles)
- ✅ **useCallback** for functions in JSX
- ✅ **try/catch** around all async/fetch calls

#### Performance Optimizations
- ✅ Separate components for Loading, Error, Empty states
- ✅ Constants used (no magic numbers) 
- ✅ State collocated where used
- ✅ Unused variables prefixed with `_`

#### UI/UX Implementation
- ✅ **SafeAreaView** and responsive design
- ✅ Reusable components for loading, error, empty states
- ✅ Clean, consistent UI with theme support

#### Security
- ✅ API response validation (checking if title and image exist)
- No sensitive data (using public API)

## Current Implementation Status

### ✅ Completed Features
- Recipe list with infinite scroll
- Search functionality 
- Pull-to-refresh
- Recipe details screen
- Loading and error states
- Comprehensive test suite
- Full TypeScript typing
- Theme-aware components

### API Integration
- **Base URL**: `https://dummyjson.com`
- **Endpoints**: 
  - `/recipes` - List recipes with pagination
  - `/recipes/search` - Search recipes
  - `/recipes/{id}` - Get recipe details
- **Error handling**: Proper API error types and validation

### Testing Coverage
Tests implemented for:
- ✅ RecipeCard component
- ✅ SearchBar component  
- ✅ LoadingSpinner component
- ✅ ErrorComponent component
- ✅ useRecipes hook
- ✅ API utilities

## Development Workflow

1. Always run `npm run lint` and `npm run typecheck` before committing
2. Use the existing component patterns and theme system
3. Follow the established folder structure
4. Write tests for new components and hooks
5. Validate API responses before using data
6. Use constants from `/constants` for spacing and styling

## Key Implementation Details

- **Pagination**: 10 recipes per page with proper hasMore logic
- **Theme System**: Uses `useThemeColor` hook for consistent theming
- **Navigation**: Expo Router with typed routes
- **Error Boundaries**: Comprehensive error handling at API and component levels
- **Performance**: Optimized with useCallback, proper FlatList configuration, and efficient re-renders