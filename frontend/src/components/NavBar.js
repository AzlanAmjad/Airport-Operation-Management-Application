import { AppBar, Button, Toolbar, Grid, Typography, Link } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";

const NavBar = (props) => {
  // anchor for menu
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  // functions to handle menu
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClick = (path) => {
    setAnchorEl(null);
    navigate(path);
  };

  return (
    <div>
      <AppBar>
        <Toolbar>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item>
              <FlightTakeoffIcon fontSize="large" />
            </Grid>

            <Grid item>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Typography variant="h2">YYC International Airport</Typography>
              </Box>
            </Grid>

            <Grid item>
              <Box sx={{ display: { xs: "none", sm: "flex" } }}>Menu</Box>
            </Grid>

            <Grid item>
              <Box sx={{ display: { xs: "flex", sm: "none" } }}>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={handleMenu}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem onClick={() => handleMenuClick("/")}>Home</MenuItem>
                  <MenuItem onClick={() => handleMenuClick("/store")}>
                    Store
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuClick("/about")}>
                    About
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuClick("/login")}>
                    Login
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuClick("/signup")}>
                    Signup
                  </MenuItem>
                </Menu>
              </Box>
              <Box
                sx={{ display: { xs: "none", sm: "flex" }, width: '170px'}}
                direction="row"
                justifyContent="space-between"
              >
                <Button variant="contained" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button variant="contained" onClick={() => navigate("/signup")}>
                  Signup
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
