import { Car } from "@/app/store/CarsForSale";
import Image from "next/image";
import Link from "next/link";

export default function SideCard({
  carItem,
  region,
}: {
  carItem: Car;
  region: string;
}) {
  return (
    <div className="side-bar-column style-1 col-lg-4 col-md-12 col-sm-12">
      <div className="inner-column">
        <div className="contact-box">
          <div className="icon-box">
            <Link href={`/${region}/cars/dealer/${carItem.dealer.dealer.id}`}>
              <Image
                src={carItem.dealer.dealer.image}
                width={55}
                height={54}
                alt={`${carItem.dealer.dealer.name} image`}
                className="rounded-circle object-fit-contain w-100 h-100"
              />
            </Link>
          </div>
          <div className="content-box">
            <h6 className="title">
              <Link href={`/${region}/cars/dealer/${carItem.dealer.dealer.id}`}>
                {carItem.dealer.dealer.name}
              </Link>
            </h6>
            <div className="text">{carItem.dealer.dealer.address}</div>
            <ul className="contact-list">
              <li>
                <a href="#">
                  <div className="image-box">
                    <Image
                      src="/images/resource/phone1-1.svg"
                      width={18}
                      height={18}
                      alt=""
                    />
                  </div>
                  Get Directions
                </a>
              </li>
              <li>
                <Link href={`tel:${carItem.dealer.dealer.phone}`}>
                  <div className="image-box">
                    <Image
                      src="/images/resource/phone1-2.svg"
                      width={18}
                      height={18}
                      alt="phone icon"
                    />
                  </div>
                  <span>{carItem.dealer.dealer.phone}</span>
                </Link>
              </li>
            </ul>
            <div className="btn-box">
              <a href="#" className="side-btn two">
                Chat Via Whatsapp
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={14}
                  height={14}
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <g clipPath="url(#clip0_881_8744)">
                    <path
                      d="M13.6111 0H5.05558C4.84062 0 4.66668 0.173943 4.66668 0.388901C4.66668 0.603859 4.84062 0.777802 5.05558 0.777802H12.6723L0.113941 13.3362C-0.0379805 13.4881 -0.0379805 13.7342 0.113941 13.8861C0.189884 13.962 0.289415 14 0.38891 14C0.488405 14 0.5879 13.962 0.663879 13.8861L13.2222 1.3277V8.94447C13.2222 9.15943 13.3962 9.33337 13.6111 9.33337C13.8261 9.33337 14 9.15943 14 8.94447V0.388901C14 0.173943 13.8261 0 13.6111 0Z"
                      fill="#60C961"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_881_8744">
                      <rect width={14} height={14} fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </a>
              <Link href={`/${region}/cars/dealer/${carItem.dealer.dealer.id}`} className="side-btn-three">
                View all stock at this dealer
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={14}
                  height={14}
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <g clipPath="url(#clip0_881_10193)">
                    <path
                      d="M13.6111 0H5.05558C4.84062 0 4.66668 0.173943 4.66668 0.388901C4.66668 0.603859 4.84062 0.777802 5.05558 0.777802H12.6723L0.113941 13.3362C-0.0379805 13.4881 -0.0379805 13.7342 0.113941 13.8861C0.189884 13.962 0.289415 14 0.38891 14C0.488405 14 0.5879 13.962 0.663879 13.8861L13.2222 1.3277V8.94447C13.2222 9.15943 13.3962 9.33337 13.6111 9.33337C13.8261 9.33337 14 9.15943 14 8.94447V0.388901C14 0.173943 13.8261 0 13.6111 0Z"
                      fill="#050B20"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_881_10193">
                      <rect width={14} height={14} fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
