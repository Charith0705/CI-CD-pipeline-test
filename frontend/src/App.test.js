import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Catch the Box heading', () => {
  render(<App />);
  const heading = screen.getByText(/catch the box/i);
  expect(heading).toBeInTheDocument();
});
