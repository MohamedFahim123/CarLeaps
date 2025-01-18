import SelectComponent from "../Common/SelectComponent";

export interface TabProps {
  tab: string;
}

export default function AddListingCarDetails({ tab }: TabProps) {
  return (
    <div
      className={`tab-pane fade ${tab === "home" ? "show active" : ""}`}
      id="home"
      role="tabpanel"
      aria-labelledby="home-tab"
    >
      <form onSubmit={(e) => e.preventDefault()} className="row">
        <div className="form-column col-lg-4">
          <div className="form_boxes">
            <label>Make</label>
            <SelectComponent
              options={["Select Make", "Select Label", "Select Lable"]}
            />
          </div>
        </div>
        <div className="form-column col-lg-4">
          <div className="form_boxes">
            <label>Model</label>
            <SelectComponent
              options={["Select Model", "Select Label", "Select Label"]}
            />
          </div>
        </div>
        <div className="form-column col-lg-4">
          <div className="form_boxes">
            <label>Trim</label>
            <SelectComponent options={["LXI", "GXI", "LX"]} />
          </div>
        </div>
        <div className="form-column col-lg-4">
          <div className="form_boxes">
            <label>Listing Type</label>
            <SelectComponent
              options={["Sedan", "Select Label", "Select Label"]}
            />
          </div>
        </div>
        <div className="form-column col-lg-4">
          <div className="form_boxes">
            <label>Body Style</label>
            <SelectComponent options={["SUV", "Coupe", "Sedan"]} />
          </div>
        </div>
        <div className="form-column col-lg-4">
          <div className="form_boxes">
            <label>Year</label>
            <SelectComponent
              options={["Select Year", "Select Label", "Select Label"]}
            />
          </div>
        </div>
        <div className="form-column col-lg-4">
          <div className="form_boxes">
            <label>Drive Type</label>
            <SelectComponent
              options={["Select Type", "Select Label", "Select Label"]}
            />
          </div>
        </div>
        <div className="form-column col-lg-4">
          <div className="form_boxes">
            <label>Transmission</label>
            <SelectComponent
              options={["Select Transmission", "Select Label", "Select Label"]}
            />
          </div>
        </div>
        <div className="form-column col-lg-4">
          <div className="form_boxes">
            <label>Fuel Type</label>
            <SelectComponent
              options={["Select Fuel", "Select Label", "Select Label"]}
            />
          </div>
        </div>
        <div className="form-column col-lg-4">
          <div className="form_boxes">
            <label>Mileage</label>
            <SelectComponent
              options={["75,000", "Select Label", "Select Label"]}
            />
          </div>
        </div>
        <div className="form-column col-lg-4">
          <div className="form_boxes">
            <label htmlFor="EngineSize">Engine Size</label>
            <input
              id="EngineSize"
              required
              placeholder="Engine Size"
              type="text"
              name="engine_size"
            />
          </div>
        </div>
        <div className="form-column col-lg-4">
          <div className="form_boxes">
            <label>Cylinder</label>
            <SelectComponent
              options={["Select Cylinder", "Select Label", "Select Label"]}
            />
          </div>
        </div>
        <div className="form-column col-lg-4">
          <div className="form_boxes">
            <label>Color</label>
            <SelectComponent
              options={["Select Color", "Select Label", "Select Label"]}
            />
          </div>
        </div>
        <div className="form-column col-lg-4">
          <div className="form_boxes">
            <label>Door</label>
            <SelectComponent
              options={["Select Door", "Select Label", "Select Label"]}
            />
          </div>
        </div>
        <div className="form-column col-lg-4">
          <div className="form_boxes">
            <label htmlFor="VIN">VIN</label>
            <input id="VIN" required placeholder="VIN" type="text" name="VIN" />
          </div>
        </div>
        <div className="form-column col-lg-12">
          <div className="form_boxes v2">
            <label>Listing Description</label>
            <div className="drop-menu">
              <textarea
                name="message"
                placeholder="Lorem Ipsum Dolar Sit Amet"
                defaultValue={""}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="form-submit">
            <button type="submit" className="theme-btn">
              Next Price
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={14}
                height={14}
                viewBox="0 0 14 14"
                fill="none"
              >
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
      </form>
    </div>
  );
}
