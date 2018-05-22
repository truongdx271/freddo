import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          {/* #changehome */}
          {/* <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link> */}
        </li>
        <li className="nav-item">
          <a
            href=""
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: '25px', marginRight: '5px' }}
              title="You must have a Gravatar connected to your email to display an image"
            />Logout
          </a>
        </li>
      </ul>
    );

    const authLinksAdmin = (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/home">
            {' '}
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/users">
            {' '}
            Users
          </Link>
        </li>
        {/* <li className="nav-item">
          <Link className="nav-link" to="/role">
            {' '}
            Role
          </Link>
        </li> */}
        <li className="nav-item">
          <Link className="nav-link" to="/table">
            {' '}
            Table
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/group">
            {' '}
            Group
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/menu">
            {' '}
            Menu
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/import-menu">
            {' '}
            Import-Menu
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/order">
            {' '}
            Order
          </Link>
        </li>
      </ul>
    );

    const authLinksStaff = (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/home">
            {' '}
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/menu">
            {' '}
            Menu
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/import-menu">
            {' '}
            Import-Menu
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/order">
            {' '}
            Order
          </Link>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <div>
        <nav
          style={{ backgroundColor: '#050505' }}
          className="navbar navbar-expand-sm navbar-dark mb-4"
        >
          <div className="container">
            <Link className="navbar-brand" to="/">
              Freddo Coffee Management
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#mobile-nav"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="mobile-nav">
              {isAuthenticated && user.role === 'staff'
                ? authLinksStaff
                : isAuthenticated && user.role === 'admin'
                  ? authLinksAdmin
                  : null}
              {isAuthenticated ? authLinks : guestLinks}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  Navbar
);
