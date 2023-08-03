"use client"

import React, { ReactNode } from 'react';
import styled from 'styled-components'

const StyledMain = styled.div`
width:100%;
background-color: white;
padding:5rem 1rem 0rem 1rem;
color:black;
`
const Main: React.FC<{ children: ReactNode }> = ({ children }) => {

    return (
        <StyledMain>
            {children}
        </StyledMain>)
}

export default Main;