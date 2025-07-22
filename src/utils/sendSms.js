// export const sendSms = async (req, res) => {
//   const client = twilio(accountSid, authToken);

//   try {
//     const message = await client.messages.create({
//       body: 'testing this SMS from my app',
//       from: '+12563611556',
//       to: '+2349064484416',
//     });

//     return res
//       .status(200)
//       .json({ message: `sms sent successfully ${message.sid}` });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({ message: error.message });
//   }
// };
