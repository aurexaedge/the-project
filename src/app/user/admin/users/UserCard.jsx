'use client';
import React, { useState } from 'react';
import styles from './Users.module.css';
import { GoArrowDownLeft } from 'react-icons/go';
import { GoArrowUpRight } from 'react-icons/go';
import { LiaEdit } from 'react-icons/lia';
import { HiDotsVertical } from 'react-icons/hi';
import { useRouter } from 'next/navigation';

import { CiUser } from 'react-icons/ci';

import OverLayLoader from '@/components/Loaders/OverLayLoader/OverLayLoader';
import useFetchData from '@/hooks/useFetchData';
import CircleLoader from '@/components/Loaders/CircleLoader/CircleLoader';
import formatDateTimeToLocal from '@/utils/formatDateToLocal';
import ErrorTemplate from '@/components/ErrorTemplate/ErrorTemplate';
import CreateUserModal from '../components/CreateUserModal/CreateUserModal';

const UserCard = () => {
  const { data, isError, isLoading, isPending, isFetching } = useFetchData({
    queryKey: ['fetchUsersForAdmin'],
    endpoint: '/api/v1/admin/users',
  });

  const router = useRouter();

  const [openModal, setOpenModal] = useState(false);
  const [openModalForCreateUser, setOpenModalForCreateUser] = useState(false);

  const handleOpenOrder = (userId) => {
    setOpenModal(true);
    router.push(`/user/admin/users/${userId}`);
  };
  const handleOpenOrderForCreateUser = () => {
    setOpenModalForCreateUser(true);
  };
  return (
    <div className={styles.transfer_container}>
      <h3>
        Users{' '}
        <button onClick={handleOpenOrderForCreateUser}>Create User</button>
      </h3>
      {isLoading === true && <CircleLoader />}
      {isError && <ErrorTemplate text='Users' />}

      {data?.map((item, index) => {
        return (
          <div
            key={index}
            onClick={() => handleOpenOrder(item?._id)}
            className={styles.transfer_card}
          >
            <div className={styles.left_side}>
              <span className={styles.icon_container}>
                <CiUser />
              </span>
              <div className={styles.left_side_inner}>
                <p>{item?.username}</p>
                <p>{item?.email}</p>
                <p>{formatDateTimeToLocal(item?.createdAt)}</p>
              </div>
            </div>
            <div className={styles.right_side}>
              <LiaEdit color='rgb(5, 5, 214)' />
            </div>
          </div>
        );
      })}

      {openModal && <OverLayLoader />}
      <CreateUserModal
        setOpenModalForCreateUser={setOpenModalForCreateUser}
        openModalForCreateUser={openModalForCreateUser}
      />
    </div>
  );
};

export default UserCard;
