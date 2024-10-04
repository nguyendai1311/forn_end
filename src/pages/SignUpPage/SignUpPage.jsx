import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image } from 'antd';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';

import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import InputForm from '../../components/InputForm/InputForm';
import Loading from '../../components/LoadingComponent/Loading';
import * as message from '../../components/Message/Message';
import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hooks/useMutationHooks';
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style';
import imageLogo from '../../assets/images/anhnen.webp';

const SignUpPage = () => {
  const navigate = useNavigate();

  const [buttonText, setButtonText] = useState('Send OTP');
  const [isResend, setIsResend] = useState(false);
  const [timer, setTimer] = useState(0);

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');

  const handleOnchangeOtp = (value) => setOtp(value);
  const handleOnchangeEmail = (value) => setEmail(value);
  const handleOnchangePassword = (value) => setPassword(value);
  const handleOnchangeConfirmPassword = (value) => setConfirmPassword(value);

  const mutation = useMutationHooks(data => UserService.signupUser(data));
  const { data, isLoading, isSuccess, isError, error } = mutation;

  useEffect(() => {
    if (isSuccess) {
      message.success('Đăng ký thành công! Vui lòng đăng nhập.');
      handleNavigateSignIn();
    } else if (isError) {
      const errorMessage = error?.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.';
      message.error(errorMessage);
    }
  }, [isSuccess, isError, error]);
  console.log(isSuccess);
  

  const handleSendOtp = async () => {
    try {
      const res = await UserService.sendOtp({ email });
      if (res?.status === 'OK') {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error('Có lỗi xảy ra khi gửi mã OTP.');
    }
  };

  const handleReSendOtp = async () => {
    try {
      await UserService.sendOtp({ email });
      message.success('Mã OTP đã được gửi!');
    } catch (error) {
      message.error('Có lỗi xảy ra khi gửi mã OTP.');
    }
  };

  const handleNavigateSignIn = () => navigate('/sign-in');

  const handleSignUp = () => {
    mutation.mutate({ email, password, confirmPassword, otp });
  };

  const handleClick = () => {
    if (!isResend) {
      handleSendOtp();
      setButtonText("Resend OTP");
      setIsResend(true);
      setTimer(60);
      const interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            setButtonText('Resend OTP');
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    } else {
      handleReSendOtp();
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh' }}>
      <div style={{ width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
        <WrapperContainerLeft>
          <h1>Xin chào</h1>
          <p>Tạo tài khoản</p>
          <InputForm
            style={{ marginBottom: '10px' }}
            placeholder="abc@gmail.com"
            value={email}
            onChange={handleOnchangeEmail}
          />
          <div style={{ position: 'relative' }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{ zIndex: 10, position: 'absolute', top: '4px', right: '8px' }}
            >
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm
              placeholder="Password"
              type={isShowPassword ? 'text' : 'password'}
              style={{ marginBottom: '10px' }}
              value={password}
              onChange={handleOnchangePassword}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <span
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              style={{ zIndex: 10, position: 'absolute', top: '4px', right: '8px' }}
            >
              {isShowConfirmPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm
              placeholder="Confirm Password"
              type={isShowConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={handleOnchangeConfirmPassword}
              style={{ marginBottom: '10px' }}
            />
            <InputForm
              placeholder="Enter OTP"
              value={otp}
              onChange={handleOnchangeOtp}
              style={{ marginBottom: '10px' }}
            />
            <ButtonComponent
              textbutton={buttonText}
              onClick={handleClick}
              styleButton={{ marginTop: '10px' }}
              styleTextButton={{ color: '#007bff', fontSize: '15px' }}
            >
              {buttonText} {isResend && timer > 0 && `(${timer}s)`}
            </ButtonComponent>
          </div>
          {/* Displaying error messages */}
          {data?.status === 'ERR' && typeof data?.message === 'string' && (
            <span style={{ color: 'red' }}>{data.message}</span>
          )}
          <Loading isLoading={isLoading}>
            <ButtonComponent
              disabled={!email || !password || !confirmPassword || !otp}
              onClick={handleSignUp}
              size={40}
              styleButton={{
                background: 'rgb(255, 57, 69)',
                height: '48px',
                width: '100%',
                border: 'none',
                borderRadius: '4px',
                margin: '26px 0 10px'
              }}
              textbutton="Đăng ký"
              styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
            />
          </Loading>
          <p>Bạn đã có tài khoản? <WrapperTextLight onClick={handleNavigateSignIn}>Đăng nhập</WrapperTextLight></p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image src={imageLogo} preview={false} alt="image-logo" height="203px" width="203px" />
          <h4>Mua sắm</h4>
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignUpPage;
