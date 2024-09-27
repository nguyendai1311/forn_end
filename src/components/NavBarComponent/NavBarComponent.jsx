import React, { useState, useEffect } from 'react';
import { WrapperContent, WrapperLabelText, WrapperTextPrice, WrapperTextValue } from './style';
import { Checkbox, Rate } from 'antd';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import * as ProductService from '../../services/ProductService';

const NavBarComponent = () => {
    const [typeProducts, setTypeProducts] = useState([]);

    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct();
        if (res?.status === 'OK') {
            setTypeProducts(res?.data);
        }
    };

    useEffect(() => {
        fetchAllTypeProduct();
        fetchFilteredProducts()
    }, []);

    const fetchFilteredProducts = async (filters) => {
        const filterArray = [];
        const res = await ProductService.getAllProduct(10, 0, null, filterArray);
        console.log('Filtered products:', res?.data);
    };

    return (
        <div>
            <WrapperContent>
                <WrapperLabelText>Filter by Type</WrapperLabelText>
                {
                    typeProducts.map((item) => (
                        <TypeProduct name={item} key={item} />
                    ))
                }
            </WrapperContent>
        </div>
    );
};

export default NavBarComponent

// import React, { useState } from 'react';

// const NavBarComponent = ({ onPriceRangeChange }) => {
//     const [priceRange, setPriceRange] = useState([20000, 500000]); // Default price range

//     // Handle input change for min and max prices
//     const handleInputChange = (index, value) => {
//         const newPriceRange = [...priceRange];
//         const numericValue = Number(value) || 0; // Ensure the value is a number

//         // Update the price range and ensure min <= max
//         if (index === 0) {
//             // Update min price
//             newPriceRange[0] = Math.min(numericValue, newPriceRange[1]); // Ensure min <= max
//         } else {
//             // Update max price
//             newPriceRange[1] = Math.max(numericValue, newPriceRange[0]); // Ensure max >= min
//         }

//         setPriceRange(newPriceRange);
//         onPriceRangeChange(newPriceRange); // Send updated price range to parent
//     };

//     return (
//         <div>
//             <h3>Filter by Price</h3>
//             <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
//                 <input
//                     type="number"
//                     value={priceRange[0]}
//                     onChange={(e) => handleInputChange(0, e.target.value)} // Update min price
//                     placeholder="Min Price"
//                     style={{ width: '100px' }}
//                 />
//                 <span>-</span>
//                 <input
//                     type="number"
//                     value={priceRange[1]}
//                     onChange={(e) => handleInputChange(1, e.target.value)} // Update max price
//                     placeholder="Max Price"
//                     style={{ width: '100px' }}
//                 />
//             </div>
//             <div style={{ marginTop: '10px', textAlign: 'center' }}>
//                 <span>
//                     Price: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()}
//                 </span>
//             </div>
//         </div>
//     );
// };

// export default NavBarComponent;
