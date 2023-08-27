import styled from "@emotion/styled";

export const GalleryItemContainer = styled.li`
    width: calc(((100% - 1rem * 3)/4));
    height: 10vh;

    @media (min-width: 768px) {
        height: 15vh;
    }
    @media (min-width: 1440px) {
        height: 25vh;
    }
`

export const Button = styled.button`
    display: block;
    height: 100%;
    width: 100%;

    border-radius: 1rem;

    border: none;
    cursor: pointer;
`

export const GalleryItemImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;

    border-radius: 1rem;
`