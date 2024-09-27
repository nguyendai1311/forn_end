// import { Button } from 'antd';
// import React, { useState } from 'react';
// import InputComponent from '../InputComponent/InputComponent';
// import ButtonComponent from '../ButtonComponent/ButtonComponent';
// import { SearchOutlined } from '@ant-design/icons'

// const ButttonInputSearch = ({ 
//   size, 
//   placeholder, 
//   textbutton, 
//   bordered, 
//   backgroundColorInput = '#fff', 
//   backgroundColorButton = 'rgb(13, 92, 182)', 
//   colorButton = '#fff', 
//   onSearch 
// }) => {
//   const [inputValue, setInputValue] = useState('');

//   const handleSearch = () => {
//     if (onSearch) {
//       onSearch(inputValue);
//     }
//   };

//   return (
//     <div style={{ display: 'flex' }}>
//       <InputComponent
//         size={size}
//         placeholder={placeholder}
//         bordered={bordered}
//         style={{ backgroundColor: backgroundColorInput }}
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//       />
//       <ButtonComponent
//         size={size}
//         styleButton={{ background: backgroundColorButton, border: !bordered && 'none' }}
//         icon={<SearchOutlined color={colorButton} style={{ color: '#fff' }} />}
//         textbutton={textbutton}
//         styleTextButton={{ color: colorButton }}
//         onClick={handleSearch}
//       />
//     </div>
//   );
// };

// export default ButttonInputSearch;


import { Button } from 'antd';
import React, { useState } from 'react';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { SearchOutlined } from '@ant-design/icons';
import VoiceSearchComponent from '../VoiceSearchComponent/VoiceSearchComponent';

const ButttonInputSearch = ({
  size,
  placeholder,
  textbutton,
  bordered,
  backgroundColorInput = '#fff',
  backgroundColorButton = 'rgb(13, 92, 182)',
  colorButton = '#fff',
  onSearch
}) => {
  // Define the state for input value
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    if (onSearch) {
      onSearch(inputValue);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <InputComponent
        size={size}
        placeholder={placeholder}
        bordered={bordered}
        style={{ backgroundColor: backgroundColorInput }}
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)}
      />
        <VoiceSearchComponent
        style={{ backgroundColor: backgroundColorInput }}
        onSearch={(searchTerm) => {
          setInputValue(searchTerm); 
          onSearch(searchTerm); 
        }}
      />
      <ButtonComponent
        size={size}
        styleButton={{ background: backgroundColorButton, border: !bordered && 'none' }}
        icon={<SearchOutlined style={{ color: '#fff' }} />} 
        textbutton={textbutton}
        styleTextButton={{ color: colorButton }}
        onClick={handleSearch} 
      />
    </div>
  );
};

export default ButttonInputSearch;

