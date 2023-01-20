import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import SearchBox from './SearchBox';
import { logout } from '../actions/userActions';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

const Header = () => {
 const navigate = useNavigate();
 const dispatch = useDispatch();

 const userLogin = useSelector((state) => state.userLogin);
 const { userInfo } = userLogin;

 const logoutHandler = () => {
  dispatch(logout());
 };

 return (
  <header>
   <Navbar bg='info' variant='dark' expand='lg' collapseOnSelect>
    <Container>
     <LinkContainer to='/'>
      <Navbar.Brand>MarketPlace</Navbar.Brand>
     </LinkContainer>
     <Navbar.Toggle aria-controls='basic-navbar-nav' />
     <Navbar.Collapse id='basic-navbar-nav'>
      <SearchBox navigate={navigate} />
      <Nav className='ms-auto'>
       <LinkContainer to='/cart'>
        <Nav.Link>
         <FaShoppingCart size={25} /> <span>CART</span>
        </Nav.Link>
       </LinkContainer>

       {userInfo ? (
        <NavDropdown title={userInfo.name} id='username'>
         <LinkContainer to='/profile'>
          <NavDropdown.Item>Profile</NavDropdown.Item>
         </LinkContainer>
         <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
        </NavDropdown>
       ) : (
        <LinkContainer to='/login'>
         <Nav.Link>
          <FaUser size={25} /> <span>SIGN IN</span>
         </Nav.Link>
        </LinkContainer>
       )}
       {userInfo && userInfo.isAdmin && (
        <NavDropdown title='Admin' id='adminmenu'>
         <LinkContainer to='/admin/userlist'>
          <NavDropdown.Item>Users</NavDropdown.Item>
         </LinkContainer>
         <LinkContainer to='/admin/productlist'>
          <NavDropdown.Item>Products</NavDropdown.Item>
         </LinkContainer>
         <LinkContainer to='/admin/orderlist'>
          <NavDropdown.Item>Orders</NavDropdown.Item>
         </LinkContainer>
        </NavDropdown>
       )}
      </Nav>
     </Navbar.Collapse>
    </Container>
   </Navbar>
  </header>
 );
};

export default Header;
