import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { numberofBlocks } from '../Atom/numberofBlocks';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const Home: React.FC = () => {
  const [space, setSpace] = useRecoilState<number>(numberofBlocks);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there is a value in localStorage
    const storedSpace = localStorage.getItem('numberofBlocks');
    if (storedSpace) {
      // If there is, navigate to the parking page
      navigate('/parking');
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setSpace(value >= 0 && value <= 121 ? value : 0);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Number of parking spaces: home page', space);
        // Save the number of parking spaces to local storage
    localStorage.setItem('numberofBlocks', space.toString());
  
    // Use the callback to ensure data is set before navigating
    const storedSpace = localStorage.getItem('numberofBlocks');
    console.log('Number of parking spaces: home page in local storage', storedSpace);
    
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
          inputProps={{ min: 1, max: 121 }}
        />
        <div style={{ marginTop: '16px' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Start Parking
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default Home;