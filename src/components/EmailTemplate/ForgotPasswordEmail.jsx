import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import React from 'react';

const ForgotPasswordEmail = ({ verificationLink }) => {
  const baseUrl = 'https://www.aurexaedge.com';
  return (
    <Html>
      <Head />
      <Preview>aurexaedge Password Reset</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={coverSection}>
            <Section style={imageSection}>
              <Img
                src={`${baseUrl}/aurex_em_logo.png`}
                width='200'
                height='auto'
                alt='aurexaedge logo'
              />
            </Section>
            <Section style={upperSection}>
              <Heading style={h1}>Password Reset</Heading>
              <Text style={mainText}>
                We received a request to reset your password for your{' '}
                <Link
                  href='https://www.aurexaedge.com'
                  target='_blank'
                  style={link}
                >
                  aurexaedge
                </Link>{' '}
                account. To ensure the security of your account, we want to
                confirm that this request was made by you.
                <br /> <br />
                Kindly click on {'Verify Email'} below or open in a new tab to
                reset password <br /> <br />
              </Text>
              <Section style={verificationSection}>
                <Link
                  href={verificationLink}
                  target='_blank'
                  style={verify_button}
                >
                  Verify Email
                </Link>
              </Section>

              <Text style={mainText}>
                If you did not request a password reset, please ignore this
                message or contact our support team immediately
              </Text>
            </Section>
            <Hr />
            <Section style={lowerSection}>
              <Text style={cautionText}>50 awolowa road, Lagos Nigeria</Text>
            </Section>
          </Section>
          <Text style={footerText}>
            This message was produced and distributed by aurexaedge ,
            <Link
              href='https://www.aurexaedge.com'
              target='_blank'
              style={link}
            >
              www.aurexaedge.com
            </Link>
            , Inc. View our{' '}
            <Link
              href='https://www.aurexaedge.com/'
              target='_blank'
              style={link}
            >
              privacy policy
            </Link>
            .
          </Text>
        </Container>
      </Body>
    </Html>
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
  display: 'flex',
  padding: '20px 0',
  alignItems: 'center',
  justifyContent: 'center',
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

export default ForgotPasswordEmail;
