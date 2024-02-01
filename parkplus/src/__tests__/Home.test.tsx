// import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';

test('renders Home component and handles form submission', () => {
  // Mock the useNavigate function
  const mockNavigate = jest.fn();
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
  }));

 render(
  <RecoilRoot>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </RecoilRoot>
);
  

  // Check if the "Welcome to ParkPlus" text is rendered
  expect(screen.getByText('Welcome to ParkPlus')).toBeInTheDocument();

  // Mock user input
  const inputElement = screen.getByPlaceholderText('Enter number of parking spaces') as HTMLInputElement;
  fireEvent.change(inputElement, { target: { value: '50' } });

  // Check if the input value is updated
  expect(inputElement.value).toBe('50');

  // Mock form submission
  const submitButton = screen.getByText('Start Parking');
  fireEvent.click(submitButton);

  // Check if the navigate function was called with the correct path
  //expect(mockNavigate).toHaveBeenCalledWith('/parking');

  // Optionally, you can add assertions for other elements or behaviors as needed
});
