import { useState, useCallback } from 'react';

interface UseRecipeSearchReturn {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (query: string) => void;
  handleClearSearch: () => void;
}

interface UseRecipeSearchProps {
  onSearch: (query: string) => void;
  onClearSearch: () => void;
}

export const useRecipeSearch = ({ 
  onSearch, 
  onClearSearch 
}: UseRecipeSearchProps): UseRecipeSearchReturn => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    onSearch(query);
  }, [onSearch]);

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    onClearSearch();
  }, [onClearSearch]);

  return {
    searchQuery,
    setSearchQuery,
    handleSearch,
    handleClearSearch,
  };
};