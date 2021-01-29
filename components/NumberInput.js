import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.View`
  margin-bottom : 10;
`

const TextInput = styled.TextInput`
  width: 100;
  padding: 5px;
  background-color: ${props => props.theme.grayColor};
  border-radius: 4px;
  border : 1.3px solid rgba(0, 0, 0, 0.15);
`;

const TextInputSmall = styled.TextInput`
  width: 50;
  padding: 5px;
  background-color: ${props => props.theme.grayColor};
  border-radius: 4px;
  border : 1.3px solid rgba(0, 0, 0, 0.15);
`;

const NumberInput = ({
  placeholder,
  value,
  onChange,
  isSmall=false
}) => {
  if (isSmall){
    return (
      <Container>
        <TextInputSmall
          onChangeText={onChange}
          keyboardType="number-pad"
          placeholder={placeholder}
          value={value}
        />
      </Container>
    )
  } else {
    return (
      <Container>
        <TextInput
          onChangeText={onChange}
          keyboardType="number-pad"
          placeholder={placeholder}
          value={value}
        />
      </Container>
    )
  }   
};

NumberInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default NumberInput