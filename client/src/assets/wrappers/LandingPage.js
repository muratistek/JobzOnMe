import styled from 'styled-components'

const Wrapper = styled.main`
  .logo{
    width: 164px;
    height: 50px;
  }

  nav{
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .page{
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }

  h1{
    font-weight: 700;
    span{
      color: var(--primary2-500);
    }
  }

  p{
    color: var(--grey-600);
  }

  

  .main-img{
    display: none;
    margin-left: 80px;
  }

  @media (min-width: 992px) {
    .page{
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img{
      display: block;
    }
  }
`

export default Wrapper