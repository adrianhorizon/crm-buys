import React from "react";
import styled from "styled-components";

const Menu = styled.header`
  width: 100%;
  background-color: #fff;
  padding: 20px;

  a {
    text-decoration: none;
    font-size: 2rem;
    color: #354360;
  }
`;

const Header = () => {
  return (
    <>
      <Menu className="header">
        <a href="#addi">Addi</a>
      </Menu>
    </>
  );
};

export default Header;
