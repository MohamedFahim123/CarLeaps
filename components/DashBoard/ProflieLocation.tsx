import Image from "next/image";

export default function ProflieLocation({ edit }: { edit: string }) {
  return (
    <div className="map-sec-two">
      <div className="form-sec-two">
        <form className="row">
          <div className="map-box">
            <div className="goole-iframe">
              <iframe src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&t=&z=14&ie=UTF8&iwloc=B&output=embed"></iframe>
            </div>
          </div>

          {edit === "edit" && (
            <div className="form-submit">
              <button type="submit" className="theme-btn">
                Save Profile
                <Image alt="" src="/images/arrow.svg" width={14} height={14} />
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
