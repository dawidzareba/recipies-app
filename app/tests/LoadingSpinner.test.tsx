import { render } from '@testing-library/react-native';
import { LoadingSpinner } from '@/components/LoadingSpinner';

describe('LoadingSpinner', () => {
  test('renders with default message', () => {
    const { getByText } = render(<LoadingSpinner />);
    expect(getByText('Loading...')).toBeTruthy();
  });

  test('renders with custom message', () => {
    const { getByText } = render(<LoadingSpinner message="Loading recipes..." />);
    expect(getByText('Loading recipes...')).toBeTruthy();
  });

  test('renders without message when message is empty', () => {
    const { queryByText } = render(<LoadingSpinner message="" />);
    expect(queryByText('Loading...')).toBeNull();
  });

  test('renders ActivityIndicator', () => {
    const { getByTestId } = render(<LoadingSpinner />);
    expect(() => getByTestId('activity-indicator')).not.toThrow();
  });
});