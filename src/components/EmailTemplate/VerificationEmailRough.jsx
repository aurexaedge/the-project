import {
  Container,
  Heading,
  Hr,
  Img,
  Link,
  Section,
  Text,
} from '@react-email/components';
import React from 'react';

const VerificationEmail = ({
  verificationLink = '11289',
  type = 'register',
}) => {
  const baseUrl = 'https://www.aurexaedge.com';
  return (
    <section style={main}>
      <Container style={container}>
        <Section style={coverSection}>
          <Section style={imageSection}>
            <Img
              src={`${baseUrl}/aurex_em_logo.png`}
              width='200'
              height='auto'
              alt='aurexa logo'
            />
          </Section>
          <Section style={upperSection}>
            {/* <Heading style={h1}>aurexaedge</Heading> */}
            <Heading style={h1}>Verify your email address</Heading>
            <Text style={mainText}>
              Thanks for starting the{' '}
              <Link
                href='https://www.aurexaedge.com'
                target='_blank'
                style={link}
              >
                aurexaedge
              </Link>{' '}
              account creation process. We want to make sure it is really you.{' '}
              <br /> <br />
              Kindly use OTP Below to complete your registration <br /> <br />
            </Text>
            <Section style={verificationSection}>
              <Heading style={h1}> {verificationLink}</Heading>
            </Section>
          </Section>
          <Hr />
        </Section>
      </Container>
    </section>
  );
};

const main = {
  backgroundColor: '#fff',
  color: '#212121',
};

const container = {
  padding: '20px',
  margin: '0 auto',
  backgroundColor: '#eee',
};

const h1 = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '15px',
};

const link = {
  color: '#2754C5',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  textDecoration: 'underline',
};

const text = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  margin: '24px 0',
};

const imageSection = {
  // backgroundColor: '#1655F2',
  // display: 'flex',
  padding: '20px 0',
  // alignItems: 'center',
  // justifyContent: 'center',
  paddingLeft: '30%',
};

const coverSection = { backgroundColor: '#fff' };

const upperSection = { padding: '25px 35px' };

const lowerSection = { padding: '25px 35px' };

const footerText = {
  ...text,
  fontSize: '12px',
  padding: '0 20px',
};

const verify_button = {
  backgroundColor: '#2282f0',
  color: ' #fff',
  padding: '5px 10px',
  margin: '30px 0',
};

const verificationSection = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const mainText = { ...text, marginBottom: '14px' };

const cautionText = { ...text, margin: '0px', fontSize: '12px' };

export default VerificationEmail;
