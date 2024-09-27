// import { Badge, Col, Popover } from 'antd';
// import React, { useState, useEffect } from 'react';
// import {
//   WrapperContentPopup,
//   WrapperHeader,
//   WrapperHeaderAccout,
//   WrapperTextHeader,
//   WrapperTextHeaderSmall
// } from './style';
// import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
// import ButttonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import * as UserService from '../../services/UserService';
// import { resetUser } from '../../redux/slides/userSlide';
// import Loading from '../LoadingComponent/Loading';
// import { searchProduct } from '../../redux/slides/productSlide';

// const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
//   const navigate = useNavigate();
//   const user = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const [userName, setUserName] = useState('');
//   const [userAvatar, setUserAvatar] = useState('');
//   const [search, setSearch] = useState('');
//   const [isOpenPopup, setIsOpenPopup] = useState(false);
//   const order = useSelector((state) => state.order);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (user) {
//       setUserName(user.name);
//       setUserAvatar(user.avatar);
//     }
//   }, [user]);

//   const handleNavigateLogin = () => {
//     navigate('/sign-in');
//   };

//   const handleLogout = async () => {
//     setLoading(true);
//     await UserService.logoutUser();
//     dispatch(resetUser());
//     setLoading(false);
//   };

//   const content = (
//     <div>
//       <WrapperContentPopup onClick={() => handleClickNavigate('profile')}>Thông tin người dùng</WrapperContentPopup>
//       {user?.isAdmin && (
//         <WrapperContentPopup onClick={() => handleClickNavigate('admin')}>Quản lí hệ thống</WrapperContentPopup>
//       )}
//       <WrapperContentPopup onClick={() => handleClickNavigate('my-order')}>Đơn hàng của tôi</WrapperContentPopup>
//       <WrapperContentPopup onClick={() => handleClickNavigate()}>Đăng xuất</WrapperContentPopup>
//     </div>
//   );

//   const handleClickNavigate = (type) => {
//     if (type === 'profile') {
//       navigate('/profile-user');
//     } else if (type === 'admin') {
//       navigate('/system/admin');
//     } else if (type === 'my-order') {
//       navigate('/my-order', {
//         state: {
//           id: user?.id,
//           token: user?.access_token,
//         },
//       });
//     } else {
//       handleLogout();
//     }
//     setIsOpenPopup(false);
//   };

//   const onSearch = (searchTerm) => {
//     setSearch(searchTerm);
//     dispatch(searchProduct(searchTerm));
//   };

//   return (
//     <div style={{ height: '100%', width: '100%', display: 'flex', background: '#9255FD', justifyContent: 'center' }}>
//       <WrapperHeader style={{ justifyContent: isHiddenSearch ? 'space-between' : 'unset' }}>
//         <Col span={5}>
//           <WrapperTextHeader to='/'>SHOP</WrapperTextHeader>
//         </Col>
//         {!isHiddenSearch && (
//           <Col span={13}>
//             <ButttonInputSearch
//               size="large"
//               bordered={false}
//               textbutton="Tìm kiếm"
//               placeholder="Nhập từ khóa tìm kiếm"
//               onSearch={onSearch}
//               backgroundColorButton="#5a20c1"
//             />
//           </Col>
//         )}
//         <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
//           <Loading isLoading={loading}>
//             <WrapperHeaderAccout>
//               {userAvatar ? (
//                 <img
//                   src={userAvatar}
//                   alt="avatar"
//                   style={{
//                     height: '30px',
//                     width: '30px',
//                     borderRadius: '50%',
//                     objectFit: 'cover',
//                   }}
//                 />
//               ) : (
//                 <UserOutlined style={{ fontSize: '30px' }} />
//               )}
//               {user?.access_token ? (
//                 <Popover content={content} trigger="click" open={isOpenPopup}>
//                   <div
//                     style={{ cursor: 'pointer', maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }}
//                     onClick={() => setIsOpenPopup((prev) => !prev)}
//                   >
//                     {userName || user?.email}
//                   </div>
//                 </Popover>
//               ) : (
//                 <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
//                   <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
//                   <div>
//                     <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
//                     <CaretDownOutlined />
//                   </div>
//                 </div>
//               )}
//             </WrapperHeaderAccout>
//           </Loading>
//           {!isHiddenCart && (
//             <div onClick={() => navigate('/order')} style={{ cursor: 'pointer' }}>
//               <Badge count={order?.orderItems?.length} size="small">
//                 <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
//               </Badge>
//               <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
//             </div>
//           )}
//         </Col>
//       </WrapperHeader>
//     </div>
//   );
// };

