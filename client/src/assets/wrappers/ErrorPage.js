import styled from "styled-components";

const Wrapper = styled.main`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    display: block;
    margin-bottom: 2rem;
    max-width: 600px;
  }

  h3{
    margin-bottom: 0.5rem;
  }

  p{
    margin-bottom: 0.5rem;
    margin-top: 0;
    color: var(--grey-500);
  }

  a{
    text-decoration: underline;
    text-transform: capitalize;
    color: var(--primary-500);
  }
`

export default Wrapper