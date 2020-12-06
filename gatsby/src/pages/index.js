import React from 'react';
import ItemGrid from '../components/ItemGrid';
import LoadingGrid from '../components/LoadingGrid';
import { HomePageGrid } from '../styles/Grids';
import useLatestData from '../utils/useLatestData';

const CurrentlySlicing = ({ slicemasters }) => (
  <div>
    <h2 className="center tilt">
      <span className="mark">Slicemasters On</span>
    </h2>
    <p>Our masters of slice and za</p>
    {!slicemasters && <LoadingGrid count={4} />}
    {slicemasters && !slicemasters?.length && (
      <p>No one is working right now!</p>
    )}
    {slicemasters?.length && <ItemGrid items={slicemasters} />}
  </div>
);

const HotSlices = ({ hotSlices }) => (
  <div>
    <h2 className="center tilt">
      <span className="mark">Hot Slices!</span>
    </h2>
    <p>Get em while they're hot.</p>
    {!hotSlices && <LoadingGrid count={4} />}
    {hotSlices && !hotSlices?.length && <p>Nothin' by the slice</p>}
    {hotSlices?.length && <ItemGrid items={hotSlices} />}
  </div>
);

const HomePage = () => {
  const { slicemasters, hotSlices } = useLatestData();

  return (
    <>
      <div className="center">
        <h1>The Best Pizza Downtown!</h1>
        <p>Open 11am to 11pm Every Single Day</p>
        <HomePageGrid>
          <CurrentlySlicing slicemasters={slicemasters} />
          <HotSlices hotSlices={hotSlices} />
        </HomePageGrid>
      </div>
    </>
  );
};

export default HomePage;
