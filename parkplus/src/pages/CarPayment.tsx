import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { blocksState } from "../Atom/blocksState";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

interface CarProps {
  id: number;
}

const CarPayment: React.FC<CarProps> = () => {
  const navigate = useNavigate();
  const [parkState, setParkState] = useRecoilState(blocksState);
  const [fare, setFare] = useState(0);
  const [curr, setCurr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDisabled, setDisabled] = useState<boolean>(true);
  const location = useLocation();
  const id = location.state;

  // Function to save payment details to local storage
  // const savePaymentToLocalStorage = () => {
  //   localStorage.setItem(`paymentStatus-${id}`, JSON.stringify({ paid: true, fare, timestamp: Date.now() }));
  // };

  useEffect(() => {
    const time1 = new Date("2000/01/01 " + parkState[id - 1].parked_at).getTime();
  
    const calculateFare = () => {
      const currentTime = performance.now();
      const timeElapsed: number = (currentTime - time1) / (1000 * 60 * 60);
  
      setCurr(new Date(currentTime).toLocaleTimeString());
  
      if (timeElapsed <= 2) {
        setFare(10);
      } else {
        const extraHours = Math.ceil(timeElapsed - 2);
        setFare(10 + extraHours * 10);
      }
  
      // Calculate fare every 100 milliseconds
      setTimeout(calculateFare, 1000);
    };
  
    calculateFare();
  
    return () => {
      // Clear any remaining timeouts when component unmounts
      clearTimeout(undefined);
    };
  }, [id, parkState]);

  const fetchPay = async () => {
    const body = {
      "car-registration": parkState[id - 1].Car_no,
      "charge": fare,
    };
    const res = await fetch('https://httpstat.us/200', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    console.log(data);
  };

  const payDone = () => {
    setParkState((prevParkState) => {
      return prevParkState.map((parkingSpace) => {
        if (parkingSpace.id === id) {
          return {
            ...parkingSpace,
            parked: false,
            parked_at: null,
            fare: 0,
            Car_no: null,
          };
        } else {
          return parkingSpace;
        }
      });
    });

    // savePaymentToLocalStorage();

    setLoading(false);
    navigate("/parking");
  };

  const handlePay = () => {
    setDisabled(false);
    fetchPay();
    setLoading(true);
    setTimeout(payDone, 3000);
  };

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Button
        variant="contained"
        onClick={() => {
          navigate("/parking");
        }}
        disabled={!isDisabled}
        style={{ marginBottom: "20px", alignSelf: "flex-start" }}
      >
        Go Back
      </Button>
      <Box
        style={{
          border: "4px solid #f0f0f0",
          borderRadius: "20px",
          padding: "20px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          {loading ? (
            <div>
              <Typography variant="h4">
                Payment In progress Please wait...
              </Typography>
              <img src={"https://tenor.com/view/mc-gregor-pay-up-gif-8865194"} alt="my-gif" />
            </div>
          ) : (
            <>
              <Typography variant="h4">Car Entry</Typography>
              <div>
                <p>Car Registration Number: {parkState[id - 1].Car_no}</p>
                <p>Time parked at: {parkState[id - 1].parked_at}</p>
                <p>Current Time: {curr}</p>
                <p>Fare: {fare}$</p>
              </div>
              <Button
                variant="contained"
                onClick={handlePay}
                disabled={fare === 0}
                style={{ marginTop: "20px" }}
              >
                Pay
              </Button>
            </>
          )}
        </div>
      </Box>
    </Container>
  );
};

export default CarPayment;

