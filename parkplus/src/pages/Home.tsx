import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { numberofBlocks } from '../Atom/numberofBlocks';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { blocksStateUpdater } from '../Atom/blocksState';

const Home: React.FC = () => {
  const [space, setSpace] = useRecoilState<number>(numberofBlocks);
  const navigate = useNavigate();
  const setBlocksState = useSetRecoilState(blocksStateUpdater);
  const location = useLocation();

  useEffect(() => {
    const storedSpace = localStorage.getItem('numberofBlocks');
    if (!storedSpace && location.pathname !== '/') {
      navigate('/');
    }
  }, [navigate, location.pathname]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setSpace(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('numberofBlocks', space.toString());

    const newNumberofBlocks = space;
    setBlocksState(
      Array.from({ length: newNumberofBlocks }, (_, index) => ({
        id: index + 1,
        parked: false,
        parked_at: null,
        Car_no: null,
      }))
    );
    localStorage.setItem('blocksState', JSON.stringify(newNumberofBlocks));
    navigate('/parking');
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to ParkPlus
      </Typography>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TextField
          type="number"
          label="Enter number of parking spaces"
          variant="outlined"
          fullWidth
          onChange={handleChange}
          required
          inputProps={{ min: 1, max: 500 }}
        />
        <div style={{ marginTop: '16px' }}>
          <Button type="submit" variant="contained" color="primary">
            Start Parking
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default Home;
