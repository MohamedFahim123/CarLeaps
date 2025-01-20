import Image from "next/image";

export default function ProflieLocation() {
  return (
    <div className="map-sec-two">
      <div className="form-sec-two">
        <form onSubmit={(e) => e.preventDefault()} className="row">
          <div className="col-lg-6">
            <div className="form_boxes">
              <label>Friendly Address</label>
              <input
                type="text"
                name="address"
                required
                placeholder="ali tufan"
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form_boxes">
              <label>Map Location</label>
              <input
                required
                type="text"
                name="map-location"
                placeholder="Map Location"
              />
            </div>
          </div>
          <div className="map-box">
            <div className="goole-iframe">
              <iframe src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&t=&z=14&ie=UTF8&iwloc=B&output=embed"></iframe>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form_boxes">
              <label>Longitude</label>
              <input
                type="text"
                name="longitude"
                placeholder="Longitude"
                required
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form_boxes">
              <label>Latitude</label>
              <input
                type="text"
                name="Latitude"
                placeholder="Latitude"
                required
              />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form_boxes">
              <label>Description</label>
              <textarea
                name="text"
                placeholder="Lorem Ipsum Dolar Sit Amet"
                defaultValue={""}
                required
              />
            </div>
          </div>
          <div className="form-submit">
            <button type="submit" className="theme-btn">
              Save Profile
              <Image alt="" src="/images/arrow.svg" width={14} height={14} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
