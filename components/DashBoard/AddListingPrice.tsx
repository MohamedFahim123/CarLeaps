import { TabProps } from "./AddListingCarDetails";
import { InputField } from "./CustomFields";

export default function AddListingPrice({ tab, handleTabChange, register, errors }: TabProps) {
  return (
    <div className={`tab-pane fade ${tab === "price" ? "show active" : ""}`} id="price" role="tabpanel" aria-labelledby="price_tab">
      <div className="row">
        <div className="col-lg-12">
          <InputField label="Price ($)" className="v2" name="price" register={register} errors={errors} />
        </div>
        <div className="col-lg-12">
          <div className="inner-box">
            <InputField label="Office Price ($)" className="v2" name="offer_price" register={register} errors={errors} />
            <div className="text">Any text shown before price (for example: from).</div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="form-submit">
            <button type="button" onClick={() => handleTabChange && handleTabChange("features")} className="theme-btn">
              Next Features
              <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 14 14" fill="none">
                <g clipPath="url(#clip0_711_3214)">
                  <path
                    d="M13.6106 0H5.05509C4.84013 0 4.66619 0.173943 4.66619 0.388901C4.66619 0.603859 4.84013 0.777802 5.05509 0.777802H12.6719L0.113453 13.3362C-0.0384687 13.4881 -0.0384687 13.7342 0.113453 13.8861C0.189396 13.962 0.288927 14 0.388422 14C0.487917 14 0.587411 13.962 0.663391 13.8861L13.2218 1.3277V8.94447C13.2218 9.15943 13.3957 9.33337 13.6107 9.33337C13.8256 9.33337 13.9996 9.15943 13.9996 8.94447V0.388901C13.9995 0.173943 13.8256 0 13.6106 0Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_711_3214">
                    <rect width={14} height={14} fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
