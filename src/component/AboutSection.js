import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { AboutSectionContext } from '../context/AboutSectionContext';

const Heading = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 30px;
`;

const AboutWrapper = styled.section`
  padding: 50px 20px;
  background: #9dd2ac;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: auto;
`;

const StyledElement = styled.div`
  box-sizing: border-box; /* Ensure padding is included in the element's width */
  width: 100%;
  text-align: ${({ alignment }) => alignment || 'left'};
  ${({ type }) => typeStyles(type)}
  ${({ bold }) => bold && css`font-weight: bold;`}
  ${({ color }) => css`color: ${color};`}
  margin-bottom: 20px;
  padding: 0 ${({ padding }) => padding}px; /* Apply horizontal padding */
  max-width: 100%;
  overflow-wrap: break-word;
`;

// Helper function for type styles to clean up the StyledElement
const typeStyles = (type) => css`
  ${type === 'h1' && `font-size: 2rem; font-weight: bold;`}
  ${type === 'h2' && `font-size: 1.75rem; font-weight: bold;`}
  ${type === 'h3' && `font-size: 1.5rem; font-weight: bold;`}
  ${type === 'paragraph' && `font-size: 1rem;`}
  ${type === 'highlight' && `font-weight: bold; color: #333;`}
`;



const AboutSection = () => {
  const { aboutContent } = useContext(AboutSectionContext);

  if (!aboutContent || !Array.isArray(aboutContent.sections)) {
    return <div>Loading...</div>;
  }

  return (
    <AboutWrapper id="who-we-are">
      <Heading>{aboutContent.heading}</Heading>
      {aboutContent.sections.map((section, index) => (
        <StyledElement
          key={index}
          type={section.type}
          alignment={section.alignment}
          bold={section.bold}
          color={section.color}
          padding={section.padding}
        >
          {section.text}
        </StyledElement>
      ))}
    </AboutWrapper>
  );
};

export default AboutSection;
