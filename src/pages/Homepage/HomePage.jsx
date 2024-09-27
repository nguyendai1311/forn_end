// import React, { useEffect, useState } from 'react';
// import SliderComponent from '../../components/SliderComponent/SliderComponent';
// import TypeProduct from '../../components/TypeProduct/TypeProduct';
// import { WrapperProducts, WrapperTypeProduct } from './style';
// import slider1 from '../../assets/images/img1.jpg';
// import slider2 from '../../assets/images/img2.jpg';
// import slider3 from '../../assets/images/img3.jpg';
// import CardComponent from '../../components/CardComponent/CardComponent';
// import { useQuery } from '@tanstack/react-query';
// import * as ProductService from '../../services/ProductService';
// import { useSelector } from 'react-redux';
// import Loading from '../../components/LoadingComponent/Loading';
// import { useDebounce } from '../../hooks/useDebounce';
// import { Pagination } from 'antd';
// import { useLocation } from 'react-router-dom';

// const HomePage = () => {
//   const searchProduct = useSelector((state) => state?.product?.search);
//   const searchDebounce = useDebounce(searchProduct, 500);
//   const [loading, setLoading] = useState(false);
//   const [typeProducts, setTypeProducts] = useState([]);
//   const [pagination, setPagination] = useState({
//     page: 1, 
//     limit: 24,
//     total: 0,
//   });

//   const { state } = useLocation();

//   useEffect(() => {
//     if (state) {
//       setPagination({ page: 1, limit: pagination.limit });  
//     }
//   }, [state]);

//   console.log('page', pagination.page, 'total', pagination.total, 'limit', pagination.limit);

//   const fetchProductAll = async () => {
//     try {
//       setLoading(true);
//       console.log(`Fetching products for page: ${pagination.page}`); 
//       const res = await ProductService.getAllProduct(searchDebounce, pagination.page, pagination.limit);
//       console.log('API Response:', res);
//       setPagination((prev) => ({ ...prev, total: res.total || 0 })); // Set total based on API response
//       return res; 
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAllTypeProduct = async () => {
//     const res = await ProductService.getAllTypeProduct();
//     if (res?.status === 'OK') {
//       setTypeProducts(res?.data);
//     }
//   };

//   const { isLoading, data: products } = useQuery(
//     ['products', pagination.page, searchDebounce],
//     fetchProductAll,
//     { retry: 3, retryDelay: 1000, keepPreviousData: true }
//   );

//   const onChange = (current, pageSize) => {
//     setPagination({ ...pagination, page: current, limit: pageSize });
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   useEffect(() => {
//     fetchAllTypeProduct();
//   }, []);

//   return (
//     <Loading isLoading={isLoading || loading}>
//       <div style={{ width: '1270px', margin: '0 auto' }}>
//         <WrapperTypeProduct>
//           {typeProducts.map((item) => (
//             <TypeProduct name={item} key={item} />
//           ))}
//         </WrapperTypeProduct>
//       </div>
//       <div className='body' style={{ width: '100%', backgroundColor: '#efefef', }}>
//         <div id="container" style={{ height: '1700px', width: '1270px', margin: '0 auto' }}>
//           <SliderComponent arrImages={[slider1, slider2, slider3]} />
//           <WrapperProducts>
//             {products?.data?.map((product) => (
//               <CardComponent
//                 key={product._id}
//                 countInStock={product.countInStock}
//                 description={product.description}
//                 image={product.image}
//                 name={product.name}
//                 price={product.price}
//                 rating={product.rating}
//                 type={product.type}
//                 selled={product.selled}
//                 discount={product.discount}
//                 id={product._id}
//               />
//             ))}
//           </WrapperProducts>
//           <Pagination
//             current={pagination.page}
//             total={pagination.total}
//             onChange={onChange}
//             pageSize={pagination.limit}
//             style={{ textAlign: 'center', marginTop: '10px' }}
//           />
//         </div>
//       </div>
//     </Loading>
//   );
// };

// export default HomePage;

import React, { useEffect, useState } from 'react';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import { WrapperProducts, WrapperTypeProduct } from './style';
import slider1 from '../../assets/images/img1.jpg';
import slider2 from '../../assets/images/img2.jpg';
import slider3 from '../../assets/images/img3.jpg';
import CardComponent from '../../components/CardComponent/CardComponent';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../services/ProductService';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../components/LoadingComponent/Loading';
import { useDebounce } from '../../hooks/useDebounce';
import { Pagination } from 'antd';
import { useLocation } from 'react-router-dom';

const HomePage = () => {
  const dispatch = useDispatch();
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);
  const [loading, setLoading] = useState(false);
  const [typeProducts, setTypeProducts] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1, 
    limit: 24,
    total: 0,
  });

  const { state } = useLocation();

  useEffect(() => {
    if (state) {
      setPagination({ page: 1, limit: pagination.limit });  
    }
  }, [state]);

  console.log('page', pagination.page, 'total', pagination.total, 'limit', pagination.limit);

  const fetchProductAll = async () => {
    try {
      setLoading(true);
      console.log(`Fetching products for page: ${pagination.page}`); 
      const res = await ProductService.getAllProduct(searchDebounce, pagination.page, pagination.limit);
      console.log('API Response:', res);
      setPagination((prev) => ({ ...prev, total: res.total || 0 })); // Set total based on API response
      return res; 
    } finally {
      setLoading(false);
    }
  };

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === 'OK') {
      setTypeProducts(res?.data);
    }
  };

  const { isLoading, data: products } = useQuery(
    ['products', pagination.page, searchDebounce],
    fetchProductAll,
    { retry: 3, retryDelay: 1000, keepPreviousData: true }
  );

  const onChange = (current, pageSize) => {
    setPagination({ ...pagination, page: current, limit: pageSize });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

 

  return (
    <Loading isLoading={isLoading || loading}>
      <div style={{ width: '1270px', margin: '0 auto' }}>
        <WrapperTypeProduct>
          {typeProducts.map((item) => (
            <TypeProduct name={item} key={item} />
          ))}
        </WrapperTypeProduct>
      </div>
      <div className='body' style={{ width: '100%', backgroundColor: '#efefef', }}>
        <div id="container" style={{ height: '1700px', width: '1270px', margin: '0 auto' }}>
          <SliderComponent arrImages={[slider1, slider2, slider3]} />
          <WrapperProducts>
            {products?.data?.map((product) => (
              <CardComponent
                key={product._id}
                countInStock={product.countInStock}
                description={product.description}
                image={product.image}
                name={product.name}
                price={product.price}
                rating={product.rating}
                type={product.type}
                selled={product.selled}
                discount={product.discount}
                id={product._id}
              />
            ))}
          </WrapperProducts>
          <Pagination
            current={pagination.page}
            total={pagination.total}
            onChange={onChange}
            pageSize={pagination.limit}
            style={{ textAlign: 'center', marginTop: '10px' }}
          />
        </div>
      </div>
    </Loading>
  );
};

export default HomePage;
