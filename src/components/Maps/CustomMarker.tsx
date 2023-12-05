import React from 'react';
import { Marker, Tooltip } from 'react-leaflet';
import { Icon } from 'leaflet';
import { renderToString } from 'react-dom/server';
// import { MdLocationOn } from 'react-icons/md';
// import { MdCoronavirus } from 'react-icons/md';
import { FaMapMarkerAlt } from 'react-icons/fa';

interface CustomMarkerProps {
    position: [number, number];
    country: any;
}

const customMarkerIcon = new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(
        renderToString(<FaMapMarkerAlt color="#7367F0" size={30} />)
    )}`,
    iconSize: [27, 27],
    iconAnchor: [13, 35],
});

const CustomMarker: React.FC<CustomMarkerProps> = ({ position, country }) => {

    // const [darkMode, setDarkMode] = React.useState(true);

    return (
        <Marker
            position={position}
            icon={customMarkerIcon}
        >
            <Tooltip>
                <h3>{country}</h3>
            </Tooltip>
        </Marker>
    );
};

export default CustomMarker;
