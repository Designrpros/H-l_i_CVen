import React, { useEffect } from 'react';
import { useContact } from '../../../context/ContactContext';
import { TextField, Button, Box } from '@mui/material';

const EditContact = () => {
  const { contactInfo, updateContactInfo } = useContact();
  // Initialize local state with the context state
  const [localContactInfo, setLocalContactInfo] = React.useState(contactInfo);

  // Update local state when contactInfo changes
  useEffect(() => {
    setLocalContactInfo(contactInfo);
  }, [contactInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalContactInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateContactInfo(localContactInfo);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      {/* Add a TextField for description */}
      <TextField
        margin="normal"
        fullWidth
        label="Description"
        name="description"
        value={localContactInfo.description}
        onChange={handleChange}
        multiline
        rows={4}
        />

      <TextField
        margin="normal"
        required
        fullWidth
        label="Email"
        name="email"
        value={localContactInfo.email}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Phone"
        name="phone"
        value={localContactInfo.phone}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        fullWidth
        label="Facebook URL"
        name="facebook"
        value={localContactInfo.facebook}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        fullWidth
        label="Instagram URL"
        name="instagram"
        value={localContactInfo.instagram}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        fullWidth
        label="Google Maps URL"
        name="mapUrl"
        value={localContactInfo.mapUrl}
        onChange={handleChange}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Save Changes
      </Button>
    </Box>
  );
};

export default EditContact;
