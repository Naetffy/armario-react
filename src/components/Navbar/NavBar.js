import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import './NavBar.css';
import apiClient from '../../services/apiClient';
import '../../i18n';
import { useTranslation } from 'react-i18next';

import Swal from 'sweetalert2'; 

// This component is used to show the navigation bar.
const NavBar = () => {

    const [selectedLink, setSelectedLink] = useState('');
    const location = useLocation();
    const isInitialMount = useRef(true);
    const { t} = useTranslation();

    const [username, setUsername] = useState('');
    const [profileImage, setProfileImage] = useState(null); // Modified to handle image loading

    const handleLogout =  useCallback ( async () => {
        try {
            await apiClient.post('login/logout')
                .then((response) => {
                    sessionStorage.setItem("login", "false");
                    console.log(response);
                    // Elimina la cookie de authToken
                    document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                    // Redirige a la página de inicio de sesión u otra página después de cerrar sesión
                });
        } catch (error) {
            sessionStorage.setItem("login", "false");
            console.error('Error al cerrar sesión:', error);
        }
        window.location.href = '/login';
    },[]);

    // Change the selected link based on the current URL
    useEffect(() => {
        if ( sessionStorage.getItem("login") !== null && sessionStorage.getItem("login") === "true"){
            const fetchProfileData = async () => {
                try {
                    const response = await apiClient.get(`user/profile`);
                    setUsername(response.data.username);
                    setProfileImage(response.data.profileImage);
                } catch (error) {
                    if (error.response && error.response.status === 400) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Your session has expired. Please log in again.',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'OK'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                handleLogout();
                            }
                        });
                    }
                    console.error('Error fetching profile data:', error);
                }
            };
            fetchProfileData();
        }
        else{
            handleLogout();
        }
        if (isInitialMount.current) {
            isInitialMount.current = false;
            const pathname = location.pathname;
            if (pathname === '/') {
                setSelectedLink('Home');
            } else if (pathname.startsWith('/Wardrobe')) {
                setSelectedLink('Wardrobe');
            } else if (pathname.startsWith('/Calendar')) {
                setSelectedLink('Calendar');
            } else if (pathname.startsWith('/Community')) {
                setSelectedLink('Community');
            } else if (pathname.startsWith('/Profile')) {
                setSelectedLink('Profile');
            }
        }
    }, [location.pathname,handleLogout]);


    return (
        <Navbar expand="md" className="my-navbar">
            <Container className="mt-1">
                <Navbar.Brand href="/">
                    <div className="navbar-brand">
                        <img src="./images/logo.png" alt="" width="55" height="55" className="d-inline-block align-text-center" />
                        ClothCraft
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="display">
                    <Nav className="ms-auto">
                        <Nav.Link className={selectedLink === 'Home' ? 'selected' : ''} href="/">{t('Home')}</Nav.Link>
                        <Nav.Link className={selectedLink === 'Wardrobe' ? 'selected' : ''} href="/Wardrobe">{t('Wardrobe')}</Nav.Link>
                        <Nav.Link className={selectedLink === 'Calendar' ? 'selected' : ''} href="/Calendar">{t('Calendar')}</Nav.Link>
                        <Nav.Link className={selectedLink === 'Community' ? 'selected' : ''} href="/Community">{t('Community')}</Nav.Link>
                        {sessionStorage.getItem("login") === "true" ? (
                            <NavDropdown title={t('Hello, {{username}}', { username })} id="basic-nav-dropdown">
                                <NavDropdown.Item href="/Profile">{t('Profile')}</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleLogout}>{t('Sign out')}</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <Nav.Link className={selectedLink === 'Login' ? 'selected' : ''} href="/Login">{t('Profile')}</Nav.Link>
                        )}
                    </Nav>
                    {profileImage && (
                        <img src={`data:image/jpeg;base64,${profileImage}`} alt="Profile" className="profile-image1" />
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
