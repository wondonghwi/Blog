import React from 'react';
import Button from './Button';
import styled from 'styled-components';
import Responsive from './Responsive';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <Link to="/">
            <div className="lgoo">React Blog</div>
          </Link>
          <div children="right">
            <Button to="/login">로그인</Button>
          </div>
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
  }
  .right {
    display: flex;
    align-items: center;
  }
`;

const Spacer = styled.div`
  height: 4rem;
`;
