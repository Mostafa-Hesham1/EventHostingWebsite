import React from 'react';
import {  Typography, Container, styled } from '@mui/material';

const StyledContainer = styled(Container)({
  padding: '2rem',
  color: 'white',
  backgroundColor: 'rgba(30, 30, 45, 0.85)', 
  borderRadius: '8px',
  boxShadow: '0 4px 20px rgba(255, 255, 255, 0.1)', 
  '& h1': {
    marginBottom: '20px',
    fontSize: '2rem',
  },
  '& p': {
    fontSize: '1.2rem',
    lineHeight: '1.6',
    marginBottom: '10px',
  },
  '& ul': {
    paddingLeft: '20px',
    listStyle: 'inside',
  },
  '& li': {
    fontSize: '1.2rem',
    lineHeight: '1.6',
  }
});

export const TermsofService = () => {
  return (
    <StyledContainer maxWidth="md">
      <Typography variant="h1" component="h1">
        Terms of Service
      </Typography>
      <Typography paragraph>
        Welcome to OurEventSite! We are thrilled to have you here, but before you get started,
        there are some legal terms you need to be aware of:
      </Typography>
      <Typography paragraph>
        By accessing our website and using our services, you agree to be bound by the following
        terms and conditions. If you do not agree with any part of these terms, please do not use our
        website.
      </Typography>
      <Typography variant="h6" component="h2">
        1. License to Use Website
      </Typography>
      <Typography paragraph>
        We grant you a personal, limited license to use our website. This license is non-exclusive,
        non-transferable, and subject to these terms.
      </Typography>
      <Typography variant="h6" component="h2">
        2. User Obligations
      </Typography>
      <Typography paragraph>
        You agree to use our website only for lawful purposes and in a way that does not infringe
        the rights of, restrict or inhibit anyone else's use and enjoyment of the website.
      </Typography>
      <Typography variant="h6" component="h2">
        3. Privacy Policy
      </Typography>
      <Typography paragraph>
        Our privacy policy, which sets out how we will use your information, can be found at
        [Privacy Policy link]. By using this website, you consent to the processing described
        therein and warrant that all data provided by you is accurate.
      </Typography>
      <Typography variant="h6" component="h2">
        4. Prohibitions
      </Typography>
      <Typography paragraph>
        You must not misuse the site. You will not: commit or encourage a criminal offense;
        transmit or distribute a virus, trojan, worm, logic bomb, or post any other material which
        is malicious, technologically harmful, in breach of confidence, or in any way offensive or
        obscene; hack into any aspect of the Service; corrupt data; cause annoyance to other users;
        infringe upon the rights of any other person's proprietary rights; send any unsolicited
        advertising or promotional material, commonly referred to as "spam"; or attempt to affect
        the performance or functionality of any computer facilities of or accessed through this
        Website.
      </Typography>
      <Typography variant="h6" component="h2">
        5. Changes to Terms
      </Typography>
      <Typography paragraph>
        We may revise these terms of service at any time by amending this page. You are expected to
        check this page from time to time to take notice of any changes we made, as they are binding
        on you.
      </Typography>
    </StyledContainer>
  );
};

export default TermsofService;
