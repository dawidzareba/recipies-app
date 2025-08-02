import { render, fireEvent } from '@testing-library/react-native';
import { ErrorComponent } from '@/components/ErrorComponent';

describe('ErrorComponent', () => {
  test('renders error message', () => {
    const { getByText } = render(
      <ErrorComponent message="Something went wrong" />
    );
    expect(getByText('Something went wrong')).toBeTruthy();
  });

  test('renders retry button when onRetry is provided', () => {
    const mockOnRetry = jest.fn();
    const { getByText } = render(
      <ErrorComponent 
        message="Network error" 
        onRetry={mockOnRetry}
      />
    );
    expect(getByText('Try Again')).toBeTruthy();
  });

  test('does not render retry button when onRetry is not provided', () => {
    const { queryByText } = render(
      <ErrorComponent message="Error occurred" />
    );
    expect(queryByText('Try Again')).toBeNull();
  });

  test('calls onRetry when retry button is pressed', () => {
    const mockOnRetry = jest.fn();
    const { getByText } = render(
      <ErrorComponent 
        message="Network error" 
        onRetry={mockOnRetry}
      />
    );

    fireEvent.press(getByText('Try Again'));
    expect(mockOnRetry).toHaveBeenCalledTimes(1);
  });

  test('renders custom retry text', () => {
    const mockOnRetry = jest.fn();
    const { getByText } = render(
      <ErrorComponent 
        message="Network error" 
        onRetry={mockOnRetry}
        retryText="Retry Now"
      />
    );
    expect(getByText('Retry Now')).toBeTruthy();
  });
});