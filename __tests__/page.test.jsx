import '@testing-library/jest-dom';             // Provides custom jest matchers for DOM node assertions
import { render, screen } from '@testing-library/react';          // Tools for rendering components and querying the DOM
import Page from '../src/app/page';      // Import the Page component to be tested



// Mocking the global fetch function to simulate API responses during tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ rate: 1.19 }),   // Simulate a successful API response with a rate of 1.19
  })
);


// Test suite for the Page component
describe('Page', () => {

  // Test case to verify that the heading is rendered
  it('renders a heading', () => {
    render(<Page />);               // Render the Page component
    const heading = screen.getByRole('heading', { level: 1 });  // Query for the heading element with level 1
    expect(heading).toBeInTheDocument();                       // Assert that the heading is present in the document
  });
});