// export default HeaderComponent;

import { Badge, Col, Popover } from 'antd';
import React, { useState, useEffect } from 'react';
import {
  WrapperContentPopup,
  WrapperHeader,
  WrapperHeaderAccout,
  WrapperTextHeader,
  WrapperTextHeaderSmall
} from './style';
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ButttonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService';
import { resetUser } from '../../redux/slides/userSlide';
import Loading from '../LoadingComponent/Loading';
import { searchProduct } from '../../redux/slides/productSlide'; 

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const order = useSelector((state) => state.order);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (user) {
      setUserName(user.name || user.email);
      setUserAvatar(user.avatar);
    }
  }, [user]);

  const handleNavigateLogin = () => {
    navigate('/sign-in');
  };

  const handleLogout = async () => {
    setLoading(true);
    await UserService.logoutUser();
    dispatch(resetUser());
    setLoading(false);
  };

  const handleClickNavigate = (route) => {
    if (route === 'logout') {
      handleLogout();
    } else {
      navigate(route);
    }
    setIsOpenPopup(false);
  };

  const content = (
    <div>
      <WrapperContentPopup onClick={() => handleClickNavigate('/profile-user')}>Thông tin người dùng</WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={() => handleClickNavigate('/system/admin')}>Quản lí hệ thống</WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={() => handleClickNavigate('/my-order')}>Đơn hàng của tôi</WrapperContentPopup>
      <WrapperContentPopup onClick={() => handleClickNavigate('logout')}>Đăng xuất</WrapperContentPopup>
    </div>
  );

  const onSearch = (value) => {
    setSearchTerm(value);
    dispatch(searchProduct(value));
  };


  const handleShopClick = () => {
    setSearchTerm(''); 
    dispatch(searchProduct(''));
  };

  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', background: '#9255FD', justifyContent: 'center' }}>
      <WrapperHeader style={{ justifyContent: isHiddenSearch ? 'space-between' : 'unset' }}>
        <Col span={5}>
          <WrapperTextHeader to="/" onClick={handleShopClick}>SHOP</WrapperTextHeader>
        </Col>
        {!isHiddenSearch && (
          <Col span={13} style={{backgroundColor: '#fff', gap: '20px' }}>
            <ButttonInputSearch
              size="large"
              bordered={false}
              textbutton="Tìm kiếm"
              placeholder="Nhập từ khóa tìm kiếm"
              onSearch={onSearch}
              backgroundColorButton="#5a20c1"
              value={searchTerm || ''}
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </Col>
        )}
        <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
          <Loading isLoading={loading}>
            <WrapperHeaderAccout>
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt="avatar"
                  style={{
                    height: '30px',
                    width: '30px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <UserOutlined style={{ fontSize: '30px' }} />
              )}
              {user?.access_token ? (
                <Popover content={content} trigger="click" open={isOpenPopup}>
                  <div
                    style={{ cursor: 'pointer', maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }}
                    onClick={() => setIsOpenPopup((prev) => !prev)}
                  >
                    {userName}
                  </div>
                </Popover>
              ) : (
                <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                  <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                  <div>
                    <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                    <CaretDownOutlined />
                  </div>
                </div>
              )}
            </WrapperHeaderAccout>
          </Loading>
          {!isHiddenCart && (
            <div onClick={() => navigate('/order')} style={{ cursor: 'pointer' }}>
              <Badge count={order?.orderItems?.length} size="small">
                <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
              </Badge>
              <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
            </div>
          )}
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;

