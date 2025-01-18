import { TabProps } from "./AddListingCarDetails";

export default function AddListingFeatures({ tab }: TabProps) {
  return (
    <div
      className={`tab-pane fade cheak-box-sec style1 ${
        tab === "contact" ? "show active" : ""
      }`}
      id="contact"
      role="tabpanel"
      aria-labelledby="contact-tab"
    >
      <div className="right-box-two">
        <div className="cheak-box">
          <label className="contain">
            Heated Seats
            <input type="checkbox" defaultChecked={true} />
            <span className="checkmark" />
          </label>
          <label className="contain">
            Heated Steering Wheel
            <input type="checkbox" />
            <span className="checkmark" />
          </label>
          <label className="contain">
            Navigation System
            <input type="checkbox" />
            <span className="checkmark" />
          </label>
          <label className="contain">
            Tyre Pressure Monitoring System
            <input type="checkbox" />
            <span className="checkmark" />
          </label>
        </div>
        <div className="cheak-box">
          <label className="contain">
            Apple CarPlay/Android Auto
            <input type="checkbox" defaultChecked={true} />
            <span className="checkmark" />
          </label>
          <label className="contain">
            Bluetooth
            <input type="checkbox" />
            <span className="checkmark" />
          </label>
          <label className="contain">
            HomeLink
            <input type="checkbox" />
            <span className="checkmark" />
          </label>
        </div>
        <div className="cheak-box">
          <label className="contain">
            Airbag - Driver
            <input type="checkbox" defaultChecked={true} />
            <span className="checkmark" />
          </label>
          <label className="contain">
            Airbag - Passenger
            <input type="checkbox" />
            <span className="checkmark" />
          </label>
          <label className="contain">
            Anti-lock Braking System
            <input type="checkbox" />
            <span className="checkmark" />
          </label>
          <label className="contain">
            Backup Camera
            <input type="checkbox" />
            <span className="checkmark" />
          </label>
          <label className="contain">
            Blind Spot Monitor
            <input type="checkbox" />
            <span className="checkmark" />
          </label>
        </div>
        <div className="cheak-box">
          <label className="contain">
            Center Console
            <input type="checkbox" defaultChecked={true} />
            <span className="checkmark" />
          </label>
          <label className="contain">
            Heated and Ventilated Front Seats
            <input type="checkbox" />
            <span className="checkmark" />
          </label>
          <label className="contain">
            Panoramic Moonroof
            <input type="checkbox" />
            <span className="checkmark" />
          </label>
          <label className="contain">
            Qi Wireless Charging
            <input type="checkbox" />
            <span className="checkmark" />
          </label>
          <label className="contain">
            Touchscreen Display
            <input type="checkbox" />
            <span className="checkmark" />
          </label>
        </div>
        <div className="cheak-box">
          <label className="contain">
            Alloy Wheels
            <input type="checkbox" defaultChecked={true} />
            <span className="checkmark" />
          </label>
          <label className="contain">
            Brake Calipers - Silver Painted
            <input type="checkbox" />
            <span className="checkmark" />
          </label>
          <label className="contain">
            Rear Bumper High Gloss
            <input type="checkbox" />
            <span className="checkmark" />
          </label>
          <label className="contain">
            Rear Diffuser Body Colour
            <input type="checkbox" />
            <span className="checkmark" />
          </label>
          <label className="contain">
            Windows - Electric Front
            <input type="checkbox" />
            <span className="checkmark" />
          </label>
        </div>
      </div>
      <div className="btn-box">
        <a href="#" className="form-btn">
          Next Media
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={14}
            height={14}
            viewBox="0 0 14 14"
            fill="none"
          >
            <g clipPath="url(#clip0_881_11471)">
              <path
                d="M13.6106 0H5.05509C4.84013 0 4.66619 0.173943 4.66619 0.388901C4.66619 0.603859 4.84013 0.777802 5.05509 0.777802H12.6719L0.113453 13.3362C-0.0384687 13.4881 -0.0384687 13.7342 0.113453 13.8861C0.189396 13.962 0.288927 14 0.388422 14C0.487917 14 0.587411 13.962 0.663391 13.8861L13.2218 1.3277V8.94447C13.2218 9.15943 13.3957 9.33337 13.6107 9.33337C13.8256 9.33337 13.9996 9.15943 13.9996 8.94447V0.388901C13.9995 0.173943 13.8256 0 13.6106 0Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_881_11471">
                <rect width={14} height={14} fill="white" />
              </clipPath>
            </defs>
          </svg>
        </a>
      </div>
    </div>
  );
}
