import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
interface pageType {
    location?: string;

}

function Header(props: pageType) {
    const navigate = useNavigate();
    function logout() {

        localStorage.clear();
        navigate('/login');
    }

    return (
        <Navbar className="w-100" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container className="p-0 m-0 mw-100">
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto" activeKey={props.location}>
                        <Nav.Link href="/table" >Log</Nav.Link>
                        <Nav.Link href="/register" >Register</Nav.Link>
                        <Nav.Link href="/clients">Clients</Nav.Link>
                        <Nav.Link href="/dollar">Dollar</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link onClick={(e) => logout()}>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;