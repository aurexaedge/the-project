'use client';
import dynamic from 'next/dynamic';

import React, { useState } from 'react';
import styles from './NinModification.module.css';
import HeaderLayout from '@/components/HeaderLayout/HeaderLayout';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import CallToAction from '@/components/Buttons/CallToAction/CallToAction';
import axios from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import useFetchData from '@/hooks/useFetchData';
import CircleLoader from '@/components/Loaders/CircleLoader/CircleLoader';
import LoaderWithText from '@/components/Loaders/LoaderWithText/LoaderWithText';

const NinModification = () => {
  const {
    data,
    isError,
    isLoading: isLoadingData,
    isPending,
    isFetching,
  } = useFetchData({
    queryKey: ['fetchServicePrice'],
    endpoint: '/api/v1/admin/services/',
  });

  const router = useRouter();
  const queryClient = useQueryClient();

  const [formDataError, setFormDataError] = useState(false);
  const [formData, setFormData] = useState({
    modificationType: '',
    modificationTypeId: '',
    title: '',
    surname: '',
    firstName: '',
    middleName: '',
    gender: '',
    nin: '',
    DOB: '',
    cityOfResidence: '',
    stateOfResidence: '',
    lgaOfResidence: '',
    addressOfResidence: '',
    stateOfOrigin: '',
    lgaOfOrigin: '',
    email: '',
    phoneNumber: '',
    picture: '',
  });
  const handleInputChange = (event) => {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  const handlePhoneNumberChange = (e) => {
    const valueWithoutNonNumericChars = e.target.value.replace(/[^0-9]/g, '');
    if (valueWithoutNonNumericChars === '') {
      setFormData({
        ...formData,
        phoneNumber: '',
      });
    } else {
      setFormData({
        ...formData,
        phoneNumber: valueWithoutNonNumericChars,
      });
    }
  };

  const { mutate: handleSubmitOrder, isPending: submitOrderIsPending } =
    useMutation({
      mutationFn: async () => {
        const requiredFields = [
          'modificationType',
          'surname',
          'firstName',
          'gender',
          'nin',
          'DOB',
          'cityOfResidence',
          'stateOfResidence',
          'lgaOfResidence',
          'addressOfResidence',
          'stateOfOrigin',
          'lgaOfOrigin',
          'email',
          'phoneNumber',
          'picture',
        ];

        const hasEmptyFields = requiredFields.some(
          (field) => formData[field].length === 0
        );

        if (hasEmptyFields) {
          setFormDataError(true);
          throw new Error('Validation Error: All fields must be completed');
        }

        const res = await axios.post(
          `/api/v1/nin-services/modification`,
          formData
        );
        return res.data;
      },

      onSuccess: async (res) => {
        setFormData({
          modificationType: '',
          title: '',
          surname: '',
          firstName: '',
          middleName: '',
          gender: '',
          nin: '',
          DOB: '',
          cityOfResidence: '',
          stateOfResidence: '',
          lgaOfResidence: '',
          addressOfResidence: '',
          stateOfOrigin: '',
          lgaOfOrigin: '',
          email: '',
          phoneNumber: '',
          picture: '',
        });
        toast.success(res?.message);
        setFormDataError(false);
        queryClient.invalidateQueries(['fetchWallet']);
      },
      onError: (error) => {
        console.log(error);
        toast.error(error?.response?.data?.message || error.message);
      },
    });

  const handleSubmitWithConfirmation = () => {
    const userConfirmed = window.confirm('Do you wish to submit?');

    if (userConfirmed) {
      handleSubmitOrder();
    }
  };
  return (
    <HeaderLayout
      type='go back'
      pageHeader='Nin Modification'
      //   url={`/user/admin/completed-orders`}
    >
      <div className={styles.nin_container}>
        <div className={styles.description_container}>
          {/* <p>
            Duration for modification is{' '}
            <strong>
              <em>three(3) working days </em>
            </strong>
          </p> */}
          <span>Our modification include:</span>
          <ul>
            {data &&
              data[0]?.ninModificationService?.map((item) => {
                return (
                  <li key={item?._id} value={item?.type}>
                    ✅{item?.type} | duration- {item?.duration}
                  </li>
                );
              })}
          </ul>
          {isPending && <LoaderWithText />}
        </div>
        <div className={styles.login_wrapper}>
          <div className={styles.input_wrapper}>
            <label htmlFor='Modification Type'>
              Modification Type: <br />
              <select
                name='modificationType'
                id=''
                value={formData?.modificationType}
                onChange={handleInputChange}
              >
                <option value=''>Select type</option>
                {data &&
                  data[0]?.ninModificationService?.map((item) => {
                    return (
                      <option key={item?._id} value={item?.type}>
                        {item?.type}
                      </option>
                    );
                  })}
              </select>
              <br />
              {formDataError && formData?.modificationType?.length <= 0 ? (
                <span style={{ color: 'red' }}>* required</span>
              ) : (
                ''
              )}
            </label>
          </div>

          <div className={styles.input_wrapper}>
            <label htmlFor='title'>
              Title: <br />
              <input
                type='text'
                name='title'
                placeholder='enter title'
                value={formData?.title}
                onChange={handleInputChange}
              />
              <br />
              {formDataError && formData?.title?.length <= 0 ? (
                <span style={{ color: 'red' }}>* required</span>
              ) : (
                ''
              )}
            </label>
          </div>
          <div className={styles.input_wrapper}>
            <label htmlFor='surname'>
              Surname: <br />
              <input
                type='text'
                name='surname'
                placeholder='enter surname'
                value={formData?.surname}
                onChange={handleInputChange}
              />
              <br />
              {formDataError && formData?.surname?.length <= 0 ? (
                <span style={{ color: 'red' }}>* required</span>
              ) : (
                ''
              )}
            </label>
          </div>
          <div className={styles.input_wrapper}>
            <label htmlFor='firstName'>
              First name: <br />
              <input
                type='text'
                name='firstName'
                placeholder='enter firstname'
                value={formData?.firstName}
                onChange={handleInputChange}
              />
              <br />
              {formDataError && formData?.firstName?.length <= 0 ? (
                <span style={{ color: 'red' }}>* required</span>
              ) : (
                ''
              )}
            </label>
          </div>
          <div className={styles.input_wrapper}>
            <label htmlFor='middleName'>
              Middle name: <br />
              <input
                type='text'
                name='middleName'
                placeholder='enter middle name'
                value={formData?.middleName}
                onChange={handleInputChange}
              />
              <br />
              {formDataError && formData?.middleName?.length <= 0 ? (
                <span style={{ color: 'red' }}>* required</span>
              ) : (
                ''
              )}
            </label>
          </div>
          <div className={styles.input_wrapper}>
            <label htmlFor='gender'>
              Gender: <br />
              <select
                name='gender'
                id=''
                value={formData?.gender}
                onChange={handleInputChange}
              >
                <option value=''>Select gender</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
              </select>
              <br />
              {formDataError && formData?.gender?.length <= 0 ? (
                <span style={{ color: 'red' }}>* required</span>
              ) : (
                ''
              )}
            </label>
          </div>
          <div className={styles.input_wrapper}>
            <label htmlFor='nin'>
              Nin: <br />
              <input
                type='text'
                name='nin'
                placeholder='enter nin'
                value={formData?.nin}
                onChange={handleInputChange}
              />
              <br />
              {formDataError && formData?.nin?.length <= 0 ? (
                <span style={{ color: 'red' }}>* required</span>
              ) : (
                ''
              )}
            </label>
          </div>
          <div className={styles.input_wrapper}>
            <label htmlFor='deviceName'>
              Date of birth: <br />
              <input
                type='date'
                name='DOB'
                value={formData?.DOB}
                onChange={handleInputChange}
              />
              <br />
              {formDataError && formData?.DOB?.length <= 0 ? (
                <span style={{ color: 'red' }}>* required</span>
              ) : (
                ''
              )}
            </label>
          </div>
          <div className={styles.input_wrapper}>
            <label htmlFor='cityOfResidence'>
              Town/City of residence: <br />
              <input
                type='text'
                name='cityOfResidence'
                placeholder='enter city/town of residence'
                value={formData?.cityOfResidence}
                onChange={handleInputChange}
              />
              <br />
              {formDataError && formData?.cityOfResidence?.length <= 0 ? (
                <span style={{ color: 'red' }}>* required</span>
              ) : (
                ''
              )}
            </label>
          </div>
          <div className={styles.input_wrapper}>
            <label htmlFor='stateOfResidence'>
              State of residence: <br />
              <input
                type='text'
                name='stateOfResidence'
                placeholder='enter state of residence'
                value={formData?.stateOfResidence}
                onChange={handleInputChange}
              />
              <br />
              {formDataError && formData?.stateOfResidence?.length <= 0 ? (
                <span style={{ color: 'red' }}>* required</span>
              ) : (
                ''
              )}
            </label>
          </div>
          <div className={styles.input_wrapper}>
            <label htmlFor='lgaOfResidence'>
              LGA of residence: <br />
              <input
                type='text'
                name='lgaOfResidence'
                placeholder='enter LGA of residence'
                value={formData?.lgaOfResidence}
                onChange={handleInputChange}
              />
              <br />
              {formDataError && formData?.lgaOfResidence?.length <= 0 ? (
                <span style={{ color: 'red' }}>* required</span>
              ) : (
                ''
              )}
            </label>
          </div>
          <div className={styles.input_wrapper}>
            <label htmlFor='addressOfResidence'>
              Address of residence: <br />
              <input
                type='text'
                name='addressOfResidence'
                placeholder='enter Address of residence'
                value={formData?.addressOfResidence}
                onChange={handleInputChange}
              />
              <br />
              {formDataError && formData?.addressOfResidence?.length <= 0 ? (
                <span style={{ color: 'red' }}>* required</span>
              ) : (
                ''
              )}
            </label>
          </div>
          <div className={styles.input_wrapper}>
            <label htmlFor='stateOfOrigin'>
              State of Origin: <br />
              <input
                type='text'
                name='stateOfOrigin'
                placeholder='enter state of origin'
                value={formData?.stateOfOrigin}
                onChange={handleInputChange}
              />
              <br />
              {formDataError && formData?.stateOfOrigin?.length <= 0 ? (
                <span style={{ color: 'red' }}>* required</span>
              ) : (
                ''
              )}
            </label>
          </div>

          <div className={styles.input_wrapper}>
            <label htmlFor='lgaOfOrigin'>
              LGA of origin: <br />
              <input
                type='text'
                name='lgaOfOrigin'
                placeholder='enter state of origin'
                value={formData?.lgaOfOrigin}
                onChange={handleInputChange}
              />
              <br />
              {formDataError && formData?.lgaOfOrigin?.length <= 0 ? (
                <span style={{ color: 'red' }}>* required</span>
              ) : (
                ''
              )}
            </label>
          </div>

          <div className={styles.input_wrapper}>
            <label htmlFor='email'>
              Email Adress: <br />
              <input
                type='email'
                name='email'
                placeholder='enter state of origin'
                value={formData?.email}
                onChange={handleInputChange}
              />
              <br />
              {formDataError && formData?.email?.length <= 0 ? (
                <span style={{ color: 'red' }}>* required</span>
              ) : (
                ''
              )}
            </label>
          </div>

          <div className={styles.input_wrapper}>
            <label htmlFor='phoneNumber'>
              Phone number: <br />
              <input
                type='text'
                name='phoneNumber'
                placeholder='Enter phone number'
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
              <br />
              {formDataError && formData?.phoneNumber?.length <= 0 ? (
                <span style={{ color: 'red' }}>* required</span>
              ) : (
                ''
              )}
            </label>
          </div>

          <div className={styles.image__container}>
            {/* <FileBase
              type='file'
              id='image'
              multiple={false}
              accept='image/*'
              onDone={(file) => {
                const fileType = file.type.split('/')[0];
                if (fileType === 'image') {
                  setFormData({ ...formData, picture: file.base64 });
                } else {
                  alert('Please upload a valid image file.');
                  setFormData({ ...formData, picture: '' });
                }
                
              }}
            /> */}
            <label>Photograph</label>
            <input
              type='file'
              id='image'
              accept='image/*'
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    // console.log('reader', reader.result);
                    setFormData({ ...formData, picture: reader.result });
                  };
                  if (file.type.startsWith('image/')) {
                    reader.readAsDataURL(file);
                  } else {
                    alert('Please upload a valid picture file.');
                  }
                }
              }}
            />
            <br />
            {formDataError && formData?.picture?.length <= 0 ? (
              <span style={{ color: 'red' }}>* required</span>
            ) : (
              ''
            )}

            {formData?.picture?.length > 0 && (
              <img
                src={formData?.picture}
                alt='user picture'
                width='300px'
                height='400px'
                style={{ marginTop: '20px', objectFit: 'cover' }}
              />
            )}
          </div>
        </div>
        <br />
        <CallToAction
          loading={submitOrderIsPending}
          text='Submit'
          action={handleSubmitWithConfirmation}
        />
      </div>
    </HeaderLayout>
  );
};

export default NinModification;
