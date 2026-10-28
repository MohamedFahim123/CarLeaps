import { Profile } from "@/app/store/profile";
import Image from "next/image";

export default function ProfileShow({ profile }: { profile: Profile | null }) {
  return (
    <div className="gallery-sec">
      <div
        className="right-box-three d-flex align-items-center"
        style={{ backgroundImage: `${profile?.cover} !important` }}
      >
        <div className="gallery-box">
          <div className="inner-box add-input-image">
            <div className="image-box">
              <Image
                className="rounded-circle"
                width={150}
                height={150}
                style={{
                  aspectRatio: "1/1",
                  objectFit: "contain",
                  backgroundColor: "#ffffff90",
                  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
                }}
                src={
                  profile?.image === "N/A"
                    ? "/images/resource/list2-4.png"
                    : profile?.image
                    ? profile?.image
                    : "/images/resource/list2-4.png"
                }
                alt="Upload"
              />
            </div>
          </div>
        </div>
        <div className="d-flex flex-column gap-0">
          <h3>{profile?.name}</h3>
        </div>
      </div>
      <div className="form-sec">
        <form className="row">
          <div className="col-lg-4">
            <div className="form_boxes">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                disabled
                name="email"
                type="email"
                placeholder={profile?.email}
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="form_boxes">
              <label htmlFor="PhoneNumber">Phone</label>
              <input
                id="PhoneNumber"
                disabled
                name="phone"
                type="number"
                placeholder={profile?.phone}
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="form_boxes">
              <label htmlFor="whatsApp">Whatsapp</label>
              <input
                id="whatsApp"
                disabled
                name="whatsapp"
                type="number"
                placeholder={profile?.whatsapp}
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="form_boxes">
              <label htmlFor="WebSite">Sales Hours</label>
              <input
                id="WebSite"
                disabled
                name="website"
                type="text"
                placeholder={profile?.sales_hours}
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="form_boxes">
              <label htmlFor="WebSite">Type</label>
              <input
                id="WebSite"
                disabled
                name="website"
                type="text"
                placeholder={profile?.type}
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="form_boxes">
              <label htmlFor="WebSite">Locale</label>
              <input
                id="WebSite"
                disabled
                name="website"
                type="text"
                placeholder={profile?.locale}
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="form_boxes">
              <label htmlFor="WebSite">Status</label>
              <input
                id="WebSite"
                disabled
                name="website"
                type="text"
                placeholder={profile?.status}
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="form_boxes">
              <label>Country Name</label>
              <input
                type="text"
                disabled
                name="map-location"
                placeholder={profile?.country_name}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form_boxes">
              <label>Address</label>
              <textarea
                disabled
                style={{ minHeight: "100px" }}
                name="address"
                placeholder={profile?.address}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form_boxes">
              <label>BIO</label>
              <textarea
                disabled
                style={{ minHeight: "100px", overflowY: "auto" }}
                name="bio"
                placeholder={profile?.bio}
              />
            </div>
          </div>
        </form>
      </div>
      {/* <div className="map-sec-two">
        <div className="form-sec-two">
          <div className="row">
            <div className="map-box">
              <div className="goole-iframe">
                <iframe src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&t=&z=14&ie=UTF8&iwloc=B&output=embed"></iframe>
              </div>
            </div>

          </div>
        </div>
      </div> */}
    </div>
  );
}
