import React, { useEffect, useState } from 'react';
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent';
import CardComponent from '../../components/CardComponent/CardComponent';
import { Col, Pagination, Row } from 'antd';
import { WrapperNavbar, WrapperProducts } from './style';
import { useLocation } from 'react-router-dom';
import * as ProductService from '../../services/ProductService';
import Loading from '../../components/LoadingComponent/Loading';
import { useSelector } from 'react-redux';
import { useDebounce } from '../../hooks/useDebounce';

const TypeProductPage = () => {
    const searchProduct = useSelector((state) => state?.product?.search);
    const searchDebounce = useDebounce(searchProduct, 500);
    const { state } = useLocation();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0, 
    });

    const fetchProductType = async (type, page, limit, search) => {
        setLoading(true);
        const res = await ProductService.getProductType(type, page, limit);
        if (res?.status === 'OK') {
            setProducts(res?.data);
            setPagination((prev) => ({
                ...prev,
                total: res?.totalPage || 0, 
            }));
        }
        setLoading(false);
    };

    useEffect(() => {
        if (state) {
            fetchProductType(state, pagination.page, pagination.limit, searchDebounce);
        }
    }, [state, pagination.page, pagination.limit, searchDebounce]);

    useEffect(() => {
        if (state) {
            setPagination({ ...pagination, page: 0 }); 
        }
    }, [state]);

    const onChange = (current, pageSize) => {
        setPagination({ ...pagination, page: current - 1, limit: pageSize });    
    };

    const filteredProducts = products?.filter((product) => {
        if (searchDebounce === '') {
            return true;
        }
        return product?.name?.toLowerCase()?.includes(searchDebounce?.toLowerCase());
    });

    return (
        <Loading isLoading={loading}>
            <div style={{ width: '100%', background: '#efefef', height: 'calc(100vh - 64px)' }}>
                <div style={{ width: '1270px', margin: '0 auto', height: '100%' }}>
                    <Row style={{ flexWrap: 'nowrap', paddingTop: '10px', height: 'calc(100% - 20px)' }}>
                        <WrapperNavbar span={4}>
                            <NavBarComponent />
                        </WrapperNavbar>
                        <Col span={20} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <WrapperProducts>
                                {filteredProducts?.map((product) => (
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
                                current={pagination.page +1} 
                                total={pagination.total * pagination.limit} 
                                onChange={onChange} 
                                pageSize={pagination.limit} 
                                style={{ textAlign: 'center', marginTop: '10px' }}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        </Loading>
    );
};

export default TypeProductPage;


