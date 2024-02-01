import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CarPayment from '../pages/CarPayment';
import { blocksState } from '../Atom/blocksState';

(global.fetch as jest.Mock).mockResolvedValueOnce({
  json: () => Promise.resolve({ status: 'success' }),
});

describe('CarPayment component', () => {
  it('renders CarPayment component with loading state', async () => {
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
    expect(screen.getByAltText('my-gif')).toBeInTheDocument(); // Ensure the loading gif is present

    await waitFor(() => {
      expect(screen.getByText(/Car Entry/i)).toBeInTheDocument();
      expect(screen.getByText(/Fare: 10\$/i)).toBeInTheDocument();
    });
  });

  it('renders CarPayment component without loading state', () => {
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

    expect(screen.queryByText(/Payment In progress Please wait.../i)).not.toBeInTheDocument();
    expect(screen.queryByAltText('my-gif')).not.toBeInTheDocument(); // Ensure the loading gif is not present
  });

  // Add more test cases as needed to cover other lines
});



const mockLocation = {
  state: 1
};

test('calls payDone function when Pay button is pressed', async () => {
  const mockParkingData = [
    { id: 0, Car_no: 'ABC123', parked_at: new Date().toLocaleTimeString(), parked: true },
    { id: 1, Car_no: 'ABC123', parked_at: new Date().toLocaleTimeString(), parked: true },
  ];
  // const mockedResponse = { code: 200, description: 'OK' };

  // jest.spyOn(axios, 'post').mockResolvedValueOnce(mockedResponse);

  const { getByText } = render(
    <RecoilRoot initializeState={({ set }) => set(blocksState, mockParkingData)}>
      <MemoryRouter initialEntries={[{ pathname: '/lot/car', state: mockLocation.state }]}>
        <CarPayment id={0} />
      </MemoryRouter>
    </RecoilRoot>
  );

  const payButton = getByText('Pay');

  fireEvent.click(payButton);

});