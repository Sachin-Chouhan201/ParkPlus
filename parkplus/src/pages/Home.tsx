import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useRecoilState } from 'recoil';
import { numberofBlocks } from '../Atom/numberofBlocks';
import 'react-toastify/dist/ReactToastify.css';

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
    setSpace(value >= 0 ? value : 0);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (space > 0) {
      console.log('Number of parking spaces: home page', space);
  
      // Save the number of parking spaces to local storage
      localStorage.setItem('numberofBlocks', space.toString());
  
      // Use the callback to ensure data is set before navigating
      const storedSpace = localStorage.getItem('numberofBlocks');
      console.log('Number of parking spaces: home page in local storage', storedSpace);
      
      navigate('/parking');
    } else {
      toast.error('Please enter a valid number greater than zero.');
    }
  };
  
  

  return (
    <Container maxWidth="sm">
      <Toaster position="top-center" reverseOrder={false} />
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to ParkPlus
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          type="number"
          label="Enter number of parking spaces"
          variant="outlined"
          fullWidth
          onChange={handleChange}
          required
        />
        <div>
          <Button 
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: '16px', alignItems: 'center', justifyContent: 'center', display: 'flex', marginLeft: 'auto', marginRight: 'auto' }}
          >
            Start Parking
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default Home;
