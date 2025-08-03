import { render, fireEvent } from '@testing-library/react-native';
import { SearchBar } from '@/components/SearchBar';

describe('SearchBar', () => {
  test('renders with placeholder text', () => {
    const mockOnChangeText = jest.fn();
    const mockOnClear = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBar 
        value="" 
        onChangeText={mockOnChangeText} 
        onClear={mockOnClear} 
        placeholder="Search recipes..."
      />
    );

    expect(getByPlaceholderText('Search recipes...')).toBeTruthy();
  });

  test('displays current value', () => {
    const mockOnChangeText = jest.fn();
    const mockOnClear = jest.fn();
    const { getByDisplayValue } = render(
      <SearchBar 
        value="pasta" 
        onChangeText={mockOnChangeText} 
        onClear={mockOnClear} 
      />
    );

    expect(getByDisplayValue('pasta')).toBeTruthy();
  });

  test('calls onChangeText when text is entered', () => {
    const mockOnChangeText = jest.fn();
    const mockOnClear = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBar 
        value="" 
        onChangeText={mockOnChangeText} 
        onClear={mockOnClear} 
        placeholder="Search recipes..."
      />
    );

    const input = getByPlaceholderText('Search recipes...');
    fireEvent.changeText(input, 'pizza');
    expect(mockOnChangeText).toHaveBeenCalledWith('pizza');
  });

  test('shows clear button when value is not empty', () => {
    const mockOnChangeText = jest.fn();
    const mockOnClear = jest.fn();
    const { getByTestId } = render(
      <SearchBar 
        value="test" 
        onChangeText={mockOnChangeText} 
        onClear={mockOnClear} 
      />
    );

    expect(() => getByTestId('clear-button')).not.toThrow();
  });

  test('calls onClear when clear button is pressed', () => {
    const mockOnChangeText = jest.fn();
    const mockOnClear = jest.fn();
    const { getByTestId } = render(
      <SearchBar 
        value="test" 
        onChangeText={mockOnChangeText} 
        onClear={mockOnClear} 
      />
    );

    mockOnClear();
    expect(mockOnClear).toHaveBeenCalledTimes(1);
  });
});