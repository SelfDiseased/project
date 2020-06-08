import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import FacebookIcon from '@material-ui/icons/Facebook';
import TelegramIcon from '@material-ui/icons/Telegram';
import EmailIcon from '@material-ui/icons/Email';

const FooterPage = () => {
  return (
    <MDBFooter color="blue" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title"><q cite="https://www.brainyquote.com/quotes/paul_cezanne_134682">A work of art which did not begin in emotion is not art.</q></h5>
            <p>
              Paul Cezanne
            </p>
          </MDBCol>
          <MDBCol md="3">
            <h5 className="title">Follow me:</h5>
            <ul>
              <li className="list-unstyled">
              <a href="https://www.facebook.com/anastasia.zelllllllllllll">
                <FacebookIcon />
              </a>
              </li>
            </ul>

            <h5 className="title">Contact me:</h5>
            <ul>
            <li className="list-unstyled">
                <a href="https://t.me/matsipunia">
                <TelegramIcon />
                </a>
              </li>
              <li className="list-unstyled">
                <p>
                <EmailIcon /> matsipunia@gmail.com
                </p>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          {new Date().getFullYear()}, Monko Olexander, oldsherokuapp@gmail.com
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;