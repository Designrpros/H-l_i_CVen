import React, { useState, useEffect } from 'react';
import { useDescriptionBox } from '../../../context/DescriptionBoxContext';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../../../firebaseConfig'; // Adjust the path as necessary
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
} from '@mui/material';
import { SketchPicker } from 'react-color';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ColorLensIcon from '@mui/icons-material/ColorLens';

const elementTypes = [
  { value: 'paragraph', label: 'Paragraph' },
  { value: 'h1', label: 'Heading 1' },
  { value: 'h2', label: 'Heading 2' },
  { value: 'h3', label: 'Heading 3' },
  // Add more types as needed
];

const EditDescriptionBox = () => {
  const { descriptionContent, updateDescriptionContent } = useDescriptionBox();
  const [localContent, setLocalContent] = useState(descriptionContent);
  const [showColorPicker, setShowColorPicker] = useState({});

  const handleElementChange = (index, field, value) => {
    const updatedElements = [...localContent.elements];
    updatedElements[index][field] = value;
    setLocalContent({ ...localContent, elements: updatedElements });
  };

  const toggleColorPicker = (index) => {
    setShowColorPicker({ ...showColorPicker, [index]: !showColorPicker[index] });
  };

  const handleColorChange = (index, color) => {
    handleElementChange(index, 'color', color.hex);
  };

  const addElement = () => {
    setLocalContent({
      ...localContent,
      elements: [...localContent.elements, { type: 'paragraph', text: '', alignment: 'left', bold: false, color: '#000', padding: 10 }],
    });
  };

  const removeElement = (index) => {
    const filteredElements = localContent.elements.filter((_, i) => i !== index);
    setLocalContent({ ...localContent, elements: filteredElements });
  };

  const handleSave = async () => {
    const docRef = doc(db, "descriptionBox", "yourActualDocId"); // Replace "yourActualDocId" with your document ID
    try {
      await setDoc(docRef, localContent, { merge: true }); // Using merge: true to update the document without overwriting other fields
      console.log("Document successfully updated");
      updateDescriptionContent(localContent); // Update global state
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

   // Update local state when descriptionContent changes
   useEffect(() => {
    setLocalContent(descriptionContent);
  }, [descriptionContent]);
    

  return (
    <Box>
      {localContent.elements.map((element, index) => (
        <Box key={index} mb={2} p={2} border={1} borderColor="#ccc">
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box flex={1} mr={2} display="flex" alignItems="center">
              <FormControl margin="normal" sx={{ minWidth: 120, mr: 2 }}>
                <InputLabel>Type</InputLabel>
                <Select
                  value={element.type}
                  onChange={(e) => handleElementChange(index, 'type', e.target.value)}
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
                  value={element.alignment}
                  onChange={(e) => handleElementChange(index, 'alignment', e.target.value)}
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
                <SketchPicker color={element.color} onChangeComplete={(color) => handleColorChange(index, color)} />
              )}
              <FormGroup sx={{ ml: 1 }}>
                <FormControlLabel
                  control={<Switch checked={element.bold} onChange={(e) => handleElementChange(index, 'bold', e.target.checked)} />}
                  label="Bold"
                />
              </FormGroup>
              <Box sx={{ ml: 2, width: 100 }}>
                <Typography gutterbottom>Padding</Typography>
                <Slider
                  value={element.padding}
                  onChange={(e, newValue) => handleElementChange(index, 'padding', newValue)}
                  aria-labelledby="padding-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={100}
                />
              </Box>
            </Box>
            <IconButton onClick={() => removeElement(index)} color="error">
              <RemoveCircleOutlineIcon />
            </IconButton>
          </Box>
          <TextField
            label={elementTypes.find(type => type.value === element.type)?.label || "Text"}
            name="text"
            value={element.text}
            onChange={(e) => handleElementChange(index, 'text', e.target.value)}
            multiline
            rows={4}
            fullWidth
            margin="normal"
          />
        </Box>
      ))}
      <Button onClick={addElement} startIcon={<AddCircleOutlineIcon />} variant="contained" color="primary">
        Add Element
      </Button>
      <Button onClick={handleSave} variant="contained" color="secondary" style={{ marginLeft: '10px' }}>
        Save
      </Button>
    </Box>
  );
};

export default EditDescriptionBox;
