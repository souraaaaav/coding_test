import React from 'react';
import './Header.css';
// import { NavLink, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
const Header = () => {

    const handleScroll = () => {
        const headerMenu = document.getElementById("header");

        const position = window.pageYOffset;
        console.log(position);
        if (position >= 85) {
            headerMenu.classList.add("on-scroll");

        } else {
            headerMenu.classList.remove("on-scroll");
        }
    };

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleHeader = () => {
        const navbarMenu = document.getElementById("menu");
        const burgerMenu = document.getElementById("burger");
        burgerMenu.classList.toggle("is-active");
        navbarMenu.classList.toggle("is-active");
    };
    // window.addEventListener("scroll", () => {
    //     console.log('test');
    //     if (this.scrollY >= 85) {
    //         headerMenu.classList.add("on-scroll");
    //     } else {
    //         headerMenu.classList.remove("on-scroll");
    //     }
    // });

    return (
        <header class="header" id="header">
            <nav class="navbar">
                <a href="/" class="brand">Brand</a>
                <div class="burger" id="burger" onClick={toggleHeader}>
                    <span class="burger-line"></span>
                    <span class="burger-line"></span>
                    <span class="burger-line"></span>
                </div>
                <div class="menu" id="menu">
                    <ul class="menu-inner">

                        <li class="menu-item menu-block">
                            <NavLink className={'menu-link'} activeClassName="activeLink" to='/'>Home </NavLink>  </li>
                        <li class="menu-item menu-block">
                            <NavLink className={'menu-link'} activeClassName="activeLink" to='/form-list'>Form List </NavLink>  </li>

                    </ul>
                </div>
                {/* <a href="/" class="menu-block">Discover</a> */}
            </nav >
        </header >
    );
};

export default Header;