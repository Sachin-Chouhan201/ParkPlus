import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CarPayment from '../pages/CarPayment';
import { blocksState } from '../Atom/blocksState';

(global.fetch as jest.Mock).mockResolvedValueOnce({
  json: () => Promise.resolve({ status: 'success' }),
});

describe('CarPayment component', () => {
  it('handles payment process correctly', async () => {
    const initialBlocksState = [
      {
        id: 1,
        parked: true,
        parked_at: new Date().toISOString(),
        Car_no: 'ABC123',
      },
    ];
    render(
      <RecoilRoot initializeState={(snap) => snap.set(blocksState, initialBlocksState)}>
        <MemoryRouter initialEntries={['/payment/1']} initialIndex={0}>
          <Routes>
            <Route path="/payment/:id" element={<CarPayment id={0} />} />
          </Routes>
        </MemoryRouter>
      </RecoilRoot>
    );

    expect(screen.getByText(/Car Registration Number: ABC123/i)).toBeInTheDocument();
    expect(screen.getByText(/Fare: 0\$/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Pay/i));

    expect(screen.getByText(/Payment In progress Please wait.../i)).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText(/Payment In progress Please wait.../i)).toBeInTheDocument());

    expect(screen.getByText(/Car Entry/i)).toBeInTheDocument();
    expect(screen.getByText(/Fare: 10\$/i)).toBeInTheDocument();
  });

  test('renders CarPayment component with valid props', () => {
    const mockParkState = [
      {
        Car_no: 'ABC123',
        parked_at: '2024-01-31T12:34:56',
        id: 1,
        parked: true,
      },
    ];
    const mockId = 1;

    const { getByText } = render(<CarPayment id={mockId} />);
    expect(getByText(`Car Registration Number: ${mockParkState[mockId - 1].Car_no}`)).toBeInTheDocument();
  });
});
