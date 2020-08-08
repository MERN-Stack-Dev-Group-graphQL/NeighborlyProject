import React, { useState, useCallback, useRef } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { FaMapMarkerAlt } from 'react-icons/fa';
import ControlledTabs from '../../../shared/components/ControlledTabs';
import StarCount from '../../../shared/components/reviews/StarCount';
import { SectionWrapper } from './styles';
import mapStyles from '../../../shared/components/MapStyles';
import pinIcon from '../../../../assets/img/icons/pin.svg';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '240px',
  border: '1px solid #f8f8f8',
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const ToolDetail = (props) => {
  console.log('location:', props.location.latitude);
  console.log('tool: ', props);
  const mapCenter = {
    lat: props.location.latitude ? props.location.latitude : 39.931911,
    lng: props.location.longitude ? props.location.longitude : -75.340184,
  };

  const MARKER_POSITION = {
    lat: props.location.latitude ? props.location.latitude : 39.931911,
    lng: props.location.longitude ? props.location.longitude : -75.340184,
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);

  const onMapClick = useCallback((event) => {
    setMarkers((current) => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading maps';

  function ToolImage(path) {
    if (path.url.length > 1) {
      return (
        <div>
          <div className='recommended'>Recommended</div>
          <div style={{ backgroundImage: `url(http://localhost:4000${path.url})` }} className={`card-img-top ${path.className}`}></div>
        </div>
      );
    }
    return (
      <div
        style={{ backgroundImage: `url(http://localhost:4000/assets/img/default.jpg)` }}
        className={`card-img-top ${path.className}`}
      ></div>
    );
  }

  return (
    <SectionWrapper className='container-fluid'>
      <div className='row'>
        <div className='col-md-12'>
          <div className='page-header'>Tool Detail</div>
          <hr />
          <div id='tool-detail' className='mb-4'>
            <div id='leftCol'>
              <div className='feature-image'>
                <ToolImage url={props.url} className='tool-thumb' />
              </div>
              <div style={{ padding: '1rem' }}>
                <div className='price-wrapper'>
                  <h2 className='price'>{props.price}</h2>
                  <div className='per-unit'>{`/ per ${props.unitOfMeasure}`}</div>
                </div>
                <div className='other-recommendations'>
                  <p className='title'>You might also need</p>
                  <p className='content'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>

                <button className='btn btn-primary'>Add to Cart</button>
              </div>
            </div>
            <div id='centerCol'>
              <h3 className='tool-header'>{props.title}</h3>
              <div className='review-wrapper'>
                <StarCount starCount={props.starCount} rateCount={props.rateCount} />
                <Link to='/review' className='review-btn'>
                  Write a review
                </Link>
              </div>

              <div className='tool-sub-header d-none'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, consequuntur.</div>
              <div className='tool-description'>{props.description}</div>
              <div className='tool-footer mt-auto'>
                <div className='owner'>
                  <span className='owner-avatar'>
                    <img src='http://localhost:4000/assets/img/avatar-default.png' alt='Owner Avatar' />
                  </span>
                  <span className='owner-name'>
                    {props.user.firstName} {props.user.lastName}
                  </span>
                </div>
                <div className='location'>
                  <FaMapMarkerAlt className='mr-1' /> <span>Pine Street, Center City</span>
                </div>
              </div>

              <div className='location-map-container'>
                <div className='map-header'>
                  Neighborly <span role='img' aria-label='rocket'></span>
                </div>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  zoom={10}
                  center={mapCenter}
                  options={options}
                  onClick={onMapClick}
                  onLoad={onMapLoad}
                >
                  <Marker position={MARKER_POSITION} icon={pinIcon} />

                  {markers.map((marker) => (
                    <Marker
                      key={marker.time.toISOString()}
                      position={{ lat: marker.lat, lng: marker.lng }}
                      icon={{
                        url: 'http://localhost:4000/assets/img/avatar-default.png',
                        scaledSize: new window.google.maps.Size(30, 30),
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                      }}
                      onClick={() => {
                        setSelected(marker);
                      }}
                    />
                  ))}

                  {selected ? (
                    <InfoWindow
                      position={{ lat: selected.lat, lng: selected.lng }}
                      onCloseClick={() => {
                        setSelected(null);
                      }}
                    >
                      <div>
                        <h5>Tool Found!</h5>
                        <p>{moment(selected.time).calendar()}</p>
                      </div>
                    </InfoWindow>
                  ) : null}
                </GoogleMap>
              </div>
            </div>
            <div id='bottomCol'>
              <ControlledTabs {...props} />
            </div>
          </div>
          <div className='page-header'>Recommended for you</div>
          <hr />
          <div id='recommendation-container'>
            <div className='recommendation-wrapper'>
              <div className='recommended-item'>Item1</div>
              <div className='recommended-item'>Item1</div>
              <div className='recommended-item'>Item1</div>
              <div className='recommended-item'>Item1</div>
            </div>
            <div className='advertisment'>Place Ads Here</div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ToolDetail;
