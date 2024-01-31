import React from "react";
import { useRecoilValue } from "recoil";
import { blocksState } from "../Atom/blocksState";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

interface CarBlockProps {
  id: number;
}

const CarBlock: React.FC<CarBlockProps> = ({ id }) => {
  const blockStateData = useRecoilValue(blocksState);
  const navigate = useNavigate();
console.log(blocksState);
  const parked = blockStateData[id - 1].parked;

  const handleClick = () => {
    if (!parked) {
      console.log("Car is not parked");
      navigate("/parking/Register", { state: id });
    } else {
     // console.log(id, parked);
      navigate("/parking/carDetails", { state: id });
    }
  };

  // Save state to local storage whenever the block state changes
  React.useEffect(() => {
    localStorage.setItem("blocksState", JSON.stringify(blockStateData));
  }, [blockStateData]);

  return (
    <div>
      <Button
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: parked ? "Red" : "Green",
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
