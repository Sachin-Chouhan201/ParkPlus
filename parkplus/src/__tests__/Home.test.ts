// import { fireEvent, render, screen } from '@testing-library/react';
// import Home from '../pages/Home';
// import { useNavigate } from 'react-router-dom';
// import Home from '../pages/Home'; // Add this import statement

// // Mock useNavigate
// jest.mock('react-router-dom', () => ({
//     ...jest.requireActual('react-router-dom'),
//     useNavigate: () => ({
//         navigate: jest.fn(),
//     }),
// }));

// describe('Home Page', () => {
//     test('it should navigate when the submit button is clicked', () => {
//         // Mock the navigate function
//         const navigateMock = jest.fn();
//         (useNavigate as jest.Mock).mockReturnValue({ navigate: navigateMock });

//         // Render the component
//         render(<Home />);

//         // Find input and submit button
//         const inputField = screen.getByTestId('parking-spaces-input');
//         const submitButton = screen.getByLabelText('Submit');

//         // Simulate user input
//         fireEvent.change(inputField, { target: { value: '10' } });

//         // Simulate button click
//         fireEvent.click(submitButton);

//         // Check if navigate was called with the expected path
//         expect(navigateMock).toHaveBeenCalledWith('/parking');
//     });

//     test('renders without crashing', () => {
//         // Render the component
//         render(<Home />);
//         // You might want to add an actual assertion here.
//         // For example, you can check if an element is present in the rendered component.
//         const someElement = screen.getByTestId('some-element');
//         expect(someElement).toBeInTheDocument();
//     });
// });

// describe('Home Page', () => {
//   test('it should navigate when the submit button is clicked', () => {
//     // Mock the navigate function
//     const navigateMock = jest.fn();
//     (useNavigate as jest.Mock).mockReturnValue({ navigate: navigateMock });

//     // Render the component
//     render(<Home />); // Replace <typeof Home /> with <Home />

//     // Find input and submit button
//     const inputField = screen.getByTestId('parking-spaces-input');
//     const submitButton = screen.getByLabelText('Submit');

//     // Simulate user input
//     fireEvent.change(inputField, { target: { value: '10' } });

//     // Simulate button click
//     fireEvent.click(submitButton);

//     // Check if navigate was called with the expected path
//     expect(navigateMock).toHaveBeenCalledWith('/parking');
//   });

//   test('renders without crashing', () => {
//     // Render the component
//     render(<Home />);
//     // You might want to add an actual assertion here.
//     // For example, you can check if an element is present in the rendered component.
//     const someElement = screen.getByTestId('some-element');
//     expect(someElement).toBeInTheDocument();
//   });
// });
