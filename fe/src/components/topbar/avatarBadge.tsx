import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Box, Tooltip, IconButton, Menu, MenuItem, Typography } from '@mui/material';

interface Props {
  onLogout: () => void;
}
export const AvatarBadge: React.FC<Props> = ({onLogout}) => {

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
      );

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };

      const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
      };

  return (
    <Box sx={{ flexGrow: 0, marginLeft: 1 }}>
       
                <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>

               
              </Tooltip>  
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {/* <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem> */}

                <MenuItem onClick={onLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
  );
}