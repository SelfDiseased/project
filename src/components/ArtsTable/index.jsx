import React from "react";
import { Link } from 'react-router-dom';
import useStyles from "./styles";
import axios from 'axios';
import clsx from 'clsx';
import useWindowDimentions from '../WindowDimentions/index';
import { SearchContext } from '../../context/searchContext';


import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Image from 'react-bootstrap/Image';

import FilterListIcon from '@material-ui/icons/FilterList';
import Tooltip from '@material-ui/core/Tooltip';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  navButton: {
    display: 'flex', 
    [theme.breakpoints.down('xs')]: {
      flexDirection: "column"
    },
  }
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={clsx(classes.root, classes.navButton)} >
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const notFoundImage = "https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png";

export default function CustomPaginationActionsTable(category) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState(["hey boi"]);
  const [artsCount, setArtsCount] = React.useState(0);
  const [sort, setSort] = React.useState(0);
  const searchLineRef = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { width } = useWindowDimentions();
  const searchContext = React.useContext(SearchContext);

  const ITEM_HEIGHT = 30;

  React.useEffect(() => {
    console.log(sort);
    let url = `http://localhost:${3001}/api/arts?maxArts=${rowsPerPage}&page=${page}&search=${searchContext.search || ""}&category=${category.category}&sort=${sort}`; //change port if needed //sort
    axios.get(url)
    .then(result => {
        setRows(result.data.arts);
        setArtsCount(result.data.artsCount);
      })
      .catch(err => console.log(err));
  }, [page, rowsPerPage, category, searchContext.search, sort])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleSearchOnEnter(event) {
    if (event.keyCode===13)
    {
      searchContext.handleSettingSearch({search: searchLineRef.current.children[1].lastElementChild.value})
      searchLineRef.current.children[1].lastElementChild.value = '';
    }
  }


  //console.log(window.innerWidth);

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableBody>
          <div className={classes.root}>
            <GridList cellHeight={'auto'} className={width<2140 ? classes.gridList : classes.largeGridList} cols={width<570 ? 2 : 4}>
              {rows.length!==0 ? rows.map((art) => (
                <GridListTile key={art._id} cols={art.gridCols || 2} className={width<2140 ? classes.gridImg : classes.LargeGridImg}>
                  <Link to={"/art/" + art._id}>
                    <Image className={clsx("img-responsive", classes.gridImg)} src={art.imageUrl==='some img' ? notFoundImage : art.imageUrl} alt={art.name} />
                    <GridListTileBar
                      title={art.imageUrl==='some img' ? 'Image not found' : art.name}
                    />
                  </Link>
                </GridListTile>
              )) : <h3>No '{searchContext.search}' arts</h3>}
            </GridList>
          </div>


        </TableBody>
        <TableFooter>
          <TableRow>
            <div className={classes.footerRow}>
              <TextField inputProps={{ maxLength: 10 }} id="searchLine" ref={searchLineRef} label="Find art" color="primary" onKeyUp={(event) => handleSearchOnEnter(event)}/>
              <IconButton type="button" className={classes.iconButton} aria-label="search" onClick={() => {searchContext.handleSettingSearch({search: searchLineRef.current.children[1].lastElementChild.value}); searchLineRef.current.children[1].lastElementChild.value = '';}}>
                <SearchIcon />
              </IconButton>

              <Tooltip title="Sort" placement="left-start">
                <IconButton aria-label="Sort list" className={classes.hideTerribleOrangeBorderInChrome}>
                  <FilterListIcon  aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick} />
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
                    <MenuItem>
                      <Link onClick={() => setSort(1)} className={classes.linkColor}>by time (new-old)</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link onClick={() => setSort(2)} className={classes.linkColor}>by time (old-new)</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link onClick={() => setSort(3)} className={classes.linkColor}>by price (low-high)</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link onClick={() => setSort(4)} className={classes.linkColor}>by price (high-low)</Link>
                    </MenuItem>
                  </Menu>
                </IconButton>
              </Tooltip>

              <TablePagination
                rowsPerPageOptions={[2, 10, 20, { label: 'All', value: -1 }]}
                colSpan={3}
                count={artsCount}
                rowsPerPage={rowsPerPage}
                page={page}
                labelRowsPerPage={'Arts:'}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </div>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}