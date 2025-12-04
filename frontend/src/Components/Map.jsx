import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import configData from "../config";
import Box from "@mui/material/Box";
import Navbar from './NavBar.jsx';
import CustomRamp from "./CustomRamp.js"


export default function Map() {
    const geoPoints = {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                geometry: { type: "Point", coordinates: [30.3609, 59.9311] },
                properties: {
                    name: "2",
                    warning: 2

                },
            },
            {
                type: "Feature",
                geometry: { type: "Point", coordinates: [30.3351, 59.9343] },
                properties: {
                    name: "3",
                    warning: 3
                },
            },
            {
                type: "Feature",
                geometry: { type: "Point", coordinates: [30.3141, 59.9375] },
                properties: {
                    name: "1",
                    warning: 1
                },
            },
        ],
    };


    const mapContainer = useRef(null);
    const map = useRef(null);
    const center = { lng: 30.3609, lat: 59.9311 };
    const [zoom] = useState(10);
    maptilersdk.config.apiKey = configData.MAPTILER_API_KEY;

    useEffect(() => {
        if (map.current) return;

        map.current = new maptilersdk.Map({
            container: mapContainer.current,
            style: maptilersdk.MapStyle.DATAVIZ.LIGHT,
            center: [center.lng, center.lat],
            zoom: zoom
        });

        map.current.on("load", () => {
            maptilersdk.helpers.addPoint(map.current, {
                data: geoPoints,
                pointColor: CustomRamp.scale(1, 3).reverse(),
                pointOpacity: 0.5,
                showLabel: true,
                labelColor: "black",
                pointRadius: 20,
                property: "warning",
            });
        });



    }, [center.lng, center.lat, zoom]);



    return (
        <Box sx={{ display: "flex" }}>
            <Navbar />
            <div className="container">
                <div ref={mapContainer} id="map" className="map" />
            </div>
        </Box>
    );
}