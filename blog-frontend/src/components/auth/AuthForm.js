import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import palette from 'lib/styles/palette';
import Button from "components/common/Button";

const textMap = {
  login: '로그인',
  register: '회원가입',
};

//회원가입 , 로그인 Form
const AuthForm = ({ type, form, onChange, onSubmit, error }) => {
  const text = textMap[type];
  return (
    <AuthFormBlock>
      <h3>{text}</h3>
      <form onSubmit={onSubmit}>
        <StyledInput
          name="username"
          autoComplete="username"
          placeholder="아이디"
          onChange={onChange}
          value={form.username}
        />
        <StyledInput
          name="password"
          autoComplete="new-password"
          placeholder="비밀번호"
          type="password"
          onChange={onChange}
          value={form.password}
        />
        {type === 'register' && (
          <StyledInput
            name="passwordConfirm"
            autoComplete="new-password"
            placeholder="비밀번호 확인"
            type="password"
            onChange={onChange}
            value={form.passwordConfirm}
          />
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ButtonWidthMarginTop fullWidth cyan>
          {text}
        </ButtonWidthMarginTop>
        <Footer>{type === 'login' ? <Link to="/register">회원가입</Link> : <Link to="/login">로그인</Link>}</Footer>
      </form>
    </AuthFormBlock>
  );
};

export default AuthForm;

const AuthFormBlock = styled.div`
  h3 {
    margin: 0 0 1rem 0;
    color: ${palette.gray[8]};
  }
`;

const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  outline: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  width: 100%;
  &:focus {
    color: ${palette.gray[7]};
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
`;

const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;

const ButtonWidthMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;
