import styled from "@emotion/styled";
import { FcSearch } from 'react-icons/fc';
import { Field } from 'formik';

export const SearchContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 1rem 0;

    background-color: darkblue;
`

export const SearchLabel = styled.label`
    display: flex;
    height: 2rem;
    width: 20rem;
    
    background-color: white;
    border-radius: 0.365rem;
    outline-color: black;
`

export const SearchButton = styled.button`
    display: flex;
    align-items: center;

    height: 100%;
    width: 2rem;

    background-color: transparent;
    border: none;

    cursor: pointer;
`

export const SearchInput = styled(Field)`
    background-color: transparent; 
    border: none;
    outline: none;

    width: 100%;
` 

export const SearchIcon = styled(FcSearch)`
    margin: 0 auto;
`

