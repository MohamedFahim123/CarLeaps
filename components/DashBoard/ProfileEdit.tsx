import { useCountriesStore } from "@/app/store/countries";
import { Profile } from "@/app/store/profile";
import { useTokenStore } from "@/app/store/Token";
import { baseUrl } from "@/app/utils/mainData";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface ProfileFormInputs {
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  sales_hours: string;
  image: File;
  cover: File;
  country_id: string;
  address: string;
  bio: string;
}

export default function ProfileEdit({ profile }: { profile: Profile | null }) {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormInputs>();
  const { countries } = useCountriesStore();
  const { token } = useTokenStore();

  const [images, setImages] = useState<string>("");
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDelete = () => {
    setImages("");
    setValue("image", "" as unknown as File);
  };

  const [images2, setImages2] = useState<string>("");
  const handleImageChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("cover", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages2(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDelete2 = () => {
    setImages2("");
    setValue("cover", "" as unknown as File);
  };

  useEffect(() => {
    if (profile) {
      setValue("name", profile?.name);
      setValue("email", profile?.email);
      setValue("phone", profile?.phone);
      setValue("address", profile?.address);
      setValue("bio", profile?.bio);
      setValue("whatsapp", profile?.whatsapp);
      setValue("country_id", `${profile?.country_id}`);
      setValue("sales_hours", profile?.sales_hours);
      setImages(profile?.image === "N/A" ? "" : profile?.image);
      setImages2(profile?.cover === "N/A" ? "" : profile?.cover);
    }
  }, [profile, setValue]);

  useEffect(() => {
    if (watch("image") && errors.image) {
      clearErrors("image");
    }
  }, [clearErrors, errors.image, watch("image")]);

  useEffect(() => {
    if (watch("cover") && errors.cover) {
      clearErrors("cover");
    }
  }, [clearErrors, errors.cover, watch("cover")]);

  const onSubmit: SubmitHandler<ProfileFormInputs> = async (
    data: ProfileFormInputs
  ) => {
    const toastId = toast.loading("Submitting...");
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === "image" || key === "cover") {
        formData.append(key, data[key as keyof ProfileFormInputs]);
      } else {
        formData.append(key, String(data[key as keyof ProfileFormInputs]));
      }
    });
    try {
      const res = await axios.post(
        `${baseUrl}/dealer/update-profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.dismiss(toastId);
      toast.success(res?.data?.message, {
        autoClose: 1500,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.dismiss(toastId);
        const errorResponse = error.response?.data;
        if (errorResponse?.errors) {
          Object.keys(errorResponse?.errors).forEach((key) => {
            setError(key as keyof ProfileFormInputs, {
              type: "manual",
              message: errorResponse?.errors[key][0],
            });
            toast.error(errorResponse?.errors[key][0], {
              autoClose: 1500,
            });
          });
        }
      }
    }
  };

  return (
    <div className="gallery-sec">
      <div className="right-box-three">
        <h6 className="title">Gallery</h6>
        <div className="gallery-box">
          <div className="inner-box add-input-image">
            {images && (
              <div className="image-box">
                <Image
                  width={150}
                  height={150}
                  src={images}
                  alt={`Profile Image`}
                  className="object-fit-contain rounded-circle"
                />
                {errors.image && (
                  <p className="text-danger">{errors.image.message}</p>
                )}
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
                        htmlFor={`file-upload-profileImage`}
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
                        id={`file-upload-profileImage`}
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
                  <label htmlFor="upload-new">
                    <Image
                      width={34}
                      height={34}
                      src={"/images/resource/uplode.svg"}
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

      <div className="right-box-three v2 mt-4">
        <h6 className="title">Cover</h6>
        <div className="gallery-box">
          <div className="inner-box add-input-image">
            {images2 && (
              <div className="image-box">
                <Image
                  width={150}
                  height={150}
                  src={images2}
                  alt={`Cover Image`}
                  className="object-fit-contain rounded-circle"
                />
                {errors.image && (
                  <p className="text-danger">{errors.image.message}</p>
                )}
                <div className="content-box">
                  <ul className="social-icon">
                    <li>
                      <a onClick={() => handleDelete2()}>
                        <Image
                          width={18}
                          height={18}
                          src="/images/resource/delet.svg"
                          alt="delete"
                        />
                      </a>
                    </li>
                    <li>
                      <label
                        style={{ cursor: "pointer" }}
                        htmlFor={`file-upload-CoverImage`}
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
                        id={`file-upload-CoverImage`}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange2(e)}
                        style={{ display: "none" }}
                      />
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {!images2 && (
              <div className="uplode-box">
                <div className="content-box">
                  <label htmlFor="upload-new">
                    <Image
                      width={34}
                      height={34}
                      src={"/images/resource/uplode.svg"}
                      alt="Upload"
                    />
                    <span>Upload</span>
                  </label>
                  <input
                    id="upload-new"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => handleImageChange2(e)}
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
      <div className="form-sec">
        <form onSubmit={handleSubmit(onSubmit)} className="row">
          <div className="col-lg-4">
            <div className="form_boxes">
              <label htmlFor="ProfileName">Name</label>
              <input
                id="ProfileName"
                type="text"
                {...register("name", { required: "Required" })}
              />
              {errors.name && (
                <p className="text-danger">{errors.name.message}</p>
              )}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="form_boxes">
              <label htmlFor="ProfileEmail">Email</label>
              <input
                id="ProfileEmail"
                type="email"
                {...register("email", { required: "Required" })}
              />
              {errors.email && (
                <p className="text-danger">{errors.email.message}</p>
              )}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="form_boxes">
              <label htmlFor="ProfilePhoneNumber">Phone</label>
              <input
                id="ProfilePhoneNumber"
                type="text"
                {...register("phone", { required: "Required" })}
              />
              {errors.phone && (
                <p className="text-danger">{errors.phone.message}</p>
              )}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="form_boxes">
              <label htmlFor="ProfilewhatsApp">Whatsapp</label>
              <input
                id="ProfilewhatsApp"
                type="text"
                {...register("whatsapp", {
                  required: "Required",
                })}
              />
              {errors.whatsapp && (
                <p className="text-danger">{errors.whatsapp.message}</p>
              )}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="form_boxes">
              <label htmlFor="ProfileSalesHours">Sales Hours</label>
              <input
                id="ProfileSalesHours"
                type="text"
                {...register("sales_hours", {
                  required: "Required",
                })}
              />
              {errors.sales_hours && (
                <p className="text-danger">{errors.sales_hours.message}</p>
              )}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="form_boxes">
              <label htmlFor="ProfileCountryId">Country</label>
              <select
                className="form-select"
                defaultValue={""}
                {...register("country_id", { required: "Required" })}
                id="reg-country-id"
              >
                <option value="" disabled>
                  select
                </option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
              {errors.country_id && (
                <p className="text-danger">{errors.country_id.message}</p>
              )}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form_boxes">
              <label>Address</label>
              <textarea
                style={{ minHeight: "100px" }}
                {...register("address", {
                  required: "Required",
                })}
              />
              {errors.address && (
                <p className="text-danger">{errors.address.message}</p>
              )}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form_boxes">
              <label>BIO</label>
              <textarea
                style={{ minHeight: "100px", overflowY: "auto" }}
                {...register("bio", {
                  required: "Required",
                })}
              />
              {errors.bio && (
                <p className="text-danger">{errors.bio.message}</p>
              )}
            </div>
          </div>
          <div className="form-submit">
            <button
              type="submit"
              disabled={isSubmitting}
              title="Save Profile"
              className="theme-btn me-3"
            >
              Save Profile
              <Image
                alt="Save Profile"
                src={"/images/arrow.svg"}
                width={14}
                height={14}
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
