import { render, screen, fireEvent } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router } from 'react-router-dom';
import Parking from '../pages/Parking';

test('renders Parking component and handles add car button click', () => {
  render(
    <RecoilRoot>
      <Router>
        <Parking />
      </Router>
    </RecoilRoot>
  );

  expect(screen.getByText('Add Car')).toBeInTheDocument();

  const availableParking = [
    { id: 1, parked: false },
    { id: 2, parked: false },
  ];

  jest.mock('recoil', () => ({
    ...jest.requireActual('recoil'),
    useRecoilValue: jest.fn(() => availableParking),
  }));

  fireEvent.click(screen.getByText('Add Car'));

  expect(window.location.pathname).toBe('/');
});

