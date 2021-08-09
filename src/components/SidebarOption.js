import React, { useEffect } from "react";
import styled from "styled-components";
import { db } from "../firebase.js";
import { useDispatch } from "react-redux";
import { enterRoom } from "../features/appSlice.js";
import { useCollection } from "react-firebase-hooks/firestore";

const SidebarOption = ({
  Icon,
  title,
  addChannelOption,
  id,
  firstChannel,
  setToggle,
  toggle,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (firstChannel !== undefined)
      dispatch(
        enterRoom({
          roomId: firstChannel,
        })
      );
  }, [firstChannel]);

  const addChannel = () => {
    const channelName = prompt("Please enter the channel name");
    if (channelName) {
      db.collection("rooms").add({
        name: channelName,
      });
    }
  };

  const selectChannel = () => {
    if (id) {
      dispatch(
        enterRoom({
          roomId: id,
        })
      );
    }
  };

  return (
    <SideBarOptionContainer
      onClick={addChannelOption ? addChannel : selectChannel}
    >
      {Icon && (
        <Icon
          fontSize="small"
          style={{ padding: 10 }}
          onClick={() => setToggle(!toggle)}
        />
      )}
      {Icon ? (
        <h3 onClick={() => setToggle(!toggle)}>{title}</h3>
      ) : (
        <SidebarOptionChannel>
          <span>#</span>
          {title}
        </SidebarOptionChannel>
      )}
    </SideBarOptionContainer>
  );
};

export default SidebarOption;

const SideBarOptionContainer = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;

  :hover {
    opacity: 0.9;
    background-color: #340e36;
  }

  > h3 {
    font-weight: 500;
  }

  > h3 > span {
    padding: 15px;
  }
`;

const SidebarOptionChannel = styled.h3`
  padding: 10px 0;
  font-weight: 300;
`;
