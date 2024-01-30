import React, { useEffect } from "react";
import CarBlock from "./CarBlock";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { blocksState } from "../Atom/blocksState";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const Parking: React.FC = () => {
  const navigate = useNavigate();
  const setParkState = useSetRecoilState(blocksState);
 // console.log(blocksState);
  // Retrieve parking state from local storage or use default
  useEffect(() => {
    const storedState = localStorage.getItem('blocksState');
    if (storedState) {
      setParkState(JSON.parse(storedState));
    }
    console.log(blocksState);
  }, [setParkState]);

  // Get the current state of parking blocks using Recoil
  const parkState = useRecoilValue(blocksState);

  // Calculate the number of rows needed based on the number of blocks per row
  const numRows = Math.ceil(parkState.length / 10);

  // Number of blocks to display in each row
  const blocksPerRow = 15;

  // Event handler for adding a car to a random available parking spot
  const handleAdd = () => {
    const availableParking = parkState.filter((obj) => !obj.parked);

    if (availableParking.length === 0) {
      toast.error("No available parking spots");
    } else {
      const randomIndex = Math.floor(Math.random() * availableParking.length);
      const selectedParkingSpot = availableParking[randomIndex];

      console.log("Selected Parking Spot:", selectedParkingSpot.id);

      // Navigate to the registration page with the selected parking spot's id as state
      navigate("/parking/Register", { state: selectedParkingSpot.id });
    }
  };

  // Save the parking state to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('blocksState', JSON.stringify(parkState));
  }, [parkState]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <Button
        onClick={handleAdd}
        type="submit"
        variant="contained"
        color="primary"
        style={{
          marginTop: "16px",
          marginLeft: "16px",
          position: "absolute",
          top: "16px",
          left: "16px",
        }}
      >
        Add Car
      </Button>

      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Grid
          container
          style={{ display: "flex", alignItems: "center", width: "50%" }}
        >
          <Grid
            item
            xs={20}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            {Array.from({ length: numRows }).map((_, rowIndex) => (
              <Grid
                item
                key={rowIndex}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1rem",
                  margin: "1rem",
                }}
              >
                {parkState
                  .slice(rowIndex * blocksPerRow, (rowIndex + 1) * blocksPerRow)
                  .map((parkSpace) => (
                    <CarBlock key={parkSpace.id} id={parkSpace.id} />
                  ))}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>

      <Button
        onClick={() => navigate("/")}
        type="submit"
        variant="contained"
        color="primary"
        style={{ position: "absolute", bottom: "16px", left: "16px" }}
      >
        Go back to home page
      </Button>
    </>
  );
};

export default Parking;
