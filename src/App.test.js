import { render, screen } from '@testing-library/react';
import App from './App';

// Mock window.matchMedia for Ant Design
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

test('renders landing page', async () => {
  render(<App />);
  const linkElement = await screen.findByText(/1 day delivery/i);
  expect(linkElement).toBeInTheDocument();
});
