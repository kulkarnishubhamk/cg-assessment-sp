/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import type { IHomeProps } from './IHomeProps';
import { IHomeStates } from './IHomeStates';
import "../../navbar/components/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Web } from "@pnp/sp/presets/all";

// Main Home Component
export default class Home extends React.Component<IHomeProps, IHomeStates> {
  // Initialize state and props in the constructor
  constructor(props: IHomeProps, states: IHomeStates) {
    super(props);
    this.state = {
      newsItems: [] // Holds the fetched news items
    };
  }

  // Lifecycle method to fetch news cards after the component mounts
  async componentDidMount(): Promise<void> {
    await this.getNewsCards();
  }

  // Function to fetch news items from the 'newsFeed' SharePoint list
  private getNewsCards = async () => {
    const siteURL = this.props.siteUrl;
    const web = Web(siteURL);

    try {
      const newsItemsData = await web.lists.getByTitle('newsFeed').items.getAll();
      console.log(newsItemsData);
      this.setState({
        newsItems: newsItemsData // Update the state with fetched data
      });
    } catch (error) {
      console.error('Error fetching news items:', error);
    }
  };

  // Render method to display the UI
  public render(): React.ReactElement<IHomeProps> {
    return (
      <>
        {/* Hero Section with a background image */}
        <section>
          <div className="d-flex align-items-center" style={{
            background: `url('${this.props.siteUrl}/SiteAssets/BANNER IMAGE.png') no-repeat`,
            backgroundSize: 'cover',
          }}>
            <div className="container">
              <div className="row align-items-center h-100">
                <div className="col-md-4 bg-white bg-opacity-75 p-4" style={{ margin: "50px", height: "80%" }}>
                  <span className="badge fw-normal text-white mb-3"
                    style={{
                      backgroundColor: '#0070AD',
                      fontSize: '12px',
                      padding: '8px',
                    }}>
                    100% Satisfaction Guarantee
                  </span>
                  <h2 className="fw-bold mb-3" style={{ color: '#214554' }}>
                    Start Your Learning Journey Today
                  </h2>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                      width: '12px',
                      backgroundColor: '#00D4CF',
                      marginRight: '16px',
                      height: '100px',
                      borderRadius: '6px',
                    }} />
                    <p className="text-muted mb-0" style={{ lineHeight: '1.6' }}>
                      Grow with our comprehensive online learning platform. Whether you are
                      looking to advance your career or explore new interests, we’ve got
                      you covered!
                    </p>
                  </div>
                </div>
                <div className="col-md-6" />
              </div>
            </div>
          </div>
        </section>

        {/* Section introducing the platform */}
        <div className="container mt-5">
          <div className="row align-items-center">
            <div className="col-md-6 text-center" style={{ height: "505px" }}>
              <img src={this.props.siteUrl + "/SiteAssets/Group 16128.png"} alt="Learning" className="img-fluid" style={{ height: "505px" }} />
            </div>
            <div className="col-md-6">
              <span className="badge fw-normal mb-3" style={{
                backgroundColor: '#F1F6FD',
                color: '#0070AD',
                fontSize: '12px',
                padding: '8px',
                fontWeight: 'bold',
                boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.1)',
              }}>
                Get to Know About Us
              </span>
              <h3 className="fw-bold mb-4" style={{ color: '#214554' }}>
                Discover Our Online Learning Programs
              </h3>
              <p>
                Dive into an array of courses meticulously crafted to cater to
                your educational aspirations and professional growth.
              </p>
            
              <ul className="list-unstyled">
                <li style={{ margin: "4px" }}>
                  <img src={this.props.siteUrl + "/SiteAssets/Group 16130.png"} alt="Learning" className="img-fluid" />
                  Seamless Scheduling
                </li>
                <li style={{ margin: "4px" }}>
                  <img src={this.props.siteUrl + "/SiteAssets/Group 16130.png"} alt="Learning" className="img-fluid" />
                  Service Guarantee
                </li>
                <li style={{ margin: "4px" }}>
                  <img src={this.props.siteUrl + "/SiteAssets/Group 16130.png"} alt="Learning" className="img-fluid" />
                  Integrated Collaboration
                </li>
              </ul>
              <button className="btn fw-normal text-white mb-3" style={{
                color: '#F1F6FD',
                backgroundColor: '#0070AD',
                fontSize: '14px',
                fontWeight: 'bold',
                borderRadius: '3px',
                marginLeft: '10px',
              }}>Discover More</button>
            </div>
          </div>
        </div>

        {/* News and Blog Section */}
        <section className="bg-light py-5 mt-5" style={{ backgroundColor: "#F1F6FD" }}>
          <div className="container text-center">
            <span className="badge fw-normal mb-3" style={{
              backgroundColor: "#F1F6FD", color: "#0070AD", fontSize: "12px", padding: "8px", fontWeight: "bold", boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.1)"
            }}>
              Get to Know About Us
            </span>
            <h3 className="fw-bold text-center mb-5" style={{ color: "#214554" }}>Our Latest News &
              Blog</h3>
            <div className="row">
              {/* Dynamically render news cards */}
              {this.state.newsItems.map((e: any) => (
                <div className="col-md-4">
                  <div className="card shadow-sm">
                    <img src={e.imgUrl} className="card-img-top" alt="Blog Image" />
                    <div className="card-body">
                      <h5 className="card-title">
                        {e.Title}
                      </h5>
                      <p className="card-text">By {e.newsBy} - {e.Date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <div className="row align-items-center" style={{ height: "505px" }}>
              <div className="col-md-6">
                <span className="badge fw-normal mb-3" style={{
                  backgroundColor: "#F1F6FD", color: "#0070AD", fontSize: "12px", padding: "8px", fontWeight: "bold", boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.1)"
                }}>
                  Get to Know About Us
                </span>
                <h3 className="fw-bold mb-4" style={{ color: "#214554" }}>
                  Find Your Path with Our Online Courses
                </h3>
                <p>
                  Embark on a personalized journey of growth and discovery with
                  our online courses.
                </p>
                <ul className="list-unstyled">
                  <li style={{ margin: "4px" }}>
                    <img src={this.props.siteUrl + "/SiteAssets/Group 16130.png"} alt="Learning" className="img-fluid" />
                    Personalized Learning Paths
                  </li>
                  <li style={{ margin: "4px" }}>
                    <img src={this.props.siteUrl + "/SiteAssets/Group 16130.png"} alt="Learning" className="img-fluid" />
                    Interactive Course Materials
                  </li>
                  <li style={{ margin: "4px" }}>
                    <img src={this.props.siteUrl + "/SiteAssets/Group 16130.png"} alt="Learning" className="img-fluid" />
                    Expert Instructor Support
                  </li>
                </ul>
                <button className="btn fw-normal text-white mb-3" style={{
                  color: "#F1F6FD", backgroundColor: "#0070AD", fontSize: "14px", fontWeight: "bold", borderRadius: "3px", marginLeft: "10px"
                }}>Discover More</button>
              </div>
              <div className="col-md-6 text-center">
                <img src={this.props.siteUrl + "/SiteAssets/Group 16129.png"} alt="Courses" className="img-fluid" />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}
