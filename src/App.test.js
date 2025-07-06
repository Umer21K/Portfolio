import { render, screen } from '@testing-library/react';
import App from './App';

test('renders portfolio welcome text', () => {
  render(<App />);
  const textElement = screen.getByText(/Welcome to my Portfolio/i);
  expect(textElement).toBeInTheDocument();
});
