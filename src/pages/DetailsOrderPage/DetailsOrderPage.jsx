import React, { useMemo } from 'react';
import { WrapperContentInfo, WrapperHeaderUser, WrapperInfoUser, WrapperLabel, WrapperStyleContent } from './style';
import { useLocation, useParams } from 'react-router-dom';
import * as OrderService from '../../services/OrderService';
import { useQuery } from '@tanstack/react-query';
import { orderContant } from '../../contant';
import { convertPrice } from '../../utils';
import Loading from '../../components/LoadingComponent/Loading';
import { Table } from 'antd';

const DetailsOrderPage = () => {
  const params = useParams();
  const location = useLocation();
  const { state } = location;
  const { id } = params;

  // Fetch order details
  const fetchDetailsOrder = async () => {
    const res = await OrderService.getDetailsOrder(id, state?.token);
    return res.data;
  };

  const queryOrder = useQuery({
    queryKey: ['orders-details'],
    queryFn: fetchDetailsOrder,
    enabled: !!id,
  });
  const { isLoading, data } = queryOrder;

  // Calculate subtotal and total with shipping
  const priceMemo = useMemo(() => {
    return data?.orderItems?.reduce((total, product) => {
      const productTotal = product.price * product.amount;
      const discountAmount = productTotal * (product.discount / 100);
      return total + (productTotal - discountAmount);
    }, 0) || 0;
  }, [data]);

  // Calculate total with shipping fee
  const totalPriceWithShipping = useMemo(() => {
    return priceMemo + (data?.shippingPrice || 0);
  }, [priceMemo, data]);

  // Product list data for the table
  const dataSource = [
    ...data?.orderItems?.map((item, index) => ({
      key: index,
      product: item.name,
      price: item.price,
      amount: item.amount,
      discount: item.discount,
      totalPrice: (item.price * (1 - item.discount / 100)) * item.amount,
    })) || [],
    {
      key: 'shipping',
      product: 'Phí vận chuyển',
      price: convertPrice(data?.shippingPrice),
      amount: '',
      discount: '',
      totalPrice: convertPrice(data?.shippingPrice),
    },
    {
      key: 'total',
      product: 'Tổng cộng',
      price: '',
      amount: '',
      discount: '',
      totalPrice: convertPrice(totalPriceWithShipping),
    },
  ];

  // Table columns
  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'product',
      key: 'product',
      render: (_, order) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {order.image && (
            <img
              src={order.image}
              alt="product"
              style={{
                width: '70px',
                height: '70px',
                objectFit: 'cover',
                border: '1px solid rgb(238, 238, 238)',
                padding: '2px',
                marginRight: '10px',
              }}
            />
          )}
          <span
            style={{
              width: 260,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {order.product}
          </span>
        </div>
      ),
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price) => convertPrice(price),
    },
    {
      title: 'Số lượng',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Giảm giá',
      dataIndex: 'discount',
      key: 'discount',
      render: (discount, order) => {
        const discountedAmount = (order.price * order.amount * (discount / 100));
        return discount ? convertPrice(discountedAmount) : '0 VND';
      },
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (totalPrice) => convertPrice(totalPrice),
    },
  ];

  return (
    <Loading isLoading={isLoading}>
      <div style={{ width: '100%', height: '100vh', background: '#f5f5fa' }}>
        <div style={{ width: '1270px', margin: '0 auto', height: '1270px' }}>
          <h4>Chi tiết đơn hàng</h4>
          <WrapperHeaderUser>
            <WrapperInfoUser>
              <WrapperLabel>Địa chỉ người nhận</WrapperLabel>
              <WrapperContentInfo>
                <div className='name-info'>{data?.shippingAddress?.fullName}</div>
                <div className='address-info'>
                  <span>Địa chỉ: </span>{`${data?.shippingAddress?.address} ${data?.shippingAddress?.city}`}
                </div>
                <div className='phone-info'><span>Điện thoại: </span>{data?.shippingAddress?.phone}</div>
              </WrapperContentInfo>
            </WrapperInfoUser>
            <WrapperInfoUser>
              <WrapperLabel>Hình thức giao hàng</WrapperLabel>
              <WrapperContentInfo>
                <div className='delivery-info'>
                  <span className='name-delivery'>FAST </span>Giao hàng tiết kiệm
                </div>
                <div className='delivery-fee'><span>Phí giao hàng: </span>{convertPrice(data?.shippingPrice)}</div>
              </WrapperContentInfo>
            </WrapperInfoUser>
            <WrapperInfoUser>
              <WrapperLabel>Hình thức thanh toán</WrapperLabel>
              <WrapperContentInfo>
                <div className='payment-info'>{orderContant.payment[data?.paymentMethod]}</div>
                <div className='status-payment'>{data?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</div>
              </WrapperContentInfo>
            </WrapperInfoUser>
          </WrapperHeaderUser>

          <WrapperStyleContent>
            <Table
              columns={columns}
              dataSource={dataSource}
              pagination={false}
            />
          </WrapperStyleContent>
        </div>
      </div>
    </Loading>
  );
};

export default DetailsOrderPage;
