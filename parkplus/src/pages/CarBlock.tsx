import React from "react";
import { useRecoilValue } from "recoil";
import { blocksState } from "../Atom/blocksState";
import { useNavigate } from "react-router-dom";

// Import Material-UI components
import Button from "@mui/material/Button";

interface CarBlockProps {
  id: number;
}

const CarBlock: React.FC<CarBlockProps> = ({ id }) => {
  // Get the current state of the parking blocks using Recoil
  const blockStateData = useRecoilValue(blocksState);

  // Check if the current parking block is parked
  const parked = blockStateData[id - 1].parked;

  // React Router hook for navigation
  const navigate = useNavigate();

  // Event handler for the button click
  const handleClick = () => {
    if (!parked) {
      console.log("Car is not parked");
      navigate("/parking/Register", { state: id });
    } else {
      console.log(id, parked);
      navigate("/parking/carDetails", { state: id });
    }

    // Navigate to the car details page with the current block's id as state
  };

  return (
    <div>
      {/* Material-UI Button for car block */}
      <Button
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: parked ? "LightGray" : " ",
          color: "black",
          border: "1px solid black",
          margin: "4px",
        }}
        onClick={handleClick}
      >
        {parked ? <p>Details of Car at {id}</p> : <p>Add Car at {id}</p>}
      </Button>
    </div>
  );
};

export default CarBlock;