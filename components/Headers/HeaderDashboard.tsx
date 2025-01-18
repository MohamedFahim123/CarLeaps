import Image from "next/image";
import Link from "next/link";
import React from "react";
import Nav from "./Nav";

function HeaderDashboard() {
  return (
    <header className="boxcar-header header-style-ten">
      <div className="header-inner">
        <div className="inner-container">
          {/* Main box */}
          <div className="c-box">
            <div className="logo-inner">
              <div className="logo">
                <Link href={`/`}>
                  <Image
                    alt=""
                    title="Boxcar"
                    width={108}
                    height={26}
                    src="/images/logo.svg"
                  />
                </Link>
              </div>
            </div>
            {/*Nav Box*/}
            <div className="nav-out-bar">
              <nav className="nav main-menu">
                <ul className="navigation" id="navbar">
                  <Nav />
                </ul>
              </nav>
              {/* Main Menu End*/}
            </div>
            <div className="right-box">
              <a href="#" className="haeder-img">
                <Image
                  width={50}
                  height={50}
                  src="/images/resource/header-img.png"
                  alt=""
                />
              </a>
              <div className="mobile-navigation">
                <a href="#nav-mobile" title="">
                  <svg
                    width={22}
                    height={11}
                    viewBox="0 0 22 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width={22} height={2} fill="white" />
                    <rect y={9} width={22} height={2} fill="white" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          {/* Mobile Menu  */}
        </div>
      </div>
      {/* End Header Search */}
      <div id="nav-mobile" />
    </header>
  );
}

export default React.memo(HeaderDashboard);