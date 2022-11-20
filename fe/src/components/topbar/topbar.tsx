import { FC } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import AddAPhoto from "@mui/icons-material/AddAPhoto";
import React from "react";

import {
  alpha,
  Avatar,
  InputBase,
  Link,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  styled,
} from "@mui/material";
import {
  Add,
  DirectionsCar,
  PlaylistAdd,
  TimeToLeave,
} from "@mui/icons-material";
import { SearchBox } from "./search";
import { AvatarBadge } from "./avatarBadge";

const pages = [
  { label: "Vehicles", path: "vehicle/list" },
  { label: "Records", path: "record/list" },
];

const actions = [
  { icon: <PlaylistAdd />, name: "Service Record", path: "record/create" },
  { icon: <DirectionsCar />, name: "Add Vehicle", path: "vehicle/create" },
  { icon: <AddAPhoto />, name: "Add Photo", path: "vehicle/create/simple" },
];
// const settings = ['Profile','Logout'];

interface Props {
  onMenuClick: (path: string) => void;
  onLogout: () => void;
}
export const TopBar: FC<Props> = ({ onMenuClick, onLogout }) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (path: string) => {
    setAnchorElNav(null);
    onMenuClick(path);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.label}
                    onClick={() => handleCloseNavMenu(page.path)}
                  >
                    <Typography textAlign="center">{page.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.label}
                  onClick={() => handleCloseNavMenu(page.path)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.label}
                </Button>
              ))}
            </Box>
            <SearchBox />
            <AvatarBadge onLogout={onLogout} />
          </Toolbar>
        </Container>
      </AppBar>

      <div>
        <SpeedDial
          direction="up"
          ariaLabel="SpeedDial basic example"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              onClick={() => onMenuClick(action.path)}
              icon={action.icon}
              tooltipTitle={action.name}
            ></SpeedDialAction>
          ))}
        </SpeedDial>
      </div>
    </>
  );
};
