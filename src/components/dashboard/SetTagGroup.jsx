import React, { useState } from "react";
import styled from "styled-components";
import { Body6, Body1, Border1pxTiara } from "@/styledMixins";

import iconSearch from '@ICONS/icon_search.png'



function Group13(props) {
  const { text_Label1, className } = props;
  const [isFocusInput, setFocusInput] = useState(false);

  return (
    <Group131 className={`group-13-3 ${className || ""}`}>
      <TextLabel className="text_label-175">{text_Label1}</TextLabel>
      <OverlapGroup1 className="overlap-group1-8">
        <Input type="text" onFocus={() => setFocusInput(true)} onBlur={() => setFocusInput(false)}/>
        <MagnifyingGlassLight ></MagnifyingGlassLight>
        {
          isFocusInput === false && (<TextLabel1 className="text_label-176">タグ名</TextLabel1>)
        }
      </OverlapGroup1>
    </Group131>
  );
}

const Input = styled.input `
  ${Border1pxTiara}
  position: absolute;
  height: 45px;
  top: 0;
  left: 0;
  display: flex;
  padding: 12px 15px 12px 50px;
  align-items: flex-start;
  min-width: 700px;
  background-color: var(--white);
  border-radius: 5px;
`;

const Group131 = styled.div`
  position: absolute;
  width: 700px;
  top: 948px;
  left: 746px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 85px;

  &.group-13-3.group-8-2 {
    margin-top: 24px;
    position: unset;
    top: unset;
    left: unset;
  }

  &.group-13-3.group-8-3 {
    margin-top: 24px;
    position: unset;
    top: unset;
    left: unset;
  }
`;

const TextLabel = styled.div`
  ${Body1}
  min-height: 20px;
  font-weight: 700;
  color: var(--nevada);
  line-height: 20px;
  white-space: nowrap;
`;

const OverlapGroup1 = styled.div`
  width: 700px;
  height: 45px;
  position: relative;
  margin-top: 20px;
  border-radius: 5px;
`;

const Group4 = styled.div`
  ${Border1pxTiara}
  position: absolute;
  height: 45px;
  top: 0;
  left: 0;
  display: flex;
  padding: 12px 15px;
  align-items: flex-start;
  min-width: 700px;
  background-color: var(--white);
  border-radius: 5px;
`;

const MagnifyingGlassLight = styled.div`
  width: 20px;
  height: 20px;
  background-image: url(${iconSearch});
  background-size: 100% 100%;
  position: relative;
  top: 15px;
  left: 12px;
`;

const TextLabel1 = styled.div`
  ${Body6}
  position: absolute;
  top: 15px;
  left: 52px;
  color: var(--manatee);
  line-height: 16px;
  white-space: nowrap;
`;

export default Group13;
