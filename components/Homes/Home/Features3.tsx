"use client";
import { useFooterTapsStore } from "@/app/store/footerTaps";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Features3() {
  const { footerTaps } = useFooterTapsStore();
  const [activeTab, setActiveTab] = useState<string>("");

  useEffect(() => {
    if (footerTaps.length > 0 && activeTab === "") {
      setActiveTab(footerTaps[0].name);
    }
  }, [footerTaps, activeTab]);

  return (
    <section className="cars-section">
      <div className="boxcar-container">
        <div className="boxcar-title wow fadeInUp">
          <h2>Quick Links</h2>
        </div>
        <ul
          className="nav nav-tabs wow fadeInUp flex-nowrap"
          data-wow-delay="100ms"
          id="myTab"
          role="tablist"
        >
          {footerTaps.map((tap) => (
            <li className="nav-item w-auto mb-0" role="presentation" key={tap.id}>
              <button
                className={`nav-link text-capitalize fw-semibold ${
                  activeTab === tap.name ? "active fw-bold" : ""
                }`}
                id={`${tap.name}-tab`}
                data-bs-toggle="tab"
                data-bs-target="#${tap.name}"
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
                onClick={() => setActiveTab(tap.name)}
              >
                {tap.name}
              </button>
            </li>
          ))}
        </ul>
        <div
          className="tab-content wow fadeInUp"
          data-wow-delay="200ms"
          id="myTabContent"
        >
          {footerTaps.map(
            (tap) =>
              tap.name === activeTab && (
                <ul
                  key={tap.id}
                  className={`tab-pane fade d-flex flex-wrap ${
                    activeTab === tap.name ? "show active" : ""
                  }`}
                  id={`${tap.name}`}
                  role="tabpanel"
                  aria-labelledby={`${tap.name}-tab`}
                >
                  {tap.items.map((t) => (
                    <li key={t.id} className="pe-5 me-5 my-1">
                      <Link className="pe-5 UnderLinedText" href={t.link}>{t.title}</Link>
                    </li>
                  ))}
                </ul>
              )
          )}
        </div>
      </div>
    </section>
  );
}
