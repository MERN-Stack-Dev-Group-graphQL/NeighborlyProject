import styled, { keyframes } from 'styled-components';

export const bounce1 = keyframes`
    25% {
        transform: translateY(-5px);
    } 
`

export const bounce2 = keyframes`
    50% {
        transform: translateY(-5px);
    } 
`

export const bounce3 = keyframes`
    75% {
        transform: translateY(-5px);
    } 
`

export const One = styled.span`
    display: inline-block;
    animation: ${bounce1} 1s linear infinite;
`

export const Two = styled.span`
    display: inline-block;
    animation: ${bounce2} 1s linear infinite;
`

export const Three = styled.span`
    display: inline-block;
    animation: ${bounce3} 1s linear infinite;
`;