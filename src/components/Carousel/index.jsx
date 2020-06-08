import React, { useState, useEffect} from "react";
import useStyles from "./styles";
import clsx from 'clsx';
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from "mdbreact";
import { Link } from 'react-router-dom';
import axios from 'axios';


export const Carousel = () => {
  const classes=useStyles();
  const [item1, setItem1] = useState([]);
  const [item2, setItem2] = useState([]);


  useEffect(() => {
    let url = `http://localhost:${3001}/api/arts/5ed26215c0d41413c42156f8`; //change port if needed
    axios.get(url)
    .then(result => {
        setItem1(result.data);
        url = `http://localhost:${3001}/api/arts/5ed26213c0d41413c42156f7`;
        axios.get(url)
        .then(result => {
          setItem2(result.data);
        })
      })
    .catch(err => console.log(err));
  }, [])

  return (
    <MDBContainer className={classes.bottomIndent}>
      <MDBCarousel
      activeItem={1}
      length={2}
      showControls={true}
      showIndicators={true}
      className="z-depth-1"
    >
      <MDBCarouselInner>
        <MDBCarouselItem itemId="1">
          <MDBView>
          <Link to={`/art/${item1._id}`}>
            <img
              className={clsx(classes.imageSizing, "d-block w-100")}
              src="https://lh3.googleusercontent.com/pw/ACtC-3cbemigHtTap3BEXv_8kBWek1pK334gBnG1U3JkSHxt55vanDuJZ9xrOgwINQRWIt0aVq0HJuWtrYP8XtkgVIviZR5Itloh58ldDC1VPVnb8E1gQUibpJyQS1zKuJiQNzNeHP5Cu_wIVR0wVXBZ9Rs89Q=w1394-h953-no?authuser=0"
              alt="First slide"
            />
          </Link>
          </MDBView>
          <MDBCarouselCaption>
            <h3 className="h3-responsive">{item1.name}</h3>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="2">
          <MDBView>
          <Link to={`/art/${item2._id}`}>
            <img
              className={clsx(classes.imageSizing, "d-block w-100")}
              src="https://lh3.googleusercontent.com/pw/ACtC-3cjOv1RE16nENrvpq21wevAT0xj7Wah_GFYSNcElXYNmolBVTOK8HzvCGOKa85TOYYqJ-LHTzvbkRdCSs1BQ1CPTqk_i8UL-ye1UBxjLwG-Jef0ZxO5vTkzDZZMStHJWpaL_FSmHq4mxx5RFFIueszIKQ=w974-h652-no?authuser=0"
              alt="Second slide"
            />
            </Link>
          </MDBView>
          <MDBCarouselCaption>
            <h3 className="h3-responsive">{item2.name}</h3>
          </MDBCarouselCaption>
        </MDBCarouselItem>
      </MDBCarouselInner>
    </MDBCarousel>
    </MDBContainer>
  );
}