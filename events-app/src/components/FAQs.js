import React, { useState } from 'react';
import { Box, Card, CardContent, CardActions, Typography, Collapse, IconButton, Container, Grid, createTheme, ThemeProvider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  color: 'white', 
}));

const FAQCard = ({ faq }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ marginBottom: 2, backgroundColor: 'rgba(30, 30, 45, 0.85)', '&:hover': { boxShadow: '0 8px 30px rgba(255, 255, 255, 0.5)' } }}>
      <CardContent>
        <Typography variant="h6" color="primary">
          {faq.question}
        </Typography>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography paragraph>{faq.answer}</Typography>
        </Collapse>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
    </Card>
  );
};

const FAQs = () => {
  const faqs = [
    {
      question: "How do I create an event?",
      answer: "To create an event, you must first select a plan that suits your needs from our Pricing page. Once you've purchased a plan, you'll gain access to your dashboard where you can manage and create events."
    },
    {
      question: "What features are available in the dashboard?",
      answer: "The features in your dashboard depend on the plan you've chosen. Basic plans typically offer essential event creation tools, while premium plans provide advanced features like detailed analytics and promotional tools."
    },
    {
      question: "What payment methods are currently supported?",
      answer: "We currently support credit card payments for purchasing plans and tickets. More payment options will be available soon."
    },
    {
      question: "Can I get a refund for a plan purchase?",
      answer: "Refund policies are specific to the type of plan purchased. Please refer to our Terms of Service or contact our support team for more detailed information."
    },
  ];

  const theme = createTheme({
    palette: {
      primary: {
        main: '#3399ff',
      },
      background: {
        default: 'rgb(16, 20, 25)',
      },
      text: {
        primary: 'rgb(51,153,255)',
        secondary: 'white',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom align="center" color="primary" sx={{ marginTop: 4 }}>
          Frequently Asked Questions
        </Typography>
        <Grid container spacing={2}>
          {faqs.map((faq, index) => (
            <Grid item xs={12} key={index}>
              <FAQCard faq={faq} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default FAQs;
