'use client';

import React, { useState } from 'react';
import styles from '../InterBank/InterBank.module.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import CallToAction from '@/components/Buttons/CallToAction/CallToAction';
import axios from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import useFetchData from '@/hooks/useFetchData';
import CircleLoader from '@/components/Loaders/CircleLoader/CircleLoader';
import LoaderWithText from '@/components/Loaders/LoaderWithText/LoaderWithText';
import OverLayLoader from '@/components/Loaders/OverLayLoader/OverLayLoader';
import TopUpModal from '@/app/user/dashboard/TopUpComponent/TopUpModal';
import ErrorModal from '../ErrorModal/ErrorModal';
const currencies = [
  {
    name: 'US Dollar',
    code: 'USD',
    symbol: '$',
  },
  {
    name: 'Euro',
    code: 'EUR',
    symbol: '€',
  },
  {
    name: 'Pound Sterling',
    code: 'GBP',
    symbol: '£',
  },
  {
    name: 'Japanese Yen',
    code: 'JPY',
    symbol: '¥',
  },
  {
    name: 'Swiss Franc',
    code: 'CHF',
    symbol: 'Fr',
  },
  {
    name: 'Indian Rupee',
    code: 'INR',
    symbol: '₹',
  },
];

const countries = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cabo Verde',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Comoros',
  'Congo (Brazzaville)',
  'Congo (Kinshasa)',
  'Costa Rica',
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Eswatini',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Grenada',
  'Guatemala',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Ivory Coast',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'North Korea',
  'North Macedonia',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestine',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Korea',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Sweden',
  'Switzerland',
  'Syria',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Timor-Leste',
  'Togo',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Vatican City',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
  'Zimbabwe',
];

const accountTypes = [
  'Personal (Savings)',
  'Current',
  'Bussiness Checking',
  'Checking',
  'Fixed Desposit',
  'Non Resident',
  'Joint Account',
];

