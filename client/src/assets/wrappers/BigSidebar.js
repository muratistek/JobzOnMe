import styled from 'styled-components'

const Wrapper = styled.aside`
  display: none;
  @media (min-width: 992px) {
    display: block;
    box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
    .sidebar-container {
      background: ${props => props.bgColor};
      min-height: 100vh;
      height: 100%;
      width: 250px;
      margin-left: -250px;
      transition: var(--transition);
      transition: background-color 1050ms ease-in-out;
    }
    .content {
      position: sticky;
      top: 0;
    }
    .show-sidebar {
      margin-left: 0;
    }
    header {
      height: 6rem;
      display: flex;
      align-items: center;
      padding-left: 2.5rem;
    }
    .nav-links {
      padding-top: 2rem;
      display: flex;
      flex-direction: column;
    }
    .nav-link {
      display: flex;
      align-items: center;
      color: ${props => props.textColor};
      padding: 1rem 0;
      padding-left: 2.5rem;
      text-transform: capitalize;
      transition: var(--transition);
    }
    .nav-link:hover {
      background: ${props => props.bgColorHover};
      padding-left: 3rem;
      color: ${props => props.textColorHover};
    }
    .nav-link:hover .icon {
      color: var(--primary2-500);
    }
    .themeButton {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: center;
      padding-top: 500px
    }
    .icon {
      font-size: 1.5rem;
      margin-right: 1rem;
      display: grid;
      place-items: center;
      transition: var(--transition);
    }
    .active {
      color: ${props => props.textColorActive};
    }
    .active .icon {
      color: var(--primary2-500);
    }
  }
`
export default Wrapper
