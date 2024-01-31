import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { DefaultValue, RecoilRoot } from 'recoil';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Parking from '../pages/Parking';
import { blocksState } from '../Atom/blocksState';
import { numberofBlocks } from '../Atom/numberofBlocks';

describe('Parking component', () => {
  it('renders Parking component and handles add car button click', () => {
    const initialBlocksState: any[] | DefaultValue | ((prevValue: any[]) => any[] | DefaultValue) = [
      // Your initial parking state here
    
    ];

    const initialNumBlocks = 5;

    // Mocking localStorage
    const localStorageMock = (function () {
      let store: { [key: string]: string } = {};

      return {
        getItem: function (key: string) {
          return store[key] || null;
        },
        setItem: function (key: string, value: string) {
          store[key] = value.toString();
        },
        removeItem: function (key: string) {
          delete store[key];
        },
        clear: function () {
          store = {};
        },
      };
    })();
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    render(
      <RecoilRoot initializeState={(snap) => {
        snap.set(blocksState, initialBlocksState);
        snap.set(numberofBlocks, initialNumBlocks);
      }}>
        <MemoryRouter>
          <Routes>
            <Route path="/parking" element={<Parking />} />
          </Routes>
        </MemoryRouter>
      </RecoilRoot>
    );

    // Check if the "Add Car" button is rendered
    // expect(screen.getByText('Add Car')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Car/i })).toBeInTheDocument();

    // Click the "Add Car" button
    fireEvent.click(screen.getByText('Add Car'));

    // Check if the navigation to "/parking/Register" is triggered
    waitFor(() => expect(screen.getByText('Registration Page')).toBeInTheDocument());
  });

  it('handles go back button click', () => {
    render(
      <RecoilRoot>
        <MemoryRouter initialEntries={['/parking']}>
          <Routes>
            <Route path="/parking" element={<Parking />} />
          </Routes>
        </MemoryRouter>
      </RecoilRoot>
    );

    // Check if the "Go back to the home page" button is rendered
    expect(screen.getByText('Go back to the home page')).toBeInTheDocument();

    // Click the "Go back to the home page" button
    fireEvent.click(screen.getByText('Go back to the home page'));

    // Check if the navigation to the home page is triggered
    waitFor(() => expect(screen.getByText('Home Page')).toBeInTheDocument());
  });
});
