// src/components/admin/WebsiteBuilder.js
import React from 'react';
import EditHeroSection from './EditHeroSection';
import EditAboutSection from './EditAboutSection';
import EditDescriptionBox from './EditDescriptionBox';
import EditGallery from './EditGallery';
import EditContact from './EditContact';

import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const sections = [
  { id: 'hero', title: 'Hero Section', component: EditHeroSection },
  { id: 'about', title: 'About Section', component: EditAboutSection },
  { id: 'coffee', title: 'Coffee Description', component: EditDescriptionBox },
  { id: 'gallery', title: 'Gallery', component: EditGallery },
  { id: 'contact', title: 'Contact', component: EditContact },

  // Add more sections here
];

const WebsiteBuilder = () => {
  return (
    <Grid container spacing={2} direction="column" style={{ padding: '20px' }}>
      <Grid item>
        <h1 variant="h4" gutterbottom>Website Builder</h1>
      </Grid>
      {sections.map(({ id, title, component: Component }) => (
        <Grid item key={id}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Component />
            </AccordionDetails>
          </Accordion>
        </Grid>
      ))}
    </Grid>
  );
};


export default WebsiteBuilder;
