import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import withContext from 'hoc/withContext';
import styled from 'styled-components';
import logoIcon from 'assets/logo.svg';
import IconButton from 'components/atoms/IconButton';

const StyledLogoLink = styled(NavLink)`
  display: block;
  width: 67px;
  height: 67px;
  background-image: url(${logoIcon});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 80%;
  border: none;
  margin-bottom: 10vh;
`;

const MainNavBar = ({ pageContext }) => (
    <nav id="MainNavBar">
        <StyledLogoLink id="logoLink" to="/" />
        <ol className="menuList">
            <li className="item">
                <IconButton as={NavLink} to="/news" iconName="FaNewspaper">News</IconButton>
            </li>
            <li className="item">
                <IconButton as={NavLink} to="/twitters" iconName="FaTwitter">Twitter</IconButton>
            </li>
            <li className="item">
                <IconButton as={NavLink} to="/articles" iconName="GrArticle">Articles</IconButton>
            </li>
        </ol>
    </nav>
);

export default MainNavBar;
