import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import axios from 'axios';
import { SearchContext } from '../../context/searchContext';



import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const ITEM_HEIGHT = 48;

export function N() {
  const classes=useStyles();
  const [items, setItems] = useState([]);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(() => {
    if (location.pathname.includes('/art') || location.pathname.includes('/category'))
      return 'arts';
    else if (location.pathname==='/about')
      return 'about';
    else if (location.pathname.includes('/calendar'))
      return 'calendar';
    else
      return 'home';
  });
  const [navMenu, setNavMenu] = React.useState(false);
  const searchContext = React.useContext(SearchContext);


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const url = `http://localhost:${3001}/api/categoriesAll`; //change port if needed
    axios.get(url)
      .then(result => {
          setItems(result.data);
        }
      )
      .catch(err => console.log(err));
  }, [])


  return (
    <Navbar onToggle={() => setNavMenu(!navMenu)} expanded={navMenu} collapseOnSelect expand="lg" bg="dark" variant="dark" className={classes.wrapper}> 
      <Navbar.Brand as={Link} to="/">
        <img
          alt=""
          src="https://avatanplus.com/files/resources/original/5a5e5b230aefb161009400e5.png"
          width="30"
          height="30"
          className={clsx("d-inline-block align-top", classes.logo)}
        />{' '}
        Zell Portfolio
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className={clsx("mr-auto", classes.navLength)}>
          <div className={classes.firstBlockOfThree}>
            <Nav.Link active={activeLink==="home"} as={Link} to="/" onClick={() => {setActiveLink("home"); setNavMenu(false)}}>Home</Nav.Link>
            <hr className={classes.hr} />
            <Nav.Link active={activeLink==="arts"} as={Link} to="/arts" onClick={() => {setActiveLink("arts"); setNavMenu(false); searchContext.handleSettingSearch({search: ""})}}>Arts</Nav.Link>
            <hr className={classes.hr} />
            <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick} className={classes.hideTerribleOrangeBorderInChrome}>
              Categories
            </Button>
            <hr className={classes.hr} />
            <Nav.Link active={activeLink==="calendar"} as={Link} to="/calendarForm" onClick={() => {setActiveLink("calendar"); setNavMenu(false)}}>Calendar</Nav.Link>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: '20ch',
                },
              }}
            >
              {items.map(category => (
                <MenuItem key={category._id} onClick={handleClose}>
                  <Link to={"/category/" + category.name} className={classes.link}
                  active={activeLink==="arts"} onClick={() => {setActiveLink("arts"); setNavMenu(false)}}>{category.name}</Link>
                </MenuItem>
              ))}
            </Menu>
          </div>
          <Nav.Link active={activeLink==="about"} as={Link} to="/about" className={classes.aboutLink} onClick={() => {setActiveLink("about"); setNavMenu(false)}}>About</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}