import Image from "next/image";
import React, { useState } from "react";
import { TabProps } from "./AddListingCarDetails";

export default function AddListingMedia({
  tab,
  handleTabChange,
  isSubmitting,
  errors,
  setValue,
  watch,
}: TabProps) {
  const [images, setImages] = useState<string>("");
  const [images2, setImages2] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (setValue) {
      setValue("main_image", file);
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(reader.result as string); // Store Base64 URL
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = () => {
    setImages("");
  };

  const handleImageChange2 = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file: File | null = e?.target?.files?.[0] ? e.target.files[0] : null;

    if (!file) return;

    const currentImages = (watch && watch("images")) ?? [];

    if (setValue) {
      setValue("images", [...currentImages, file]);
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImages2((prevImages) => {
        const newImages = [...prevImages];
        newImages[index] = file.name as string;
        return newImages;
      });
    };

    reader.readAsDataURL(file);
  };
  const handleDelete2 = (index: number) => {
    setImages2((prevImages) => {
      const updatedImages = prevImages.filter(
        (_, imgIndex) => imgIndex !== index
      );

      // Update form state
      if (setValue) {
        const currentImages = (watch && watch("images")) ?? [];
        const updatedFormImages = currentImages.filter(
          (_, imgIndex) => imgIndex !== index
        );
        setValue("images", updatedFormImages);
      }

      return updatedImages;
    });
  };

  return (
    <div
      className={`tab-pane fade gallery-sec style1 ${
        tab === "media" ? "show active" : ""
      }`}
      id="media"
      role="tabpanel"
      aria-labelledby="media-=_tab"
    >
      <div className="right-box-three">
        <h6 className="title">Main Image</h6>
        {errors.main_image && (
          <span className="text-danger">{errors.main_image.message}</span>
        )}
        <div className="gallery-box">
          <div className="inner-box add-input-image">
            {images && (
              <div className="image-box">
                <Image
                  width={190}
                  height={167}
                  src={images}
                  alt={`Preview `}
                  className="uploaded-img"
                />
                <div className="content-box">
                  <ul className="social-icon">
                    <li>
                      <a onClick={() => handleDelete()}>
                        <Image
                          width={18}
                          height={18}
                          src="/images/resource/delet.svg"
                          alt=""
                        />
                      </a>
                    </li>
                    <li>
                      <label
                        style={{ cursor: "pointer" }}
                        htmlFor={`file-upload-mainImage`}
                      >
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
                        id={`file-upload-mainImage`}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e)}
                        style={{ display: "none" }}
                      />
                    </li>
                  </ul>
                </div>
              </div>
            )}
            {!images && (
              <div className="uplode-box">
                <div className="content-box">
                  <label style={{ cursor: "pointer" }} htmlFor="upload-new">
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
                    onChange={(e) => handleImageChange(e)}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="text">
            Max file size is 1MB, Minimum dimension: 330x300 And Suitable files
            are .jpg &amp; .png
          </div>
        </div>
      </div>
      <div className="attachment-sec">
        <h6 className="title">Gallery</h6>
        {errors.images && (
          <span className="text-danger">{errors.images.message}</span>
        )}
        <div className="right-box-four row gap-2">
          {images2.map((imgSrc, index) => (
            <div key={index} className="report-box col-lg-3 col-md-6 col-sm-12">
              <span>{imgSrc.slice(0, 15) + "..."}</span>
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
                  <label
                    style={{ cursor: "pointer" }}
                    htmlFor={`file-upload2-${index}`}
                  >
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
          <div className="uplode-box col-lg-3 col-md-6 col-sm-12">
            <div className="content-box">
              <label style={{ cursor: "pointer" }} htmlFor="upload-new2">
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
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleImageChange2(e, images2.length)}
              />
            </div>
          </div>
        </div>
        <div className="text">
          Max file size is 1MB, Minimum dimension: 330x300 And Suitable files
          are .jpg &amp; .png
        </div>
      </div>

      <div className="form-sec">
        <h6 className="title">Video link</h6>
        <div className="row">
          <div className="form-column col-lg-12">
            <div className="inner-box">
              <div className="form_boxes">
                <label htmlFor="videoLink">Video Link</label>
                <input
                  id="videoLink"
                  placeholder="https://www.youtube.com/your_video_link"
                  type="text"
                  name="video_link"
                />
              </div>
              <div className="text">Enter Youtube or Vimeo url.</div>
            </div>
          </div>
          <div className="form-submit">
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={() => handleTabChange && handleTabChange("location")}
              className="theme-btn"
            >
              Submit
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
      </div>
    </div>
  );
}
