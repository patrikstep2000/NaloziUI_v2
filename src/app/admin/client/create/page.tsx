"use client";

import ClientType from "@/model/Client/Client";
import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";
import { Box, Container, Stack, SxProps } from "@mui/system";
import {
  Autocomplete,
  GoogleMap,
  Libraries,
  useLoadScript,
  MarkerF,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";

const tfStyle: SxProps = {
  marginBottom: "20px",
};

const center = { lat: 44.7, lng: 16.7 };

const placesLibrary: Libraries = ["places"];

export default function CreateClientPage() {
  const [searchResult, setSearchResult] =
    useState<google.maps.places.Autocomplete>();
  const [marker, setMarker] = useState<google.maps.LatLngLiteral>();
  const [error, setError] = useState(false);
  const [client, setClient] = useState<ClientType>({
    name: "",
    oib: "",
    erp: 0,
    address: "",
    post_code: 0,
    city: "",
    country: "",
  });
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_KEY as string,
    libraries: placesLibrary,
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClient((prev) => ({ ...prev, [event.target.id]: event.target.value }));
  };

  const onSave = () => {};

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setSearchResult(autocomplete);
  };

  const onPlaceChanged = () => {
    if (searchResult) {
      const geocoder = new google.maps.Geocoder();
      const place = searchResult.getPlace();
      const address = place.formatted_address;

      geocoder.geocode(
        {
          address: address,
        },
        (results, status) => {
          if (status == google.maps.GeocoderStatus.OK && results) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            setMarker({ lat: latitude, lng: longitude });
          }
        }
      );
    }
  };

  if (!isLoaded)
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );

  return (
    <Box sx={{width:'100%'}}>
      <Stack direction='row' width='100%'>
        <Box sx={{width:'100%', padding:'50px'}}>
          <TextField
            sx={tfStyle}
            id="name"
            fullWidth
            error={error}
            value={client.name}
            label="Ime klijenta"
            onChange={onChange}
            helperText={error ? "Unesite ime klijenta" : ""}
          />
          <TextField
            sx={tfStyle}
            id="oib"
            fullWidth
            error={error}
            value={client.oib}
            label="OIB"
            onChange={onChange}
            helperText={error ? "Unesite OIB" : ""}
          />
          <TextField
            sx={tfStyle}
            id="erp"
            type="number"
            fullWidth
            error={error}
            value={client.erp === 0 ? "" : client.erp}
            label="ERP"
            onChange={onChange}
            helperText={error ? "Unesite ERP" : ""}
          />
          <TextField
            sx={tfStyle}
            id="city"
            fullWidth
            error={error}
            value={client.city}
            label="Grad"
            onChange={onChange}
            helperText={error ? "Unesite grad" : ""}
          />
          <TextField
            sx={tfStyle}
            id="address"
            fullWidth
            error={error}
            value={client.address}
            label="Adresa"
            onChange={onChange}
            helperText={error ? "Unesite adresu" : ""}
          />
          <TextField
            sx={tfStyle}
            id="country"
            fullWidth
            error={error}
            value={client.country}
            label="Država"
            onChange={onChange}
            helperText={error ? "Unesite državu" : ""}
          />
          <TextField
            sx={tfStyle}
            id="post_code"
            fullWidth
            type="number"
            error={error}
            value={client.post_code === 0 ? "" : client.post_code}
            label="Poštanski broj"
            onChange={onChange}
            helperText={error ?? "Unesite poštanski broj"}
          />

          <Button variant="contained" onClick={onSave}>
            Spremi
          </Button>
        </Box>
        <Box sx={{width:'100%'}}>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <input
              type="text"
              placeholder="Upišite lokaciju klijenta"
              style={{
                color: "rgba(0, 0, 0, 0.95)",
                boxSizing: `border-box`,
                border: `1px solid lightgrey`,
                width: `100%`,
                height: `60px`,
                padding: `0 12px`,
                borderRadius: `4px`,
                fontSize: `1rem`,
                outline: `none`,
                textOverflow: `ellipses`,
                marginBottom: "20px",
              }}
            />
          </Autocomplete>
          <GoogleMap
            center={marker ?? center}
            zoom={marker ? 15 : 7}
            mapContainerStyle={{ width: "100%", height: "50vh" }}
          >
            {marker && <MarkerF position={marker} />}
          </GoogleMap>
        </Box>
      </Stack>
    </Box>
  );
}
