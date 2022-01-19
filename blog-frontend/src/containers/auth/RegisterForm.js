import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from 'modules/auth';
import AuthForm from 'components/auth/AuthForm';
import { check } from 'modules/user';
import { withRouter } from 'react-router-dom';

const RegisterForm = ({ history }) => {
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  })); //비구조화할당 진행

  const onChange = useCallback(
    e => {
      const { name, value } = e.target;
      dispatch(
        changeField({
          form: 'register',
          key: name,
          value,
        })
      );
    },
    [dispatch]
  );

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      const { username, password, passwordConfirm } = form;
      //하나라도 비어있다면
      if ([username, password, passwordConfirm].includes('')) {
        setError('빈 칸을 모두 입력해주세요');
        return;
      }
      //비밀번호 일치 하지않는 경우
      if (password !== passwordConfirm) {
        setError('비밀번호가 일치하지 않습니다.');
        changeField({ form: 'register', key: 'password', value: '' });
        changeField({ form: 'register', key: 'passwordConfirm', value: '' });
        return;
      }
      dispatch(register({ username, password }));
    },
    [dispatch, form]
  );

  //다른 페이지로 이동 후 다시돌아왔을때 초기화
  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  //회원가입 성공 / 실패 처리
  useEffect(() => {
    if (authError) {
      if (authError.response.status === 409) {
        setError('이미 존재하는 계정명 입니다.');
        return;
      }
      //기타
      setError('회원가입 실패');
      return;
    }
    if (auth) {
      console.log('회원가입 성공');
      console.log(auth);
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  //user값이 잘 설정되었는지 확인
  useEffect(() => {
    if (user) {
      console.log('check API 성공');
      console.log(user);
      history.push('/');
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
  }, [user, history]);

  return <AuthForm type="register" form={form} onChange={onChange} onSubmit={onSubmit} error={error} />;
};

export default withRouter(RegisterForm);
