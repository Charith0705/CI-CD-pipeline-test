import { render, screen, fireEvent, act } from '@testing-library/react';
import App from './App';

test('renders the game title and start button', () => {
  render(<App />);
  
  // Check for the new Title
  const titleElement = screen.getByText(/Neon Grid/i);
  expect(titleElement).toBeInTheDocument();

  // Check for the Start Button
  const startButton = screen.getByText(/Start Game/i);
  expect(startButton).toBeInTheDocument();
});

test('game starts when start button is clicked', () => {
  render(<App />);

  const startButton = screen.getByText(/Start Game/i);
  
  // Click the start button
  fireEvent.click(startButton);

  // The start button should disappear when the game is playing
  const startButtonAfterClick = screen.queryByText(/Start Game/i);
  expect(startButtonAfterClick).not.toBeInTheDocument();

  // The score should be visible and 0
  const scoreElement = screen.getByText(/Score: 0/i);
  expect(scoreElement).toBeInTheDocument();
});

test('grid renders 9 cells', () => {
  render(<App />);
  
  // We can find the cells by checking if the container has children
  // Or simpler: logic check on the grid container
  // Since our cells don't have text, we can look for the class via container selection (a bit more advanced)
  // or just trust the render. 
  // A simple check is ensuring the container exists:
  const gridContainer = document.querySelector('.game-grid');
  expect(gridContainer).toBeInTheDocument();
  expect(gridContainer.children.length).toBe(9);
});