import React from "react";
import useStyles from "./styles";
import moment from "moment";
import Image from 'react-bootstrap/Image';
import clsx from 'clsx';
import { Link } from 'react-router-dom';


import Typography from '@material-ui/core/Typography';
import GridListTileBar from '@material-ui/core/GridListTileBar';


import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';



const notFoundImage = "https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png";

export function Art({name, category, description, price, createdAt, imageUrl}) {
  const classes=useStyles();

  const [topDrawer, setTopDrawer] = React.useState({
    top: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setTopDrawer({ ...topDrawer, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className={classes.drawer}>
      <Typography alignCenter>
        {description}<br/>
      </Typography>
      </List>
      <Divider />
      <List className={classes.drawer}>
        <Typography>
          Created at: {moment(createdAt).format("MM-DD")}<br/>
          Price: {price}<br/>
          Category: <Link to={"/category/" + category}>{category}</Link>
        </Typography>
      </List>
    </div>
  );

  return (
      <div className={classes.wrapper}>
      <Tooltip title="Click to get more info" arrow>
        <div>
            <Image className={clsx("img-responsive", classes.gridImg)} src={imageUrl==='some img' ? notFoundImage : imageUrl} 
            alt={name} onClick={toggleDrawer('top', true)} 
            />
            <GridListTileBar
            title={imageUrl==='some img' ? 'Image not found' : name} 
            onClick={toggleDrawer('top', true)}
            />
        </div>
        </Tooltip>
          <React.Fragment key='top'>
            <Drawer anchor='top' open={topDrawer['top']} onClose={toggleDrawer('top', false)}>
              {list()}
            </Drawer>
          </React.Fragment>
      </div>
  );
}
