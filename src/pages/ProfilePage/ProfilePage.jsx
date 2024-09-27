import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import InputForm from '../../components/InputForm/InputForm'
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperUploadFile } from './style'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHooks'
import Loading from '../../components/LoadingComponent/Loading'
import * as message from '../../components/Message/Message'
import { updateUser } from '../../redux/slides/userSlide'
import { Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { getBase64 } from '../../utils'

const ProfilePage = () => {
    const user = useSelector((state) => state.user)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [street, setStreet] = useState('') // Street number
    const [ward, setWard] = useState('')
    const [district, setDistrict] = useState('')
    const [province, setProvince] = useState('')
    const [avatar, setAvatar] = useState('')
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [selectedProvince, setSelectedProvince] = useState('')
    const [selectedDistrict, setSelectedDistrict] = useState('')
    const [selectedWard, setSelectedWard] = useState('')
    const [provinceName, setProvinceName] = useState('')
    const [districtName, setDistrictName] = useState('')
    const [wardName, setWardName] = useState('')

    const mutation = useMutationHooks(
        (data) => {
            const { id, access_token, ...rests } = data
            UserService.updateUser(id, rests, access_token)
        }
    )

    const dispatch = useDispatch()
    const { isLoading, isSuccess, isError } = mutation

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await fetch('https://provinces.open-api.vn/api/p/')
                const data = await response.json()
                setProvinces(data)
            } catch (error) {
                console.error('Error fetching provinces:', error)
            }
        }
        fetchProvinces()
    }, [])

    useEffect(() => {
        if (selectedProvince) {
            const fetchDistricts = async () => {
                try {
                    const response = await fetch(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
                    const data = await response.json()
                    setDistricts(data.districts)
                    setProvinceName(data.name) // Store province name
                } catch (error) {
                    console.error('Error fetching districts:', error)
                }
            }
            fetchDistricts()
        }
    }, [selectedProvince])

    useEffect(() => {
        if (selectedDistrict) {
            const fetchWards = async () => {
                try {
                    const response = await fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
                    const data = await response.json()
                    setWards(data.wards)
                    setDistrictName(data.name) // Store district name
                } catch (error) {
                    console.error('Error fetching wards:', error)
                }
            }
            fetchWards()
        }
    }, [selectedDistrict])

    useEffect(() => {
        if (selectedWard) {
            const fetchWardName = async () => {
                try {
                    const response = await fetch(`https://provinces.open-api.vn/api/w/${selectedWard}`)
                    const data = await response.json()
                    setWardName(data.name) // Store ward name
                } catch (error) {
                    console.error('Error fetching ward name:', error)
                }
            }
            fetchWardName()
        }
    }, [selectedWard])

    useEffect(() => {
        setEmail(user?.email)
        setName(user?.name)
        setPhone(user?.phone)
        setAvatar(user?.avatar)

        // Extract address components if they exist
        if (user?.address) {
            const addressParts = user.address.split(', ')
            if (addressParts.length >= 4) {
                setWard(addressParts[0])
                setStreet(addressParts[1])
                setDistrict(addressParts[2])
                setProvince(addressParts[3])
                setSelectedProvince(addressParts[3]) // Set the selected province
                setSelectedDistrict(addressParts[2]) // Set the selected district
                setSelectedWard(addressParts[0]) // Set the selected ward
            }
        }
    }, [user])

    useEffect(() => {
        if (isSuccess) {
            message.success()
            handleGetDetailsUser(user?.id, user?.access_token)
        } else if (isError) {
            message.error()
        }
    }, [isSuccess, isError])

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token }))
    }

    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnchangeName = (value) => {
        setName(value)
    }
    const handleOnchangePhone = (value) => {
        setPhone(value)
    }
    const handleOnchangeStreet = (value) => {
        setStreet(value)
    }
    const handleOnchangeWard = (value) => {
        setWard(value)
        setSelectedWard(value) // Ensure selectedWard is updated
    }
    const handleOnchangeDistrict = (value) => {
        setDistrict(value)
        setSelectedDistrict(value) // Ensure selectedDistrict is updated
    }
    const handleOnchangeProvince = (value) => {
        setProvince(value)
        setSelectedProvince(value) // Ensure selectedProvince is updated
    }

    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setAvatar(file.preview)
    }

    const handleUpdate = () => {
        const fullAddress = [street,wardName, districtName, provinceName].filter(Boolean).join(', ') // Combine address components and trim
        console.log('Updated Address:', fullAddress)
        mutation.mutate({
            id: user?.id,
            email,
            name,
            phone,
            address: fullAddress,
            avatar,
            access_token: user?.access_token,
        });
    }

    return (
        <div style={{ width: '1270px', margin: '0 auto', height: '500px' }}>
            <WrapperHeader>Thông tin người dùng</WrapperHeader>
            <Loading isLoading={isLoading}>
                <WrapperContentProfile>
                    <WrapperInput>
                        <WrapperLabel htmlFor="name">Name</WrapperLabel>
                        <InputForm style={{ width: '300px' }} id="name" value={name} onChange={(value) => handleOnchangeName(value)} />
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="email">Email</WrapperLabel>
                        <InputForm style={{ width: '300px' }} id="email" value={email} onChange={(value) => handleOnchangeEmail(value)} />

                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
                        <InputForm style={{ width: '300px' }} id="phone" value={phone} onChange={(value) => handleOnchangePhone(value)} />

                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>
                        <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                            <Button icon={<UploadOutlined />}>Select File</Button>
                        </WrapperUploadFile>
                        {avatar && (
                            <img
                                src={avatar}
                                style={{
                                    height: '60px',
                                    width: '60px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                }}
                                alt="avatar"
                            />
                        )}

                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="street">Street</WrapperLabel>
                        <InputForm style={{ width: '300px' }} id="street" value={street} onChange={(value) => handleOnchangeStreet(value)} />
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="province">Province</WrapperLabel>
                        <select id="province" value={selectedProvince} onChange={(e) => handleOnchangeProvince(e.target.value)}>
                            <option value="">Select Province</option>
                            {provinces.map((province) => (
                                <option key={province.code} value={province.code}>
                                    {province.name}
                                </option>
                            ))}
                        </select>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="district">District</WrapperLabel>
                        <select id="district" value={selectedDistrict} onChange={(e) => handleOnchangeDistrict(e.target.value)}>
                            <option value="">Select District</option>
                            {districts.map((district) => (
                                <option key={district.code} value={district.code}>
                                    {district.name}
                                </option>
                            ))}
                        </select>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="ward">Ward</WrapperLabel>
                        <select id="ward" value={selectedWard} onChange={(e) => handleOnchangeWard(e.target.value)}>
                            <option value="">Select Ward</option>
                            {wards.map((ward) => (
                                <option key={ward.code} value={ward.code}>
                                    {ward.name}
                                </option>
                            ))}
                        </select>
                    </WrapperInput>
                    <ButtonComponent
                        onClick={handleUpdate}
                        size={40}
                        styleButton={{
                            height: '30px',
                            width: 'fit-content',
                            borderRadius: '4px',
                            padding: '2px 6px 6px',
                        }}
                        textbutton={'Cập nhật'}
                        styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                    ></ButtonComponent>
                </WrapperContentProfile>
            </Loading>
        </div>
    )
}

export default ProfilePage




