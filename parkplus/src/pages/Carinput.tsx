import React, { useState, useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { blocksState } from "../Atom/blocksState";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

const Carinput: React.FC = () => {
  // State variable for car registration
  const [carRegistration, setCarRegistration] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  // React Router hooks for location and navigation
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state; // Extracting 'id' from the location state

  // Recoil state hook to update the global state
  const setParkState = useSetRecoilState(blocksState);

  // Recoil hook to get the current state
  const parkState = useRecoilValue(blocksState);

  // Function to handle form submission
  const handleSubmit = () => {
    // Check if the car number is already present
    const isCarAlreadyParked = parkState.some(
      (parkingSpace) =>
        parkingSpace.Car_no &&
        parkingSpace.Car_no.toUpperCase() === carRegistration.toUpperCase()
    );

    if (isCarAlreadyParked) {
      // Car is already parked, clear the input and show a toast message
      setCarRegistration("");
      toast.error("Car number already present");
      return;
    }

    // Set the current time to the 'parkingTime' state
    const currentTime = new Date().toLocaleTimeString();

    // Update Recoil state with the new parking information
    setParkState((prevParkState) =>
      prevParkState.map((parkingSpace) =>
        parkingSpace.id === id
          ? {
              ...parkingSpace,
              parked: true,
              parked_at: currentTime,
              Car_no: carRegistration,
            }
          : parkingSpace
      )
    );

    // Navigate to the '/parking' route after submission
    navigate("/parking");
  };

  useEffect(() => {
    // Save state to local storage whenever the block state changes
    localStorage.setItem("blocksState", JSON.stringify(parkState));
  }, [parkState]);

  useEffect(() => {
    // Update current time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {/* Go Back Button */}
      <Button variant="contained" onClick={() => navigate("/parking")}>
        Go Back
      </Button>
      {/* Form Container */}
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
          margin: "auto",
        }}
      >
        {/* Form Title */}
        <Typography variant="h4" style={{ marginBottom: "20px" }}>
          Car Entry
        </Typography>
        {/* Form Box */}
        <Box
          style={{
            maxWidth: "800px",
            padding: "20px",
            width: "100%",
            border: "4px solid black",
            borderRadius: "20px",
            background: "#f0f0f0",
          }}
        >
          {/* Car Registration Input */}
          <TextField
            type="text"
            label="Car Registration Number in Format MP 09 NP 3232"
            variant="outlined"
          //  value={carRegistration}
            onChange={(e) => {
              const value = e.target.value.toUpperCase();
              const regex = /^[A-Za-z]{2}\s\d{2}\s[A-Za-z]{2}\s\d{4}$/;
              regex.test(value) ? setCarRegistration(value) : setCarRegistration("");
            }}
            sx={{ margin: "20px", width: "95%" }}
          />
          {/* Parking Time Input */}
          <Box style={{ display: "flex", alignItems: "center", gap: "1" }}>
            <TextField
              type="text"
              variant="outlined"
              value={currentTime}
              disabled
              sx={{ margin: "20px" }}
            />
          </Box>
          {/* Submit Button */}
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={carRegistration.length === 0}
          >
            Submit
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Carinput;


//These test cases cover the rendering of the component, form submission, handling duplicate car registration numbers, and you can extend it with additional cases as needed.