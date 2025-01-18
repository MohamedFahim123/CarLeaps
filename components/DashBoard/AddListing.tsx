"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import AddListingCarDetails from "./AddListingCarDetails";
import AddListingPrice from "./AddListingPrice";
import AddListingFeatures from "./AddListingFeatures";
import AddListingMedia from "./AddListingMedia";
import AddListingLocation from "./AddListingLocation";

export default function AddListing() {
  const [activeTab, setActiveTab] = useState<string>("home");

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <section className="dashboard-widget">
      <div className="right-box">
        <Sidebar />
        <div className="content-column">
          <div className="inner-column">
            <div className="list-title">
              <h3 className="title">Add Listings</h3>
              <div className="text">
                Lorem ipsum dolor sit amet, consectetur.
              </div>
            </div>
            <div className="form-box">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                      activeTab === "home" ? "active" : ""
                    }`}
                    id="home-tab"
                    type="button"
                    onClick={() => handleTabChange("home")}
                  >
                    Car Details
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                      activeTab === "profile" ? "active" : ""
                    }`}
                    id="profile-tab"
                    type="button"
                    onClick={() => handleTabChange("profile")}
                  >
                    Price
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                      activeTab === "contact" ? "active" : ""
                    }`}
                    id="contact-tab"
                    type="button"
                    onClick={() => handleTabChange("contact")}
                  >
                    Features
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                      activeTab === "media" ? "active" : ""
                    }`}
                    id="media-tab"
                    type="button"
                    onClick={() => handleTabChange("media")}
                  >
                    Media
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                      activeTab === "location" ? "active" : ""
                    }`}
                    id="location-tab"
                    type="button"
                    onClick={() => handleTabChange("location")}
                  >
                    Location
                  </button>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                <AddListingCarDetails tab={activeTab} />
                <AddListingPrice tab={activeTab} />
                <AddListingFeatures tab={activeTab} />
                <AddListingMedia tab={activeTab} />
                <AddListingLocation tab={activeTab} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}