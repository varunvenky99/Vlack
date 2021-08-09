import React from "react";
import styled from "styled-components";
import Spinner from "react-spinkit";

const Loading = () => {
  return (
    <AppLoading>
      <AppLoadingContents>
        <Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none" />
      </AppLoadingContents>
    </AppLoading>
  );
};

export default Loading;

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 80vh;
  width: 100%;
`;

const AppLoadingContents = styled.div``;
