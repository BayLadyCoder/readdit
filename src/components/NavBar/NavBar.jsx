import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import AddIcon from '@mui/icons-material/Add';

import UserNavMenu from '../UserNavMenu/UserNavMenu';

const NavBar = () => {
  const user = useSelector((state) => state.user);

  return (
    <AppBar position='fixed' sx={{ bgcolor: '#fff' }}>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        px={2}
      >
        <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography sx={{ color: '#000' }} variant='h5' component='h1'>
            &#129299; Readdit
          </Typography>
        </Link>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          {user.isLoggedIn ? (
            <>
              <Link to='/posts/new'>
                <Button variant='contained'>
                  <AddIcon sx={{ mr: '5px' }} /> New Post
                </Button>
              </Link>
              <UserNavMenu />
            </>
          ) : (
            <Link to='/login'>
              <Button variant='contained'>Login</Button>
            </Link>
          )}
        </Stack>
      </Stack>
    </AppBar>
  );
};

export default NavBar;
