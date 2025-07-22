'use server';
import userWalletModel from '@/models/userWallet';
import servicePriceModel from '@/models/servicePrice';
import db from '@/utils/db';

const findService = async (service, type) => {
  await db.connect();

  const serviceType = await servicePriceModel.find({});
  const serviceMapping = {
    ninModificationService: serviceType[0].ninModificationService,
    ninValidation: serviceType[0].ninValidation,
    ninClearance: serviceType[0].ninClearance,
    trackIdPersonalisation: serviceType[0].trackIdPersonalisation,
    ninVerification: serviceType[0].ninVerification,
    ninPrinting: serviceType[0].ninPrinting,
    newEnrollment: serviceType[0].newEnrollment,
    // Add more services here as needed
  };

  const serviceDetails = serviceMapping[service]?.filter(
    (item) => item.type === type
  );

  if (!serviceDetails || serviceDetails.length === 0) {
    return null;
  }

  return serviceDetails[0];
};

const chargeUser = async (session, servicePrice) => {
  await db.connect();

  const wallet = await userWalletModel.findOne({ userId: session.user._id });
  const walletBalance = Number(wallet.accountBalance);

  if (walletBalance < servicePrice) {
    return { success: false, message: 'your wallet balance is low' };
  }

  const charge = walletBalance - servicePrice;
  wallet.accountBalance = charge;
  await wallet.save();

  return { success: true, charge, servicePrice };
};

export { findService, chargeUser };
