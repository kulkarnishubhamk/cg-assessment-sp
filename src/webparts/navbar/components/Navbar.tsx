import * as React from 'react';
import { INavbarStates } from './INavbarStates';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { INavbarProps } from './INavbarProps';
import './hide.css';
import './style.css';
// import './navbar.css';

export default class Navbar extends React.Component<INavbarProps, INavbarStates> {
  constructor(props: INavbarProps) {
    super(props);
    this.state = {};
  }

  public render(): React.ReactElement<INavbarProps> {
    return (
      <section>
        <nav className="fixed-top">
          <div className="navbar-container">
            {/* <!-- Left Section: Logo --> */}
            <div className="navbar-logo col-md-6">
              <img
                src={require('../assets/LOGO.png')}
                className="logo-img"
                alt="Logo"
              />
            </div>

            {/* <!-- Right Section: Icons (Search, Cart, Notification, Profile) --> */}
            <div className="navbar-right">
              <div className="navbar-icons-container col-md-12">
                {/* <!-- Search Bar with Icon inside --> */}
                <div className="input-group search-group">
                  <input
                    type="text"
                    className="form-control search-input"
                    aria-label="Search"
                  />
                </div>

                {/* <!-- Raise a Ticket Button --> */}
                <div style={{ borderRadius: "15px", marginRight: "20px", height: "30px", color: "#0070AD" }}>
                  <span style={{ backgroundColor: "#F1F6FD", color: "#0070AD", fontSize: "12px", padding: "8px", fontWeight: "bold", border: "1px solid #0070AD", height: "30px", borderRadius: "15px", cursor: "pointer" }}>
                    Raise a ticket →
                  </span>
                </div>

                {/* <!-- Cart Icon --> */}
                <div className="icon-container">
                  <img
                    src={this.props.siteUrl + '/SiteAssets/cart_normal.png'}
                    alt="Cart"
                    className="icon-img cart-icon"
                  />
                </div>

                {/* <!-- Notification Icon --> */}
                <div className="icon-container">
                  <img
                    src={this.props.siteUrl + '/SiteAssets/Noti_Normal.png'}
                    alt="Notification"
                    className="icon-img noti-icon"
                  />
                </div>

                {/* <!-- Profile Icon --> */}
                <div className="icon-container">
                  <img
                    src={this.props.siteUrl + '/SiteAssets/Profile.png'}
                    alt="Profile"
                    className="profile-img"
                  />
                </div>
              </div>

              {/* <!-- Navbar Links --> */}
              <div className="col-md-12">
                <div className="nav-links">
                  <div className="nav-link-item">
                    <a
                      className="nav-link active"
                      href={`${this.props.siteUrl}/SitePages/Home.aspx`}
                    >
                      Home
                    </a>
                  </div>
                  <div className="nav-link-item">
                    <a className="nav-link active">|</a>
                  </div>
                  <div className="nav-link-item">
                    <a className="nav-link" href="#">
                      Overview
                    </a>
                  </div>
                  <div className="nav-link-item">
                    <a className="nav-link active">|</a>
                  </div>
                  <div className="nav-link-item">
                    <a
                      className="nav-link"
                      href={`${this.props.siteUrl}/SitePages/Reports.aspx`}
                    >
                      Dashboard
                    </a>
                  </div>
                  <div className="nav-link-item">
                    <a className="nav-link active">|</a>
                  </div>
                  <div className="nav-link-item">
                    <a
                      className="nav-link"
                      href={`${this.props.siteUrl}/SitePages/Admin.aspx`}
                    >
                      Administration
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </section>
    );
  }
}
