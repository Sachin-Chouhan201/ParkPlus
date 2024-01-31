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
import { numberofBlocks } from "../Atom/numberofBlocks";

const Parking: React.FC = () => {
  const navigate = useNavigate();
  const setParkState = useSetRecoilState(blocksState);
  const parkState = useRecoilValue(blocksState);
  
  useEffect(() => {
    const storedSpace = localStorage.getItem("numberofBlocks");
    if (!storedSpace) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("blocksState", JSON.stringify(parkState));
  }, [parkState]);

  useEffect(() => {
    const storedState = localStorage.getItem("blocksState");
    if (storedState) {
      setParkState(JSON.parse(storedState));
    }
  }, [setParkState]);

  const setNumblock = useSetRecoilState(numberofBlocks);

  const handleAdd = () => {
    const availableParking = parkState.filter((obj) => !obj.parked);

    if (availableParking.length === 0) {
      toast.error("No available parking spots");
    } else {
      const randomIndex = Math.floor(Math.random() * availableParking.length);
      const selectedParkingSpot = availableParking[randomIndex];
      navigate("/parking/Register", { state: selectedParkingSpot.id });
    }
  };

  const handleGoBack = () => {
    localStorage.removeItem("numberofBlocks");
    setNumblock(0);
    navigate("/");
  };

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
          marginRight: "16px",
          position: "absolute",
          top: "16px",
          right: "16px",
        }}
      >
        Add Car
      </Button>

      <Button
        onClick={handleGoBack}
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
        Go back to the home page
      </Button>

      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          marginTop: "56px",
        }}
      >
        <Grid
          container
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(auto-fill, minmax(150px, 1fr))`,
            gap: "16px",
            width: "80%",
            padding: "16px",
            margin: "auto",
          }}
        >
          {parkState.map((parkSpace) => (
            <CarBlock key={parkSpace.id} id={parkSpace.id} />
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Parking;
