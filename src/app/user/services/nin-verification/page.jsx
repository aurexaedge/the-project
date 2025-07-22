import React from 'react';
import VerifyViaNin from '../components/VerifyViaNin/VerifyViaNin';
import VerifyViaPhone from '../components/VerifyViaPhone/VerifyViaPhone';
import VNin from '../components/VNin/VNin';

export default async function page({ searchParams }) {
  const param = searchParams;

  if (param.type === 'nin') {
    return <VerifyViaNin />;
  } else if (param.type === 'number') {
    return <VerifyViaPhone />;
  } else {
    return <VNin />;
  }
}
