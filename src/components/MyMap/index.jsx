import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

export const MyMap = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: 50.553, lng: 30.215 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 50.553, lng: 30.215 }} />}
  </GoogleMap>
))