const Wire = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [openModal, setOpenModal] = useState(false);

  const [formDataError, setFormDataError] = useState(false);
  const [formData, setFormData] = useState({
    accountType: '',
    bankName: '',
    beneficiaryAccountName: '',
    beneficiaryAccountNumber: '',
    routingNumber: '',
    // swiftCode: '',
    amount: '',
    transactionPin: '',
    description: '',
    transactionType: 'Debit',
    transferType: 'Wire transfer',
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

  const handleAmountInputChange = (e) => {
    const valueWithoutNonNumericChars = e.target.value.replace(/[^0-9]/g, '');
    const valueWithoutCommas = valueWithoutNonNumericChars.replace(/,/g, '');

    const numberValue = Number(valueWithoutCommas);

    if (!isNaN(numberValue)) {
      const formattedValue =
        valueWithoutCommas !== '' ? numberValue.toLocaleString() : '';
      setFormData({
        ...formData,
        amount: formattedValue,
      });
    } else {
      setFormData({
        ...formData,
        amount: valueWithoutCommas,
      });
    }
  };

  const { mutate: handleSubmitOrder, isPending: submitOrderIsPending } =
    useMutation({
      mutationFn: async () => {
        const requiredFields = [
          'bankName',
          'beneficiaryAccountName',
          'beneficiaryAccountNumber',
          'accountType',
          'routingNumber',
          // 'swiftCode',
          'amount',
          'transactionPin',
          'description',
        ];

        const hasEmptyFields = requiredFields.some(
          (field) => formData[field].length === 0
        );

        if (hasEmptyFields) {
          setFormDataError(true);
          throw new Error('Validation Error: All fields must be completed');
        }

        const res = await axios.post(`/api/v1/transaction`, formData);
        return res.data;
      },

      onSuccess: async (res) => {
        setFormData({
          bankName: '',
          beneficiaryAccountName: '',
          beneficiaryAccountNumber: '',
          accountType: '',
          routingNumber: '',
          // swiftCode: '',
          amount: '',
          transactionPin: '',
          description: '',
          picture: '',
        });
        router.push(`/user/transactions/${res?.message}`);
        toast.success('transfer successful');
        setFormDataError(false);
        setOpenModal(true);
        queryClient.invalidateQueries(['fetchWallet']);
      },
      onError: (error) => {
        if (
          error?.response?.data?.message ===
          'Unauthorised activity discovered, kindly contact support to resolve issue'
        ) {
          showPopUp();
        }
        console.log(error);
        toast.error(error?.response?.data?.message || error.message);
      },
    });

  const handleSubmitWithConfirmation = () => {
    const userConfirmed = window.confirm('Do you wish to submit?');

    if (userConfirmed) {
      // //! remove this when done
      // toast.error('service will be up shortly');
      // return;
      handleSubmitOrder();
    }
  };

  const [showPopup, setShowPopup] = useState(false);

  const showPopUp = () => {
    setShowPopup(!showPopup);
  };
  return (
    <div className={styles.nin_container}>
      <div className={styles.description_container}>
        <span style={{ fontSize: '16px', opacity: '0.8' }}>
          International Wire Transfer
        </span>
      </div>
      <div className={styles.login_wrapper}>
        <div className={styles.input_wrapper}>
          <label htmlFor='bankName'>
            Bank Name: <br />
            <input
              type='text'
              name='bankName'
              placeholder='enter bank name'
              value={formData?.bankName}
              onChange={handleInputChange}
            />
            <br />
            {formDataError && formData?.bankName?.length <= 0 ? (
              <span style={{ color: 'red' }}>* required</span>
            ) : (
              ''
            )}
          </label>
        </div>
        <div className={styles.input_wrapper}>
          <label htmlFor='beneficiaryAccountName'>
            Beneficiary Account Name: <br />
            <input
              type='text'
              name='beneficiaryAccountName'
              placeholder='enter bank name'
              value={formData?.beneficiaryAccountName}
              onChange={handleInputChange}
            />
            <br />
            {formDataError && formData?.beneficiaryAccountName?.length <= 0 ? (
              <span style={{ color: 'red' }}>* required</span>
            ) : (
              ''
            )}
          </label>
        </div>
        <div className={styles.input_wrapper}>
          <label htmlFor='beneficiaryAccountNumber'>
            Beneficiary Account Number: <br />
            <input
              type='number'
              name='beneficiaryAccountNumber'
              placeholder='97001299833'
              value={formData?.beneficiaryAccountNumber}
              onChange={handleInputChange}
            />
            <br />
            {formDataError &&
            formData?.beneficiaryAccountNumber?.length <= 0 ? (
              <span style={{ color: 'red' }}>* required</span>
            ) : (
              ''
            )}
          </label>
        </div>

        <div className={styles.input_wrapper}>
          <label htmlFor='accountType'>
            Account Type: <br />
            <select
              name='accountType'
              id=''
              value={formData?.accountType}
              onChange={handleInputChange}
            >
              <option value=''>-Select type-</option>
              {accountTypes.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
            <br />
            {formDataError && formData?.accountType?.length <= 0 ? (
              <span style={{ color: 'red' }}>* required</span>
            ) : (
              ''
            )}
          </label>
        </div>

        <div className={styles.input_wrapper}>
          <label htmlFor='amount'>
            Amount (USD &#36;): <br />
            <input
              type='text'
              name='amount'
              placeholder='enter amount'
              value={formData?.amount}
              onChange={handleAmountInputChange}
            />
            <br />
            {formDataError && formData?.amount?.length <= 0 ? (
              <span style={{ color: 'red' }}>* required</span>
            ) : (
              ''
            )}
          </label>
        </div>

        {/* <div className={styles.input_wrapper}>
          <label htmlFor='currency'>
            Currency: <br />
            <select
              name='currency'
              id=''
              value={formData?.currency}
              onChange={handleInputChange}
            >
              <option value=''>-Select type-</option>
              {currencies.map((item, index) => {
                return (
                  <option key={index} value={`${item?.code} ${item?.symbol}`}>
                    {`${item?.name} - ${item?.symbol}`}
                  </option>
                );
              })}
            </select>
            <br />
            {formDataError && formData?.currency?.length <= 0 ? (
              <span style={{ color: 'red' }}>* required</span>
            ) : (
              ''
            )}
          </label>
        </div> */}
        {/* <div className={styles.input_wrapper}>
          <label htmlFor='country'>
            Country: <br />
            <select
              name='country'
              id=''
              value={formData?.country}
              onChange={handleInputChange}
            >
              <option value=''>-Select type-</option>
              {countries.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
            <br />
            {formDataError && formData?.country?.length <= 0 ? (
              <span style={{ color: 'red' }}>* required</span>
            ) : (
              ''
            )}
          </label>
        </div> */}
        <div className={styles.input_wrapper}>
          <label htmlFor='routingNumber'>
            Routing Number: <br />
            <input
              type='text'
              name='routingNumber'
              placeholder='enter routing number'
              value={formData?.routingNumber}
              onChange={handleInputChange}
            />
            <br />
            {formDataError && formData?.routingNumber?.length <= 0 ? (
              <span style={{ color: 'red' }}>* required</span>
            ) : (
              ''
            )}
          </label>
        </div>
        {/* <div className={styles.input_wrapper}>
          <label htmlFor='swiftCode'>
            Swift Code: <br />
            <input
              type='text'
              name='swiftCode'
              placeholder='enter swift code'
              value={formData?.swiftCode}
              onChange={handleInputChange}
            />
            <br />
            {formDataError && formData?.swiftCode?.length <= 0 ? (
              <span style={{ color: 'red' }}>* required</span>
            ) : (
              ''
            )}
          </label>
        </div> */}
        <div className={styles.input_wrapper}>
          <label htmlFor='transactionPin'>
            Transaction Pin: <br />
            <input
              name='transactionPin'
              type='password'
              inputMode='numeric'
              maxLength={4}
              placeholder='enter transaction pin'
              value={formData?.transactionPin}
              onChange={handleInputChange}
            />
            <br />
            {formDataError && formData?.transactionPin?.length <= 0 ? (
              <span style={{ color: 'red' }}>* required</span>
            ) : (
              ''
            )}
          </label>
        </div>
        <div className={styles.input_wrapper}>
          <label htmlFor='description'>
            Description: <br />
            <input
              type='text'
              name='description'
              placeholder='enter description '
              value={formData?.description}
              onChange={handleInputChange}
            ></input>
            <br />
            {formDataError && formData?.description?.length <= 0 ? (
              <span style={{ color: 'red' }}>* required</span>
            ) : (
              ''
            )}
          </label>
        </div>
      </div>
      <br />
      <CallToAction
        loading={submitOrderIsPending}
        text='Submit'
        progressText='submitting...'
        action={handleSubmitWithConfirmation}
      />
      <ErrorModal setShowPopup={setShowPopup} showPopup={showPopup} />
      {openModal && <OverLayLoader />}
    </div>
  );
};

export default Wire;
