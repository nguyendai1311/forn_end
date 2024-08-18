import React from 'react';
import { WrapperContent, WrapperLabelText, WrapperTextPrice, WrapperTextValue } from './style';
import { Checkbox } from 'antd';
import { Rate } from 'antd';

const NavBarComponent = () => {
    const onChange = () => { }

    const renderContent = (type, options) => {
        switch (type) {
            case 'text':
                return options.map((option, index) => (
                    <WrapperTextValue key={index}>{option}</WrapperTextValue>
                ));
            case 'checkbox':
                return (
                    <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }} onChange={onChange}>
                        {options.map((option, index) => (
                            <Checkbox key={index} style={{ marginLeft: 0 }} value={option.value}>{option.label}</Checkbox>
                        ))}
                    </Checkbox.Group>
                );
            case 'star':
                return options.map((option, index) => (
                    <div key={index} style={{ display: 'flex', gap: '4px' }}>
                        <Rate style={{ fontSize: '12px' }} allowHalf defaultValue={option} />
                        <span>từ {option} sao</span>
                    </div>
                ));
            case 'price':
                return options.map((option, index) => (
                    <WrapperTextPrice key={index}>{option}</WrapperTextPrice>
                ));
            default:
                return null;
        }
    }

    return (
        <div>
            <WrapperContent>
                <WrapperLabelText>Label</WrapperLabelText>
                {renderContent('text', ['Tủ Lạnh', 'TV', 'Máy Giặt'])}
            </WrapperContent>
            <WrapperContent>
                {renderContent('checkbox', [
                    { value: 'a', label: 'a' },
                    { value: 'b', label: 'b' }
                ])}
            </WrapperContent>
            <WrapperContent>
                {renderContent('star', [3, 4, 5])}
            </WrapperContent>
            <WrapperContent>
                {renderContent('price', ['dưới 40.000đ', 'trên 50.000đ'])}
            </WrapperContent>
        </div>
    );
}

export default NavBarComponent;
