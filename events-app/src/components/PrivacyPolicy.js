import React from 'react';
import { Box, Typography, Container, styled } from '@mui/material';

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

export const PrivacyPolicy = () => {
  return (
    <StyledContainer maxWidth="md">
      <Typography variant="h1" component="h1">
        Privacy Policy
      </Typography>
      <Typography paragraph>
        Your privacy is important to us. It is OurEventSite's policy to respect your privacy regarding
        any information we may collect from you across our website.
      </Typography>
      <Typography paragraph>
        We only ask for personal information when we truly need it to provide a service to you. We
        collect it by fair and lawful means, with your knowledge and consent. We also let you know
        why we’re collecting it and how it will be used.
      </Typography>
      <Typography paragraph>
        We only retain collected information for as long as necessary to provide you with your
        requested service. What data we store, we’ll protect within commercially acceptable means to
        prevent loss and theft, as well as unauthorized access, disclosure, copying, use, or
        modification.
      </Typography>
      <Typography paragraph>
        We don’t share any personally identifying information publicly or with third-parties, except
        when required to by law.
      </Typography>
      <Typography paragraph>
        Our website may link to external sites that are not operated by us. Please be aware that we
        have no control over the content and practices of these sites, and cannot accept
        responsibility or liability for their respective privacy policies.
      </Typography>
      <Typography paragraph>
        You are free to refuse our request for your personal information, with the understanding
        that we may be unable to provide you with some of your desired services.
      </Typography>
      <Typography paragraph>
        Your continued use of our website will be regarded as acceptance of our practices around
        privacy and personal information. If you have any questions about how we handle user data
        and personal information, feel free to contact us.
      </Typography>
      <Typography variant="h6" component="h2">
        This policy is effective as of 1 January 2021.
      </Typography>
    </StyledContainer>
  );
};

export default PrivacyPolicy;
