import { useSearchArtistsQuery } from '../../features/counter/apiSlice';
import React from 'react';
import { withScroll } from '../hoc/withScroll/withScroll';
// import styled from 'styled-components';

// const LogoContainer = styled.div`
//   width: 100vw;
//   height: 75vh;
//   position: fixed;
//   display: grid;
//   place-items: center;

//   img {
//     width: 200px;
//   }
// `;
export interface Props {
  data: any[];
  onQueryParamChange: (params: any) => void;
}

const ArtistSearch: React.FC<Props> = ({ data, onQueryParamChange }: Props) => {
  // TODO: introduce a debounce method to avoid unnecessary server requests

  // const handleChange = (e: any) => {
  //   const name = e.target.value;
  //   onQueryParamChange({ name });
  // };

  return (
    <div>

      {data?.length > 0 ? (
         <div>
          {data?.map((ele: any) => (
            <div key={ele.url}>
              <div>
                <div>{ele.name}
                  </div>
              </div>
            </div>
          ))}
         </div>
      ) : (
          <div>Logo</div>
      )}
    </div>
  );
};

export default withScroll(ArtistSearch, useSearchArtistsQuery);
