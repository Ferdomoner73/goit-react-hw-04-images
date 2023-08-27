import styled from "@emotion/styled";

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    // padding-bottom: 1rem;
`

export const ButtonLoadMore = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 7rem;
    padding: 0.5rem 0.75rem;

    border: none;
    border-radius: 0.25rem;
    background-color: darkblue;
    color: white;
    cursor: pointer;

    &:hover {
        background-color: blue;
    }
`   