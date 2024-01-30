import React, { useEffect, useState } from "react";
import CarBlock from "./CarBlock";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { blocksState } from "../Atom/blocksState";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { numberofBlocks } from "../Atom/numberofBlocks";

const Parking: React.FC = () => {
  const navigate = useNavigate();
  const setParkState = useSetRecoilState(blocksState);

  const [numBlocksPerRow, setNumBlocksPerRow] = useState(calculateBlocksPerRow());

  useEffect(() => {
    const storedSpace = localStorage.getItem("numberofBlocks");
    if (storedSpace) {
      navigate("/parking");
    }
  },[]);

  // Retrieve parking state from local storage or use default
  useEffect(() => {
    const storedState = localStorage.getItem("blocksState");
    if (storedState) {
      setParkState(JSON.parse(storedState));
    }
  }, [setParkState]);

  // Get the current state of parking blocks using Recoil
  const parkState = useRecoilValue(blocksState);
  const setNumblock = useSetRecoilState(numberofBlocks);
  // Calculate the number of rows needed based on the number of blocks per row
  const numRows = Math.ceil(parkState.length / numBlocksPerRow);

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
    localStorage.setItem("blocksState", JSON.stringify(parkState));
  }, [parkState]);

  // Event handler for going back to the home page
  const handleGoBack = () => {
    // Clear the local storage
    localStorage.removeItem("blocksState");
    setParkState([]);
    
    localStorage.removeItem("numberofBlocks");
    setNumblock(0);
    // Navigate back to the home page
    navigate("/");
  };

  // Calculate the number of blocks per row based on screen width
  function calculateBlocksPerRow() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1200) {
      return 12; // Large screens
    } else if (screenWidth >= 600) {
      return 8; // Medium screens
    } else {
      return 4; // Small screens
    }
  }

  // Update the number of blocks per row when the window is resized
  const handleResize = () => {
    setNumBlocksPerRow(calculateBlocksPerRow());
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
          flexDirection: "column", // Adjust layout to column on smaller screens
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh", // Ensure the container takes at least the height of the viewport
        }}
      >
        <Grid
          container
          style={{
            display: "flex",
            alignItems: "center",
            width: "80%", // Take full width of the container
            padding: "16px", // Add padding for better spacing
            margin: "auto", // Center the grid
          }}
        >
          <Grid
            item
           
            sm={5} // Take 8 columns on larger screens
            md={3} // Take 6 columns on even larger screens
            lg={2} // Take 4 columns on even larger screens
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
                  .slice(rowIndex * numBlocksPerRow, (rowIndex + 1) * numBlocksPerRow)
                  .map((parkSpace) => (
                    <CarBlock key={parkSpace.id} id={parkSpace.id} />
                  ))}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>

      <Button
        onClick={handleGoBack}
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
