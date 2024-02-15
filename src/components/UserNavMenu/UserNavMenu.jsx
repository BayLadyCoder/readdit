import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { deepOrange, grey } from '@mui/material/colors';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

import { logout } from '../../reducers/userSlice';

const UserNavMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <Stack>
      <Button
        sx={{ border: 'solid 1px #eee', color: '#000', textTransform: 'none' }}
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        variant='string'
      >
        <Avatar
          sx={{
            bgcolor: deepOrange[500],
            fontSize: '13px',
            width: 30,
            height: 30,
            mr: '5px',
          }}
        >
          {user.avatarLabel}
        </Avatar>

        {user.username}
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        sx={{ left: '-15px' }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Link
          to='/profile'
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <MenuItem
            align='center'
            sx={{ width: '200px' }}
            onClick={handleClose}
          >
            <AccountCircleIcon bgcolor={grey[700]} sx={{ mr: '10px' }} />{' '}
            <Typography sx={{ fontSize: '0.95rem' }}>Profile</Typography>
          </MenuItem>
        </Link>
        <MenuItem
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.95rem',
          }}
        >
          <Typography sx={{ fontSize: '0.95rem' }}>Online Status</Typography>
          <Switch />
        </MenuItem>
        <MenuItem
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.95rem',
          }}
        >
          Dark Theme
          <Switch />
        </MenuItem>
        <Divider />
        <MenuItem
          sx={{
            fontSize: '0.95rem',
          }}
          onClick={() => {
            dispatch(logout());
            navigate('/');
          }}
        >
          <LogoutIcon sx={{ mr: '10px' }} /> Logout
        </MenuItem>
      </Menu>
    </Stack>
  );
};

export default UserNavMenu;
