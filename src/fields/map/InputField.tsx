import React, { useState, useEffect, useRef } from "react";
import { Props } from "payload/components/fields/Number";
import { Label, useFieldType } from "payload/components/forms";
import { usePreferences } from "payload/components/preferences";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const InputField: React.FC<Props> = (props) => {
  const { path, label, required } = props;

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(-114.062019);
  const [lat] = useState(51.04427);
  const [zoom] = useState(9);
  const [API_KEY] = useState("9wCnKzeKSlCusAthggpc");

  const { value = [lng, lat], setValue } = useFieldType<[number, number]>({
    path,
  });

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      // Note this styling may have to change depending on the map style you want to use
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.addControl(new maplibregl.NavigationControl(), "top-right");

    const marker = new maplibregl.Marker({ color: "#000000" })
      .setLngLat(value)
      .addTo(map.current);

    map.current.on("click", (e) => {
      marker.setLngLat(e.lngLat);

      // Jump to the location on the map and set zoom to 12
      map.current.flyTo({ center: e.lngLat, zoom: 14 });

      setValue([e.lngLat.lng, e.lngLat.lat]);
    });
  }, [API_KEY, lng, lat, zoom]);

  return (
    <div
      style={{
        marginBottom: "1rem",
      }}
    >
      <Label htmlFor={path} label={label} required={required} />
      <div
        style={{
          position: "relative",
          width: "100%",
          borderRadius: "2rem",
          height:
            "400px" /* calculate height of the screen minus the heading */,
        }}
      >
        <div
          ref={mapContainer}
          style={{
            position: "absolute",
            overflow: "hidden",
            width: "100%",
            height: "100%",
          }}
        />
      </div>
    </div>
  );
};

export default InputField;
