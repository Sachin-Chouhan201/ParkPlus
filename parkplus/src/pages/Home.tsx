import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { numberofBlocks } from "../Atom/numberofBlocks";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// import { blocksStateUpdater } from '../Atom/blocksState';

const Home: React.FC = () => {
  const [space, setSpace] = useRecoilState<number>(numberofBlocks);
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setSpace(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("numberofBlocks", space.toString());
    navigate("/parking");
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to ParkPlus
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField
          placeholder="Enter number of parking spaces"
          type="number"
          label="Enter number of parking spaces"
          variant="outlined"
          fullWidth
          onChange={handleChange}
          required
          inputProps={{ min: 1, max: 500 }}
        />
        <div style={{ marginTop: "16px" }}>
          <Button type="submit" variant="contained" color="primary">
            Start Parking
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default Home;
