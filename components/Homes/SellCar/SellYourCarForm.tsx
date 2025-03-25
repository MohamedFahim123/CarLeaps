"use client";

import { Models } from "@/app/store/allModels";
import { useCitiesStore } from "@/app/store/Cities";
import { useMakesCarsStore } from "@/app/store/makeCars";
import { useTokenStore } from "@/app/store/Token";
import { useYearsStore } from "@/app/store/years";
import { baseUrl } from "@/app/utils/mainData";
import axios from "axios";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface FormIDefaultValues {
  name: string;
  email: string;
  phone: string;
  condition: string;
  make_id: string;
  model_id: string;
  year_id: string;
  city_id: string;
  image: File[];
  history?: File;
}

const SellYourCarForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<FormIDefaultValues>();

  const { makesCars, makesCarsLoading, getMakesCars } = useMakesCarsStore();
  const { years, yearsLoading, getYears } = useYearsStore();
  const { token } = useTokenStore();

  const getAllYears = useCallback(() => {
    if (years.length === 0 && !yearsLoading) {
      getYears();
    }
  }, [getYears, yearsLoading, years.length]);

  const getAllMakes = useCallback(() => {
    if (makesCars.length === 0 && !makesCarsLoading) {
      getMakesCars();
    }
  }, [getMakesCars, makesCarsLoading, makesCars.length]);

  useEffect(() => {
    getAllMakes();
    getAllYears();
  }, [getAllMakes, getAllYears]);

  const conditions = ["excellent", "good", "fair", "poor"];
  const { cities } = useCitiesStore();
  const [models, setModels] = useState<Models[]>([]);

  const handleGetCurrModels = useCallback(
    async (make_id: string) => {
      setValue("model_id", "");
      if (make_id) {
        const toastId = toast.loading("Loading models...");
        try {
          const res = await axios.post(
            `${baseUrl}/get-model`,
            {
              make_id: make_id,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          );

          if (res.status === 200) {
            setModels(res?.data?.data);
            toast.update(toastId, {
              render: res.data.message,
              type: "success",
              isLoading: false,
              autoClose: 5000,
            });
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            toast.update(toastId, {
              render: error.response?.data.message,
              type: "error",
              isLoading: false,
              autoClose: 5000,
            });
          }
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  useEffect(() => {
    if (watch("make_id")) {
      handleGetCurrModels(watch("make_id"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("make_id")]);

  const [images, setImages] = useState<string[]>([]);
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file: File | null = e?.target?.files?.[0] ? e.target.files[0] : null;

    if (!file) return;

    const currentImages = watch("image") ?? [];

    setValue("image", [...currentImages, file]);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImages((prevImages) => {
        const newImages = [...prevImages];
        newImages[index] = file.name as string;
        return newImages;
      });
    };

    reader.readAsDataURL(file);
  };
  const handleDelete = (index: number) => {
    setImages((prevImages) => {
      const updatedImages = prevImages.filter(
        (_, imgIndex) => imgIndex !== index
      );

      const currentImages = watch("image") ?? [];
      const updatedFormImages = currentImages.filter(
        (_, imgIndex) => imgIndex !== index
      );
      setValue("image", updatedFormImages);

      return updatedImages;
    });
  };

  const [images2, setImages2] = useState<string>("");
  const handleImageChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    setValue("history", file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages2(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDelete2 = () => {
    setImages2("");
  };

  useEffect(() => {
    if (watch("history") && errors.history) {
      clearErrors("history");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("history"), errors.history]);

  const onSubmit: SubmitHandler<FormIDefaultValues> = async (data) => {
    const toastId = toast.loading("Loading...");
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      const value = data[key as keyof FormIDefaultValues];

      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(`${key}[]`, item));
      } else if (value instanceof FileList) {
        Array.from(value).forEach((file) => formData.append(key, file));
      } else if (value instanceof File) {
        formData.append(key, value);
      } else if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });
    try {
      const res = await axios.post(`${baseUrl}/sell-car`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.update(toastId, {
        render: res.data.message,
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } catch (error) {
      toast.dismiss(toastId);

      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data;

        if (errorResponse?.errors) {
          let firstErrorMessage = "";

          Object.keys(errorResponse.errors).forEach((field, index) => {
            const message = errorResponse.errors[field][0];

            if (index === 0) {
              firstErrorMessage = message;
            }

            setError(field as keyof FormIDefaultValues, {
              type: "server",
              message,
            });
          });

          toast.error(firstErrorMessage || "Adding failed!", {
            autoClose: 1500,
          });
        } else {
          toast.error(errorResponse?.message || "Adding Failed!", {
            autoClose: 1500,
          });
        }
      } else {
        toast.error("An unexpected error occurred!", { autoClose: 1500 });
      }
    }
  };

  return (
    <div className="form-box">
      <form onSubmit={handleSubmit(onSubmit)} className="row mt-5">
        <div className="col-md-6">
          <div className="form_boxes">
            <label htmlFor="sellCarName">Name</label>
            <input
              {...register("name", { required: "Required" })}
              type="name"
              id="sellCarName"
              placeholder="Creativelayer088"
            />
            {errors.name && (
              <span className="text-danger text-sm error">
                {errors.name.message}
              </span>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="form_boxes">
            <label htmlFor="sellCarEmail">Your Email</label>
            <input
              {...register("email", { required: "Required" })}
              type="email"
              id="sellCarEmail"
              placeholder="user@example.com"
            />
            {errors.email && (
              <span className="text-danger text-sm error">
                {errors.email.message}
              </span>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="form_boxes">
            <label htmlFor="sellCarPhone">Phone Number</label>
            <input
              {...register("phone", { required: "Required" })}
              type="phone"
              id="sellCarPhone"
              placeholder="01099999999"
            />
            {errors.phone && (
              <span className="text-danger text-sm error">
                {errors.phone.message}
              </span>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="form_boxes">
            <label htmlFor="sellCarCondition">Condition</label>
            <select
              className="form-select"
              defaultValue={""}
              {...register("condition", { required: "Required" })}
              id="sellCarCondition"
            >
              <option value="" disabled>
                select condition
              </option>
              {conditions?.map((condition) => (
                <option key={condition} value={condition}>
                  {condition}
                </option>
              ))}
            </select>
            {errors.condition && (
              <div className="text-danger text-small">
                {errors.condition.message}
              </div>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="form_boxes">
            <label htmlFor="sellCarMake">Car Make</label>
            <select
              className="form-select"
              defaultValue={""}
              {...register("make_id", { required: "Required" })}
              id="sellCarMake"
            >
              <option value="" disabled>
                select Make
              </option>
              {makesCars?.map((make) => (
                <option key={make.id} value={make.id}>
                  {make.name}
                </option>
              ))}
            </select>
            {errors.make_id && (
              <div className="text-danger text-small">
                {errors.make_id.message}
              </div>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="form_boxes">
            <label htmlFor="sellCarModel">Car Model</label>
            <select
              className="form-select"
              defaultValue={watch("model_id")}
              {...register("model_id", { required: "Required" })}
              id="sellCarModel"
            >
              <option value="" disabled>
                select Model
              </option>
              {models?.map((modle) => (
                <option key={modle.id} value={modle.id}>
                  {modle.name}
                </option>
              ))}
            </select>
            {errors.model_id && (
              <div className="text-danger text-small">
                {errors.model_id.message}
              </div>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="form_boxes">
            <label htmlFor="sellCarYear">Car Year</label>
            <select
              className="form-select"
              defaultValue={""}
              {...register("year_id", { required: "Required" })}
              id="sellCarYear"
            >
              <option value="" disabled>
                select Year
              </option>
              {years?.map((year) => (
                <option key={year.id} value={year.id}>
                  {year.name}
                </option>
              ))}
            </select>
            {errors.year_id && (
              <div className="text-danger text-small">
                {errors.year_id.message}
              </div>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="form_boxes">
            <label htmlFor="sellCarCity">City</label>
            <select
              className="form-select"
              defaultValue={""}
              {...register("city_id", { required: "Required" })}
              id="sellCarCity"
            >
              <option value="" disabled>
                select city
              </option>
              {cities?.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
            {errors.city_id && (
              <div className="text-danger text-small">
                {errors.city_id.message}
              </div>
            )}
          </div>
        </div>
        <div className="form-column col-lg-12 tab-pane gallery-sec px-4 mx-1">
          <div className="attachment-sec">
            <h6 className="title">Gallery</h6>
            {errors.image && (
              <span className="text-danger">{errors.image.message}</span>
            )}
            <div className="right-box-four row gap-2">
              {images.map((imgSrc, index) => (
                <div
                  key={index}
                  className="report-box col-lg-3 col-md-6 col-sm-12"
                >
                  <span>{imgSrc.slice(0, 15) + "..."}</span>
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
                      <label
                        style={{ cursor: "pointer" }}
                        htmlFor={`addListing-image-upload-${index}`}
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
                        id={`addListing-image-upload-${index}`}
                        type="file"
                        onChange={(e) => handleImageChange(e, index)}
                        style={{ display: "none" }}
                      />
                    </li>
                  </ul>
                </div>
              ))}
              <div className="uplode-box col-lg-3 col-md-6 col-sm-12">
                <div className="content-box">
                  <label
                    style={{ cursor: "pointer" }}
                    htmlFor="addListing-image-upload-new2"
                  >
                    <Image
                      width={34}
                      height={34}
                      src="/images/resource/uplode.svg"
                      alt="Upload"
                    />
                    <span>Upload</span>
                  </label>
                  <input
                    id="addListing-image-upload-new2"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => handleImageChange(e, images.length)}
                  />
                </div>
              </div>
            </div>
            <div className="text">
              Max file size is 1MB, Minimum dimension: 330x300 And Suitable
              files are .jpg &amp; .png
            </div>
          </div>
          <div className="attachment-sec">
            <h6 className="title fw-semibold">
              Car History <small className="fs-6">(optional)</small>
            </h6>
            {errors.history && (
              <span className="text-danger">{errors.history.message}</span>
            )}
            <div className="right-box-four row gap-2">
              {images2 && (
                <div className="report-box col-lg-3 col-md-6 col-sm-12">
                  <span>{images2.slice(0, 15) + "..."}</span>
                  <ul className="social-icon">
                    <li>
                      <a onClick={() => handleDelete2()}>
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
                        htmlFor={`addListing-history-upload2`}
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
                        id={`addListing-history-upload2`}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleImageChange2(e)}
                        style={{ display: "none" }}
                      />
                    </li>
                  </ul>
                </div>
              )}
              <div className="uplode-box col-lg-3 col-md-6 col-sm-12">
                <div className="content-box">
                  <label
                    style={{ cursor: "pointer" }}
                    htmlFor="addListing-history-new-upload2"
                  >
                    <Image
                      width={34}
                      height={34}
                      src="/images/resource/uplode.svg"
                      alt="Upload"
                    />
                    <span>Upload</span>
                  </label>
                  <input
                    id="addListing-history-new-upload2"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => handleImageChange2(e)}
                  />
                </div>
              </div>
            </div>
            <div className="text">
              Max file size is 5MB,only docs files (pdf,doc,docx)
            </div>
          </div>
        </div>
        <div className="col-12 my-3">
          <button
            type="submit"
            disabled={isSubmitting}
            title="Submit"
            className="btn theme-btn-web px-5"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default React.memo(SellYourCarForm);
