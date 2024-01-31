import { render, screen, fireEvent, act } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Carinput from '../pages/Carinput';
import { blocksState } from '../Atom/blocksState';

Storage.prototype.setItem = jest.fn();

describe('Carinput component', () => {
  it('renders correctly', async () => {
    render(
      <RecoilRoot>
        <MemoryRouter initialEntries={['/carinput']} initialIndex={0}>
          <Routes>
            <Route path="/carinput" element={<Carinput />} />
          </Routes>
        </MemoryRouter>
      </RecoilRoot>
    );

    expect(screen.getByText(/Car Entry/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Car Registration Number/i)).toBeInTheDocument();
    expect(screen.getByText(/Go Back/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
  });

  it('handles form submission correctly', async () => {
    render(
      <RecoilRoot>
        <MemoryRouter initialEntries={['/carinput']} initialIndex={0}>
          <Routes>
            <Route path="/carinput" element={<Carinput />} />
          </Routes>
        </MemoryRouter>
      </RecoilRoot>
    );

    const carRegistrationInput = screen.getByLabelText(/Car Registration Number/i);
    fireEvent.change(carRegistrationInput, { target: { value: 'MP 09 NP 3232' } });

    fireEvent.click(screen.getByText(/Submit/i));

    await act(async () => {});

    expect(localStorage.setItem).toHaveBeenCalledWith('blocksState', JSON.stringify([], []));
  });

  it('handles duplicate car registration number submission', async () => {
    const initialBlocksState = [
      { id: 1, parked: true, parked_at: 'mockDate', Car_no: 'MP 09 NP 1234' },
    ];

    render(
      <RecoilRoot initializeState={(snap) => snap.set(blocksState, initialBlocksState)}>
        <MemoryRouter initialEntries={['/carinput']} initialIndex={0}>
          <Routes>
            <Route path="/carinput" element={<Carinput />} />
          </Routes>
        </MemoryRouter>
      </RecoilRoot>
    );

    const carRegistrationInput = screen.getByLabelText(/Car Registration Number/i);
    fireEvent.change(carRegistrationInput, { target: { value: 'MP 09 NP 1234' } });

    fireEvent.click(screen.getByText(/Submit/i));

    expect(screen.getByText(/Car number already present/i)).toBeInTheDocument();
  });
});

describe('Carinput component', () => {
  it('handles navigation and updates current time', async () => {
    jest.useFakeTimers();

    render(
      <RecoilRoot>
        <MemoryRouter initialEntries={['/carinput']} initialIndex={0}>
          <Routes>
            <Route path="/carinput" element={<Carinput />} />
          </Routes>
        </MemoryRouter>
      </RecoilRoot>
    );

    fireEvent.click(screen.getByText(/Go Back/i));

    await act(async () => {});

    expect(window.location.pathname).toBe('/');

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    jest.useRealTimers();
  });
});
