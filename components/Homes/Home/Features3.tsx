"use client";
import { useFooterTapsStore } from "@/app/store/footerTaps";
import Link from "next/link";
export default function Features3() {
  const { footerTaps } = useFooterTapsStore();
  return (
    <section className="cars-section">
      <div className="boxcar-container">
        <div className="boxcar-title wow fadeInUp">
          <h2>Quick Links</h2>
        </div>
        <div
          className="tab-content wow fadeInUp row"
          data-wow-delay="200ms"
          id="myTabContent"
        >
          {footerTaps.map((tap) => (
            <div
              key={tap.id}
              className="tab-pane fade show active col-md-4 col-lg-3 col-sm-6"
              id={`${tap.name}`}
              role="tabpanel"
              aria-labelledby={`${tap.name}-tab`}
            >
              <div className="shop-cars d-flex flex-column  ">
                <h4 className="fw-bold text-capitalize">{tap.name}</h4>
                <ul className="cars-list">
                  {tap.items.map((item) => (
                    <li key={item.id}>
                      <Link href={item.link}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
