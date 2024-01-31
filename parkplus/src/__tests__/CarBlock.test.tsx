// import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { MemoryRouter } from "react-router-dom";
import CarBlock from "../pages/CarBlock";
import { blocksState } from "../Atom/blocksState";
// Mock the useNavigate hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

// Mock the localStorage.setItem method
Storage.prototype.setItem = jest.fn();


// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock the localStorage.setItem method
Storage.prototype.setItem = jest.fn();


describe("CarBlock component", () => {
  it("renders correctly when not parked", () => {
    const id = 1;
    const blockStateData = [
      { id: 1, parked: false, parked_at: null, Car_no: null },
      // Add more sample data if needed
    ];

    render(
      <RecoilRoot initializeState={(snap) => snap.set(blocksState, blockStateData)}>
        <MemoryRouter>
          <CarBlock id={id} />
        </MemoryRouter>
      </RecoilRoot>
    );

    const addButton = screen.getByText(/Add Car at 1/i);
    expect(addButton).toBeInTheDocument();
  });

  it("renders correctly when parked", () => {
    const id = 1;
    const blockStateData = [
      { id: 1, parked: true, parked_at: new Date().toISOString(), Car_no: "ABC123" },
      // Add more sample data if needed
    ];

      
    render(
      <RecoilRoot initializeState={(snap) => snap.set(blocksState, blockStateData)}>
        <MemoryRouter>
          <CarBlock id={id} />
        </MemoryRouter>
      </RecoilRoot>
    );

    const detailsButton = screen.getByText(/Details of Car at 1/i);
    expect(detailsButton).toBeInTheDocument();
  });

  it("handles click event correctly", () => {
    const id = 1;
    const blockStateData = [
      { id: 1, parked: false, parked_at: null, Car_no: null },
      // Add more sample data if needed
    ];

    render(
      <RecoilRoot initializeState={(snap) => snap.set(blocksState, blockStateData)}>
        <MemoryRouter>
          <CarBlock id={id} />
        </MemoryRouter>
      </RecoilRoot>
    );

    const addButton = screen.getByText(/Add Car at 1/i);
    fireEvent.click(addButton);

    // Ensure useNavigate was called with the correct arguments
    expect(mockNavigate).toHaveBeenCalledWith("/parking/Register", {
      state: id,
    });

     });
     it('handles click event correctly', () => {
      const id = 1;
      const blockStateData = [
        { id: 1, parked: true, parked_at: new Date().toISOString(), Car_no: 'ABC123' },
        // Add more sample data if needed
      ];
  
      render(
        <RecoilRoot initializeState={(snap) => snap.set(blocksState, blockStateData)}>
          <MemoryRouter>
            <CarBlock id={id} />
          </MemoryRouter>
        </RecoilRoot>
      );
  
      const detailsButton = screen.getByText(/Details of Car at 1/i);
      fireEvent.click(detailsButton);
  
      // Ensure useNavigate was called with the correct arguments
      expect(mockNavigate).toHaveBeenCalledWith('/parking/carDetails', {
        state: id,
      });
    });
});
