import React, { useState, useEffect } from 'react';
import { useAboutSection } from '../../../context/AboutSectionContext';
import {
  TextField,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Switch,
  Box,
  Typography,
  Slider,
  Container, // Import Container for consistent max-width and centering
} from '@mui/material';
import { SketchPicker } from 'react-color';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ColorLensIcon from '@mui/icons-material/ColorLens';

const elementTypes = [
  { value: 'h1', label: 'Heading 1' },
  { value: 'h2', label: 'Heading 2' },
  { value: 'h3', label: 'Heading 3' },
  { value: 'paragraph', label: 'Paragraph' },
  { value: 'highlight', label: 'Highlight' },
];

const EditAboutSection = () => {
  const { aboutContent, saveAboutContent } = useAboutSection();
  const [localContent, setLocalContent] = useState(aboutContent);
  const [showColorPicker, setShowColorPicker] = useState(false);

  useEffect(() => {
    setLocalContent(aboutContent);
  }, [aboutContent]);

  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...localContent.sections];
    updatedSections[index][field] = value;
    setLocalContent({ ...localContent, sections: updatedSections });
  };

  const toggleColorPicker = (index) => {
    setShowColorPicker({ ...showColorPicker, [index]: !showColorPicker[index] });
  };

  const handleColorChange = (index, color) => {
    handleSectionChange(index, 'color', color.hex);
  };

  const addSection = () => {
    setLocalContent({
      ...localContent,
      sections: [...localContent.sections, { type: 'paragraph', text: '', alignment: 'left', bold: false, color: '#000', padding: 10 }],
    });
  };

  const removeSection = (index) => {
    const filteredSections = localContent.sections.filter((_, i) => i !== index);
    setLocalContent({ ...localContent, sections: filteredSections });
  };

  const handleSave = () => {
    saveAboutContent(localContent);
  };

  return (
    <Container maxWidth="md"> {/* Use Container for consistent max-width and centering */}
      <TextField
        label="Heading"
        name="heading"
        value={localContent.heading}
        onChange={(e) => setLocalContent({ ...localContent, heading: e.target.value })}
        fullWidth
        margin="normal"
      />
      {localContent.sections.map((section, index) => (
        <Box key={index} mb={2} p={2} border={1} borderColor="#ccc">
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box flex={1} mr={2} display="flex" alignItems="center">
              <FormControl margin="normal" sx={{ minWidth: 120, mr: 2 }}>
                <InputLabel>Type</InputLabel>
                <Select
                  value={section.type}
                  onChange={(e) => handleSectionChange(index, 'type', e.target.value)}
                  label="Type"
                >
                  {elementTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl margin="normal" sx={{ minWidth: 120, mr: 2 }}>
                <InputLabel>Alignment</InputLabel>
                <Select
                  value={section.alignment}
                  onChange={(e) => handleSectionChange(index, 'alignment', e.target.value)}
                  label="Alignment"
                >
                  <MenuItem value="left">Left</MenuItem>
                  <MenuItem value="center">Center</MenuItem>
                  <MenuItem value="right">Right</MenuItem>
                </Select>
              </FormControl>
              <IconButton onClick={() => toggleColorPicker(index)} sx={{ ml: 1 }}>
                <ColorLensIcon />
              </IconButton>
              {showColorPicker[index] && (
                <SketchPicker color={section.color} onChangeComplete={(color) => handleColorChange(index, color)} />
              )}
              <FormGroup sx={{ ml: 1 }}>
                <FormControlLabel
                  control={<Switch checked={section.bold} onChange={(e) => handleSectionChange(index, 'bold', e.target.checked)} />}
                  label="Bold"
                />
              </FormGroup>
              <Box sx={{ ml: 2, width: 100 }}>
                <Typography gutterBottom>Padding</Typography>
                <Slider
                  value={section.padding}
                  onChange={(e, newValue) => handleSectionChange(index, 'padding', newValue)}
                  aria-labelledby="padding-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={100}
                />
              </Box>
            </Box>
            <IconButton onClick={() => removeSection(index)} color="error">
              <RemoveCircleOutlineIcon />
            </IconButton>
          </Box>
          <TextField
            label="Text"
            name="text"
            value={section.text}
            onChange={(e) => handleSectionChange(index, 'text', e.target.value)}
            multiline
            rows={4}
            fullWidth
            margin="normal"
          />
        </Box>
      ))}
      <Button onClick={addSection} startIcon={<AddCircleOutlineIcon />} variant="contained" color="primary">
        Add Section
      </Button>
      <Button onClick={handleSave} variant="contained" color="secondary" style={{ marginLeft: '10px' }}>
        Save
      </Button>
    </Container>
  );
};

export default EditAboutSection;
