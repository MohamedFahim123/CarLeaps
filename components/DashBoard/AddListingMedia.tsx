import Image from "next/image";
import React, { useState } from "react";
import { TabProps } from "./AddListingCarDetails";

export default function AddListingMedia({ tab }: TabProps) {
  const [images, setImages] = useState<string[]>([
    "/images/resource/list2-1.png",
    "/images/resource/list2-2.png",
    "/images/resource/list2-3.png",
  ]);
  const [images2, setImages2] = useState<string[]>([
    "/images/resource/list2-1.png",
    "/images/resource/list2-2.png",
    "/images/resource/list2-3.png",
  ]);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (index !== undefined) {
          setImages((prevImages) => {
            const newImages = [...prevImages];
            newImages[index] = reader.result as string;
            return newImages;
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (index: number) => {
    setImages((prevImages) =>
      prevImages.filter((_, imgIndex) => imgIndex !== index)
    );
  };

  const handleImageChange2 = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages2((prevImages) => {
          const newImages = [...prevImages];
          newImages[index] = file.name;
          return newImages;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete2 = (index: number) => {
    setImages2((prevImages) =>
      prevImages.filter((_, imgIndex) => imgIndex !== index)
    );
  };

  return (
    <div
      className={`tab-pane fade gallery-sec style1 ${
        tab === "media" ? "show active" : ""
      }`}
      id="media"
      role="tabpanel"
      aria-labelledby="media-tab"
    >
      <div className="right-box-three">
        <h6 className="title">Gallery</h6>
        <form className="gallery-box">
          <div className="inner-box add-input-image">
            {images.map((imgSrc, index) => (
              <div className="image-box" key={index}>
                <Image
                  width={190}
                  height={167}
                  src={imgSrc}
                  alt={`Preview ${index}`}
                  className="uploaded-img"
                />
                <div className="content-box">
                  <ul className="social-icon">
                    <li>
                      <a onClick={() => handleDelete(index)}>
                        <Image
                          width={18}
                          height={18}
                          src="/images/resource/delet.svg"
                          alt=""
                        />
                      </a>
                    </li>
                    <li>
                      <label htmlFor={`file-upload-${index}`}>
                        <a>
                          <Image
                            width={18}
                            height={18}
                            src="/images/resource/delet1-1.svg"
                            alt="Upload"
                          />
                        </a>
                      </label>
                      <input
                        id={`file-upload-${index}`}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, index)}
                        style={{ display: "none" }}
                      />
                    </li>
                  </ul>
                </div>
              </div>
            ))}
            <div className="uplode-box">
              <div className="content-box">
                <label htmlFor="upload-new">
                  <Image
                    width={34}
                    height={34}
                    src="/images/resource/uplode.svg"
                    alt="Upload"
                  />
                  <span>Upload</span>
                </label>
                <input
                  id="upload-new"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => handleImageChange(e, images.length)}
                />
              </div>
            </div>
          </div>
          <div className="text">
            Max file size is 1MB, Minimum dimension: 330x300 And Suitable files
            are .jpg &amp; .png
          </div>
        </form>
      </div>
      <div className="attachment-sec">
        <h6 className="title">Attachments</h6>
        <form className="right-box-four">
          {images2.map((imgSrc, index) => (
            <div key={index} className="report-box">
              <span>{imgSrc}</span>
              <ul className="social-icon">
                <li>
                  <a onClick={() => handleDelete2(index)}>
                    <Image
                      width={18}
                      height={18}
                      src="/images/resource/delet.svg"
                      alt=""
                    />
                  </a>
                </li>
                <li>
                  <label htmlFor={`file-upload2-${index}`}>
                    <a>
                      <Image
                        width={18}
                        height={18}
                        src="/images/resource/delet1-1.svg"
                        alt="Upload"
                      />
                    </a>
                  </label>
                  <input
                    id={`file-upload2-${index}`}
                    type="file"
                    onChange={(e) => handleImageChange2(e, index)}
                    style={{ display: "none" }}
                  />
                </li>
              </ul>
            </div>
          ))}
          <div className="uplode-box">
            <div className="content-box">
              <label htmlFor="upload-new2">
                <Image
                  width={34}
                  height={34}
                  src="/images/resource/uplode.svg"
                  alt="Upload"
                />
                <span>Upload</span>
              </label>
              <input
                id="upload-new2"
                type="file"
                style={{ display: "none" }}
                onChange={(e) => handleImageChange2(e, images.length)}
              />
            </div>
          </div>
        </form>
        <div className="text">
          Max file size is 1MB, Minimum dimension: 330x300 And Suitable files
          are .jpg &amp; .png
        </div>
      </div>
      <div className="form-sec">
        <h6 className="title">Video link</h6>
        <form onSubmit={(e) => e.preventDefault()} className="row">
          <div className="form-column col-lg-12">
            <div className="inner-box">
              <div className="form_boxes">
                <label htmlFor="videoLink">Video Link</label>
                <input
                  id="videoLink"
                  required
                  placeholder="https://www.youtube.com/your_video_link"
                  type="text"
                  name="video_link"
                />
              </div>
              <div className="text">Enter Youtube or Vimeo url.</div>
            </div>
          </div>
          <div className="form-submit">
            <button type="submit" className="theme-btn">
              Next Location
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
        </form>
      </div>
    </div>
  );
}
