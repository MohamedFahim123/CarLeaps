import { TabProps } from "./AddListingCarDetails";

export default function AddListingFeatures({ tab, handleTabChange, register, errors, store }: TabProps) {
  const comfort = store?.features?.comfort || [];
  const entertainment = store?.features?.entertainment || [];
  const safty = store?.features?.safety || [];
  const seats = store?.features?.seats || [];

  return (
    <div className={`tab-pane fade cheak-box-sec style1 ${tab === "features" ? "show active" : ""}`} id="features" role="tabpanel" aria-labelledby="features_tab">
      <div className="right-box-two">
        <div className="cheak-box">
          <h4>comfort</h4>
          {errors.comfort && <p className="error">{errors.comfort.message}</p>}
          {comfort.length > 0 ? (
            comfort.map((item, index) => (
              <label key={index} className="contain">
                {item.name}
                <input type="checkbox" value={item.id} {...register("comfort", { required: index === 0 && "required" })} multiple />
                <span className="checkmark" />
              </label>
            ))
          ) : (
            <p>No comfort features available</p>
          )}
        </div>
        <div className="cheak-box">
          <h4>Entertainment</h4>
          {errors.entertainment && <p className="error">{errors.entertainment.message}</p>}
          {entertainment.length > 0 ? (
            entertainment.map((item, index) => (
              <label key={index} className="contain">
                {item.name}
                <input type="checkbox" value={item.id} {...register("entertainment", { required: index === 0 && "required" })} multiple />
                <span className="checkmark" />
              </label>
            ))
          ) : (
            <p>No entertainment features available</p>
          )}
        </div>
        <div className="cheak-box">
          <h4>Seats</h4>
          {errors.seats && <p className="error">{errors.seats.message}</p>}
          {seats.length > 0 ? (
            seats.map((item, index) => (
              <label key={index} className="contain">
                {item.name}
                <input type="checkbox" value={item.id} {...register("seats", { required: index === 0 && "required" })} multiple />
                <span className="checkmark" />
              </label>
            ))
          ) : (
            <p>No seats features available</p>
          )}
        </div>
        <div className="cheak-box">
          <h4>Safety</h4>
          {errors.safety && <p className="error">{errors.safety.message}</p>}
          {safty.length > 0 ? (
            safty.map((item, index) => (
              <label key={index} className="contain">
                {item.name}
                <input type="checkbox" value={item.id} {...register("safety", { required: index === 0 && "required" })} multiple />
                <span className="checkmark" />
              </label>
            ))
          ) : (
            <p>No safty features available</p>
          )}
        </div>
      </div>
      <div className="btn-box">
        <button type="button" onClick={() => handleTabChange && handleTabChange("media")} className="form-btn">
          Next Media
          <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 14 14" fill="none">
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
        </button>
      </div>
    </div>
  );
}
