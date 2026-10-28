import { pricingPlans } from "@/data/pricing";
import Link from "next/link";

export default function PricingPlans() {
  return (
    <section className="boxcar-pricing-section-seven">
      <div className="boxcar-container">
        <div className="boxcar-title text-center">
          <h2>Flexible Pricing Plans</h2>
          <div className="text">
            Choose the plan that fits your dealership inventory and visibility goals.
          </div>
        </div>
        <div className="row">
          {pricingPlans.map((plan) => (
            <div
              key={plan.plan}
              className="pricing-block-seven col-lg-3 col-md-6 col-sm-12"
            >
              <div className="inner-box">
                <div className="title">
                  {plan.price}
                  <span>/mo</span>
                </div>
                <div className="plan">{plan.plan}</div>
                <div className="text">{plan.description}</div>
                <ul className="pricing-list">
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <i className="fa-solid fa-check" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="pricing-btn">
                  Get Started
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
