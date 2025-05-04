"use client";
import { useCarsForSaleStore } from "@/app/store/CarsForSale";
import { MainRegionName } from "@/app/utils/mainData";
import {
  carBrands,
  navItems,
  socialMediaLinks
} from "@/data/footerLinks";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";

export default function Footer({
  parentClass = "boxcar-footer footer-style-one cus-st-1",
}: {
  parentClass: string;
}) {
  const { boodies } = useCarsForSaleStore();
  const currRegion = Cookies.get("region") || MainRegionName;

  return (
    <footer className={parentClass}>
      <div className="widgets-section">
        <div className="boxcar-container pt-5">
          <div className="row">
            <div className="footer-column-two col-lg-9 col-md-12 col-sm-12 pt-5">
              <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div className="footer-widget links-widget wow fadeInUp">
                    <h4 className="widget-title">Useful Links</h4>
                    <div className="widget-content">
                      <ul className="user-links style-two">
                        {navItems.map((elm, i) => (
                          <li key={i}>
                            <Link href={"#"}>{elm.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div
                    className="footer-widget links-widget wow fadeInUp"
                    data-wow-delay="100ms"
                  >
                    <h4 className="widget-title">Quick Links</h4>
                    <div className="widget-content">
                      <ul className="user-links style-two position-relative z-10">
                        <li>
                          <Link href={`/${currRegion}/cars/cars-for-sale`}>
                            Cars for Sale
                          </Link>
                        </li>
                        <li>
                          <Link href={`/${currRegion}/cars/research-new-cars`}>
                            Research New Cars
                          </Link>
                        </li>
                        <li>
                          <Link href={`/${currRegion}/cars/perfect-match`}>
                            Perfect Match
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={`/${currRegion}/cars/certified-preowned-cars`}
                          >
                            CPO
                          </Link>
                        </li>
                        <li>
                          <Link href={`/${currRegion}/cars/find-car`}>
                            Find a Car
                          </Link>
                        </li>
                        <li>
                          <Link href={`/${currRegion}/cars/sell-car`}>
                            Sell a Car
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div
                    className="footer-widget links-widget wow fadeInUp"
                    data-wow-delay="200ms"
                  >
                    <h4 className="widget-title">For Sale</h4>
                    <div className="widget-content">
                      <ul className="user-links style-two">
                        {carBrands.map((elm, i) => (
                          <li key={i}>
                            <Link href={"#"}>{elm.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div
                    className="footer-widget links-widget wow fadeInUp"
                    data-wow-delay="300ms"
                  >
                    <h4 className="widget-title">Body Types</h4>
                    <div className="widget-content">
                      <ul className="user-links style-two">
                        {boodies?.slice(0, 6).map((elm) => (
                          <li key={elm.id}>
                            <Link
                              href={`/${currRegion}/cars/cars-for-sale/search?body=${elm.id}`}
                            >
                              {elm.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-column col-lg-3 col-md-12 col-sm-12 pt-5">
              <div
                className="footer-widget social-widget wow fadeInUp"
                data-wow-delay="400ms"
              >
                <h4 className="widget-title">Vehicles Type</h4>
                <div className="widget-content">
                  <a href="#" className="store">
                    <Image
                      src="/images/resource/apple.png"
                      width={24}
                      height={29}
                      alt=""
                    />
                    <span>Download on the</span>
                    <h6 className="title">Apple Store</h6>
                  </a>
                  <a href="#" className="store two">
                    <Image
                      src="/images/resource/play-2.png"
                      width={23}
                      height={26}
                      alt=""
                    />
                    <span>Get in on</span>
                    <h6 className="title">Google Play</h6>
                  </a>
                  <div className="social-icons">
                    <h6 className="title">Connect With Us</h6>
                    <ul>
                      {socialMediaLinks.map((social, index) => (
                        <li key={index}>
                          <a href={"#"}>
                            <i className={social.iconClass} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="boxcar-container">
          <div className="inner-container">
            <div className="copyright-text wow fadeInUp">
              ©{" "}
              <span>
                2025 CarLeaps.com. Managed By{" "}
                <strong style={{ color: "#b785fa" }}>VALKII LTD</strong>. All
                rights reserved.
              </span>
            </div>
            <ul className="footer-nav wow fadeInUp" data-wow-delay="200ms">
              <li>
                <a href="#">Terms &amp; Conditions</a>
              </li>
              <li>
                <a href="#">Privacy Notice</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
