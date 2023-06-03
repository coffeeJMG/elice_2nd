import React from "react";
import styled from "styled-components";

export const Footer = () => {
  return (
    <>
      <FooterBox>
        <FooterTitle>[웹사이트 명]</FooterTitle>
        <FooterLink href="https://kdt-gitlab.elice.io/sw_track/class_04/web_2_project/team05/front-end">
          https://kdt-gitlab.elice.io/sw_track/class_04/web_2_project/team05/front-end
        </FooterLink>
        <p>2023-05-26 ~ 2023-06-16</p>
      </FooterBox>
    </>
  );
};

const FooterBox = styled.div`
  font-size: 12px;
  text-align: center;
  color: #606060;
  width: 834px;
  height: 126px;
  background-color: #f3f3f3;
  margin: 0px auto 0px auto;
`;

const FooterTitle = styled.p`
  padding-top: 23px;
`;

const FooterLink = styled.a`
  color: #606060;
`;
