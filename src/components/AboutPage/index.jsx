import React from "react";
import useStyles from "./styles";
import clsx from 'clsx';
import Video from "../../media/video.mp4";
import Typography from '@material-ui/core/Typography';
import Avatar from '../../media/1.jpg';
import Image from 'react-bootstrap/Image';
import { MyMap } from '../MyMap/index';


export function AboutPage(props) {
  const classes=useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.videoWrapper}>
        <video loop muted autoPlay className={classes.video}>
          <source src={Video} type="video/mp4" />
        </video>
      </div>
      <div className={classes.firstContainer}>
        <div className={classes.firstContainerColumn}>
          <Typography className={classes.firstContainerHeader}>What I can do.</Typography>
          <Typography className={classes.firstContainerText}>Painting, sculpture, Easter painting.</Typography>
        </div>
      </div>
      <div className={classes.secondContainer}>
        <div className={classes.secondContainerRow}>
          <div className={classes.secondContainerRowFirstColumn}>
            <Typography className={classes.secondContainerRowFirstColumnHeader}>Education</Typography>
            <Typography className={classes.secondContainerRowFirstColumnText}>Dragomanov's university, 2nd course, Faculty of Pedagogy and Psychology, 
            Department of Fine Arts</Typography>
          </div>
          <div className={classes.secondContainerRowSecondColumn}>
            <Typography className={classes.secondContainerRowSecondColumnHeader}>It's me</Typography>
            <Image className={clsx("img-responsive", classes.secondContainerRowSecondColumnImage)} src={Avatar} />
          </div>
        </div>
      </div>
      <div className={classes.thirdContainer}>
        <div className={classes.thirdContainerColumn}>
          <Typography className={classes.thirdContainerHeader}>Contact me.</Typography>
          <Typography className={classes.thirdContainerText}>matsipunia@gmail.com</Typography>
        </div>
      </div>
      <MyMap
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `500px` }} />}
        containerElement={<div style={{ height: `475px` }} />}
        mapElement={<div style={{ height: `500px` }} />}
      />
    </div>
  );
}
