import React, { useState } from "react";
import styled from "styled-components";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import SidebarOption from "./SidebarOption";
import InsertCommenticon from "@material-ui/icons/InsertComment";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AppsIcon from "@material-ui/icons/Apps";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "./Loading";

const SideBar = () => {
  const [channels, loading, error] = useCollection(db.collection("rooms"));

  const [toggle, setToggle] = useState(true);

  const [user] = useAuthState(auth);

  const firstChannel = channels?.docs[0]?.id;

  return (
    <SideBarContainer>
      <SideBarHeader>
        <SideBarInfo>
          <h2>Falcon HQ</h2>
          <h3>
            <FiberManualRecordIcon />
            {user?.displayName}
          </h3>
        </SideBarInfo>
        <CreateIcon />
      </SideBarHeader>

      <SidebarOption
        Icon={toggle === true ? ExpandMoreIcon : ExpandLessIcon}
        title="Channels"
        firstChannel={firstChannel}
        setToggle={setToggle}
        toggle={toggle}
      />
      <hr />
      <SidebarOption Icon={AddIcon} addChannelOption title="Add Channel" />
      {loading ? (
        <Loading />
      ) : toggle === true ? (
        channels?.docs.map((doc) => (
          <SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
        ))
      ) : (
        <></>
      )}

      {/* <SidebarOption Icon={InsertCommenticon} title="Threads" />
      <SidebarOption Icon={InboxIcon} title="Mentions & reactions" />
      <SidebarOption Icon={DraftsIcon} title="Saved Items" />
      <SidebarOption Icon={BookmarkBorderIcon} title="Channel browser" />
      <SidebarOption Icon={PeopleAltIcon} title="People & user groups" />
      <SidebarOption Icon={AppsIcon} title="Apps" />
      <SidebarOption Icon={FileCopyIcon} title="File broswer" />
      <SidebarOption Icon={ExpandLessIcon} title="Show less" /> */}
    </SideBarContainer>
  );
};

export default SideBar;

const SideBarContainer = styled.div`
  background-color: var(--slack-color);
  flex: 0.3;
  color: white;
  border-top: 1px solid #49274b;
  max-width: 260px;
  margin-top: 60px;

  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #49274b;
  }
`;

const SideBarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 13px;

  > .MuiSvgIcon-root {
    padding: 8px;
    color: #49274b;
    font-size: 18px;
    background-color: white;
    border-radius: 999px;
  }
`;

const SideBarInfo = styled.div`
  flex: 1;

  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }

  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
  }

  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
    color: green;
  }
`;
