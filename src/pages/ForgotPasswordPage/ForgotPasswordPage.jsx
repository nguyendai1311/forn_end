import React, { useState } from 'react';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import InputForm from '../../components/InputForm/InputForm';
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style';
import imageLogo from '../../assets/images/anhnen.webp';
import { Image } from 'antd';
import * as UserService from '../../services/UserService';
import Loading from '../../components/LoadingComponent/Loading';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate()

  const handleNavigateSignUp = () => {
    navigate('/sign-up')
  }

  const handleNavigateSignIn= () => {
    navigate('/sign-in')
  }

  const handleSendOtp = async () => {
    try {
      const res = await UserService.sendOtp({ email });
      if (res?.status === 'OK') {
        message.success(res.message);
        setOtpSent(true);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error('Có lỗi xảy ra khi gửi mã OTP.');
    }
  };

  const handleResetPasswordWithOtp = async () => {
    setIsSubmitting(true);
    try {
      const res = await UserService.resetPassword({ email, otp, newPassword });
      if (res?.status === 'SUCCESS') {
        message.success('Mật khẩu đã được thay đổi thành công.');
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error('Có lỗi xảy ra khi đặt lại mật khẩu.');
    } finally {
      setIsSubmitting(false);
      navigate('/sign-in')
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh' }}>
      <div style={{ width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
        <WrapperContainerLeft>
          <h1>Quên mật khẩu</h1>
          {!otpSent ? (
            <>
              <p>Nhập email để nhận OTP</p>
              <InputForm style={{ marginBottom: '10px' }} placeholder="abc@gmail.com" value={email} onChange={setEmail} />
              <ButtonComponent
                disabled={!email.length}
                onClick={handleSendOtp}
                size={40}
                styleButton={{
                  background: 'rgb(255, 57, 69)',
                  height: '48px',
                  width: '100%',
                  border: 'none',
                  borderRadius: '4px',
                  margin: '26px 0 10px'
                }}
                textbutton={'Send OTP'}
                styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
              />
            </>
          ) : (
            <>
              <p>Enter the OTP and your new password</p>
              <InputForm style={{ marginBottom: '10px' }} placeholder="OTP" value={otp} onChange={setOtp} />
              <InputForm style={{ marginBottom: '10px' }} placeholder="New Password" type="password" value={newPassword} onChange={setNewPassword} />
              <Loading isLoading={isSubmitting}>
                <ButtonComponent
                  disabled={!otp.length || !newPassword.length}
                  onClick={handleResetPasswordWithOtp}
                  size={40}
                  styleButton={{
                    background: 'rgb(255, 57, 69)',
                    height: '48px',
                    width: '100%',
                    border: 'none',
                    borderRadius: '4px',
                    margin: '26px 0 10px'
                  }}
                  textbutton={'Reset Password'}
                  styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                />
              </Loading>
            </>
          )}
          <p>Bạn đã có tài khoản? <WrapperTextLight onClick={handleNavigateSignIn}>Đăng nhập</WrapperTextLight></p>
          <p>Chưa có tài khoản? <WrapperTextLight onClick={handleNavigateSignUp}> Tạo tài khoản</WrapperTextLight></p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image src={imageLogo} preview={false} alt="image-logo" height="203px" width="203px" />
          <h4>Shopping</h4>
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
