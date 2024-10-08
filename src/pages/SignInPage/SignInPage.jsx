import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from 'antd';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import InputForm from '../../components/InputForm/InputForm';
import Loading from '../../components/LoadingComponent/Loading';
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style';
import imageLogo from '../../assets/images/anhnen.webp';
import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hooks/useMutationHooks';
import { updateUser } from '../../redux/slides/userSlide';
import {jwtDecode} from 'jwt-decode';  // Remove the extra curly braces
import * as message from '../../components/Message/Message';

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');  // State to store error message from server
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const mutation = useMutationHooks(data => UserService.loginUser(data));
  const { data, isLoading, isSuccess, isError, error } = mutation;  // Get `error` from mutation
  console.log("data", data);

  useEffect(() => {
    if (isSuccess) {
      const redirectPath = location?.state || '/';
      navigate(redirectPath);
      localStorage.setItem('access_token', JSON.stringify(data?.access_token));
      localStorage.setItem('refresh_token', JSON.stringify(data?.refresh_token));
      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token);
        }
      }
    }
  
    if (isError) {
      const errorMessage = error?.response?.data?.message || 'An error occurred. Please try again.';
      message.error(errorMessage);
    }
  }, [isSuccess, isError, error]);
  

  const handleGetDetailsUser = async (id, token) => {
    const refreshToken = JSON.parse(localStorage.getItem('refresh_token'));
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token, refreshToken }));
  };

  const handleNavigateSignUp = () => {
    navigate('/sign-up');
  };

  const handleNavigateForgotPass = () => {
    navigate('/forgot-password')
  }

  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnChangePassword = (value) => {
    setPassword(value);
  };

  const handleSignIn = () => {
    setErrorMessage('');
    mutation.mutate({ email, password });
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh' }}>
      <div style={{ width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
        <WrapperContainerLeft>
          <h1>Xin chào</h1>
          <p>Đăng nhập</p>
          <InputForm
            style={{ marginBottom: '10px' }}
            placeholder="abc@gmail.com"
            value={email}
            onChange={handleOnChangeEmail}
          />
          <div style={{ position: 'relative' }}>
            <span
              onClick={() => setIsShowPassword(prev => !prev)}
              style={{ zIndex: 10, position: 'absolute', top: '4px', right: '8px' }}
            >
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm
              placeholder="Password"
              type={isShowPassword ? 'text' : 'password'}
              value={password}
              onChange={handleOnChangePassword}
            />
          </div>
          {errorMessage && <span style={{ color: 'red' }}>{error?.response?.data?.message}</span>}  
          <Loading isLoading={isLoading}>
            <ButtonComponent
              disabled={!email || !password}
              onClick={handleSignIn}
              size={40}
              styleButton={{
                background: 'rgb(255, 57, 69)',
                height: '48px',
                width: '100%',
                border: 'none',
                borderRadius: '4px',
                margin: '26px 0 10px'
              }}
              textbutton="Đăng nhập"
              styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
            />
          </Loading>
          <p><WrapperTextLight onClick={handleNavigateForgotPass}>Quên mật khẩu?</WrapperTextLight></p>
          <p>
            Chưa có tài khoản? <WrapperTextLight onClick={handleNavigateSignUp}>Tạo tài khoản</WrapperTextLight>
          </p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image src={imageLogo} preview={false} alt="image-logo" height="203px" width="203px" />
          <h4>Mua sắm</h4>
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignInPage;

// import React, { useEffect, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { Image } from 'antd';
// import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
// import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
// import InputForm from '../../components/InputForm/InputForm';
// import Loading from '../../components/LoadingComponent/Loading';
// import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style';
// import imageLogo from '../../assets/images/anhnen.webp';
// import * as UserService from '../../services/UserService';
// import { useMutationHooks } from '../../hooks/useMutationHooks';
// import { updateUser } from '../../redux/slides/userSlide';
// import { jwtDecode } from 'jwt-decode';
// import * as message from '../../components/Message/Message';
// import { GoogleLogin } from 'react-google-login'; // Import GoogleLogin

// const SignInPage = () => {
//   const [isShowPassword, setIsShowPassword] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();

//   const mutation = useMutationHooks(data => UserService.loginUser(data));
//   const { data, isLoading, isSuccess, isError, error } = mutation;

//   useEffect(() => {
//     if (isSuccess) {
//       const redirectPath = location?.state || '/';
//       navigate(redirectPath);
//       localStorage.setItem('access_token', JSON.stringify(data?.access_token));
//       localStorage.setItem('refresh_token', JSON.stringify(data?.refresh_token));
//       if (data?.access_token) {
//         const decoded = jwtDecode(data?.access_token);
//         if (decoded?.id) {
//           handleGetDetailsUser(decoded?.id, data?.access_token);
//         }
//       }
//     }
  
//     if (isError) {
//       const errorMessage = error?.response?.data?.message || 'An error occurred. Please try again.';
//       message.error(errorMessage);
//     }
//   }, [isSuccess, isError, error]);

//   const handleGetDetailsUser = async (id, token) => {
//     const refreshToken = JSON.parse(localStorage.getItem('refresh_token'));
//     const res = await UserService.getDetailsUser(id, token);
//     dispatch(updateUser({ ...res?.data, access_token: token, refreshToken }));
//   };

//   const handleNavigateSignUp = () => {
//     navigate('/sign-up');
//   };

//   const handleNavigateForgotPass = () => {
//     navigate('/forgot-password');
//   };

//   const handleOnChangeEmail = (value) => {
//     setEmail(value);
//   };

//   const handleOnChangePassword = (value) => {
//     setPassword(value);
//   };

//   const handleSignIn = () => {
//     setErrorMessage('');
//     mutation.mutate({ email, password });
//   };

//   // Function to handle Google login
//   const handleGoogleLoginSuccess = async (response) => {
//     const { profileObj, tokenId } = response;
//     // Here you can send the tokenId to your server for further processing or verification
//     const res = await UserService.loginWithGoogle({ tokenId });
//     if (res) {
//       const decoded = jwtDecode(res.access_token);
//       handleGetDetailsUser(decoded.id, res.access_token);
//     }
//   };

//   const handleGoogleLoginFailure = (response) => {
//     message.error('Login with Google failed. Please try again.');
//   };

//   return (
//     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh' }}>
//       <div style={{ width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
//         <WrapperContainerLeft>
//           <h1>Xin chào</h1>
//           <p>Đăng nhập để tạo tài khoản</p>
//           <InputForm
//             style={{ marginBottom: '10px' }}
//             placeholder="abc@gmail.com"
//             value={email}
//             onChange={handleOnChangeEmail}
//           />
//           <div style={{ position: 'relative' }}>
//             <span
//               onClick={() => setIsShowPassword(prev => !prev)}
//               style={{ zIndex: 10, position: 'absolute', top: '4px', right: '8px' }}
//             >
//               {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
//             </span>
//             <InputForm
//               placeholder="Password"
//               type={isShowPassword ? 'text' : 'password'}
//               value={password}
//               onChange={handleOnChangePassword}
//             />
//           </div>
//           {errorMessage && <span style={{ color: 'red' }}>{error?.response?.data?.message}</span>}
//           <Loading isLoading={isLoading}>
//             <ButtonComponent
//               disabled={!email || !password}
//               onClick={handleSignIn}
//               size={40}
//               styleButton={{
//                 background: 'rgb(255, 57, 69)',
//                 height: '48px',
//                 width: '100%',
//                 border: 'none',
//                 borderRadius: '4px',
//                 margin: '26px 0 10px'
//               }}
//               textbutton="Đăng nhập"
//               styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
//             />
//           </Loading>
//           <p><WrapperTextLight onClick={handleNavigateForgotPass}>Quên mật khẩu?</WrapperTextLight></p>
//           <p>
//             Chưa có tài khoản? <WrapperTextLight onClick={handleNavigateSignUp}>Tạo tài khoản</WrapperTextLight>
//           </p>
//           {/* Google Login Button */}
//           <GoogleLogin
//             clientId="YOUR_GOOGLE_CLIENT_ID" // Replace with your actual Google client ID
//             buttonText="Đăng nhập bằng Google"
//             onSuccess={handleGoogleLoginSuccess}
//             onFailure={handleGoogleLoginFailure}
//             cookiePolicy={'single_host_origin'}
//             style={{ marginTop: '10px', width: '100%' }}
//           />
//         </WrapperContainerLeft>
//         <WrapperContainerRight>
//           <Image src={imageLogo} preview={false} alt="image-logo" height="203px" width="203px" />
//           <h4>Mua sắm tại LTTD</h4>
//         </WrapperContainerRight>
//       </div>
//     </div>
//   );
// };

// export default SignInPage;
