import React from "react";
import styled from "styled-components";

export default styled.View`
    justify-content : center;
    align-items : center;
    flex : 1;
    background-color : ${props => props.theme.bgColor}
`