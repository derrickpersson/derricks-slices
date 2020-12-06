import { useEffect, useState } from 'react';

const gql = String.raw;

const deets = `
    name
    _id
    image {
      asset {
        url
        metadata {
          lqip
        }
      }
    }
`;

// lqip => low quality image placeholder

const useLatestData = () => {
  const [hotSlices, setHotSlices] = useState();
  const [slicemasters, setSlicemasters] = useState();
  useEffect(() => {
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
        query {
          StoreSettings(id: "downtown") {
            name
            slicemasters: slicemaster {
              ${deets}
            }
            hotSlices {
              ${deets}
            }
          }
        }
      `,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setHotSlices(result.data.StoreSettings.hotSlices);
        setSlicemasters(result.data.StoreSettings.slicemasters);
      });
  }, []);

  return {
    hotSlices,
    slicemasters,
  };
};

export default useLatestData;
