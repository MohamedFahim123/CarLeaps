"use client";
import { useAdStatesStore } from "@/app/store/ad-states";
import { useModelsStore } from "@/app/store/allModels";
import { useTrimsStore } from "@/app/store/allTirms";
import { useBodiesStore } from "@/app/store/bodies";
import { useConditionStore } from "@/app/store/conditions";
import { useCountriesStore } from "@/app/store/countries";
import { useFeaturesStore } from "@/app/store/features";
import { useFuelTypesStore } from "@/app/store/fuel-types";
import { useMakesCarsStore } from "@/app/store/makeCars";
import { useTokenStore } from "@/app/store/Token";
import { useTransmissionsStore } from "@/app/store/transmissions";
import { useYearsStore } from "@/app/store/years";
import { baseUrl } from "@/app/utils/mainData";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AddListingCarDetails from "./AddListingCarDetails";
import AddListingFeatures from "./AddListingFeatures";
import AddListingMedia from "./AddListingMedia";
import AddListingPrice from "./AddListingPrice";
import Sidebar from "./Sidebar";

export type IFormInput = {
  condition?: string[];
  body_id?: string;
  make_id?: string;
  model_id?: string;
  trim_id?: string;
  transmission_id?: number;
  year_id?: string;
  price?: number;
  fuel_type_id?: string;
  mileage?: string;
  exterior?: string;
  interior?: string;
  country_id?: string;
  city_id?: string;
  description?: string;
  main_image?: File;
  comfort?: string[];
  entertainment?: string[];
  safty?: string[];
  seats?: string[];
  image?: File[];
  video_link?: string;
  drive?: string;
  vin?: string;
  engine?: number;
  office_price?: number;
  stock_id?: string;
  history?: File;
  ad_state_id?: string;
};
export default function AddListing() {
  const [activeTab, setActiveTab] = useState<string>("car_details");
  const { makesCars } = useMakesCarsStore();
  const { models } = useModelsStore();
  const { trims } = useTrimsStore();
  const { countries } = useCountriesStore();
  const { condition } = useConditionStore();
  const { bodies } = useBodiesStore();
  const { transmissions } = useTransmissionsStore();
  const { years } = useYearsStore();
  const { fuelTypes } = useFuelTypesStore();
  const { features } = useFeaturesStore();
  const { adStates } = useAdStatesStore();
  const { token } = useTokenStore();
  console.log(token);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    const toastId = toast.loading("Submitting...");

    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        const value = data[key as keyof IFormInput];

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

      const response = await axios.post(
        `${baseUrl}/dealer/store-car`,
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
      toast.success(response?.data?.message || "Adding Successful!", {
        autoClose: 1500,
      });
    } catch (error) {
      toast.dismiss(toastId);

      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data;
        console.log("error", error);

        if (errorResponse?.errors) {
          let firstErrorMessage = "";

          Object.keys(errorResponse.errors).forEach((field, index) => {
            const message = errorResponse.errors[field][0];

            if (index === 0) {
              firstErrorMessage = message;
            }

            setError(field as keyof IFormInput, {
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
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <section className="dashboard-widget">
      <div className="right-box">
        <Sidebar />
        <div className="content-column">
          <div className="inner-column">
            <div className="list-title">
              <h3 className="title">Add Listings</h3>
              <div className="text">
                Lorem ipsum dolor sit amet, consectetur.
              </div>
            </div>
            <div className="form-box">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                      activeTab === "car_details" ? "active" : ""
                    }`}
                    id="car_details_tab"
                    type="button"
                    onClick={() => handleTabChange("car_details")}
                  >
                    Car Details
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                      activeTab === "price" ? "active" : ""
                    }`}
                    id="price_tab"
                    type="button"
                    onClick={() => handleTabChange("price")}
                  >
                    Price
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                      activeTab === "features" ? "active" : ""
                    }`}
                    id="features_tab"
                    type="button"
                    onClick={() => handleTabChange("features")}
                  >
                    Features
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                      activeTab === "media" ? "active" : ""
                    }`}
                    id="media_tab"
                    type="button"
                    onClick={() => handleTabChange("media")}
                  >
                    Media
                  </button>
                </li>
              </ul>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="tab-content"
                id="myTabContent"
              >
                <AddListingCarDetails
                  register={register}
                  clearErrors={clearErrors}
                  watch={watch}
                  errors={errors}
                  setValue={setValue}
                  store={{
                    makesCars,
                    models,
                    trims,
                    countries,
                    condition,
                    bodies,
                    transmissions,
                    years,
                    fuelTypes,
                    adStates,
                  }}
                  tab={activeTab}
                  handleTabChange={handleTabChange}
                />
                <AddListingPrice
                  register={register}
                  errors={errors}
                  tab={activeTab}
                  handleTabChange={handleTabChange}
                />
                <AddListingFeatures
                  register={register}
                  errors={errors}
                  store={{ features }}
                  tab={activeTab}
                  handleTabChange={handleTabChange}
                />
                <AddListingMedia
                  register={register}
                  clearErrors={clearErrors}
                  errors={errors}
                  setValue={setValue}
                  watch={watch}
                  tab={activeTab}
                  isSubmitting={isSubmitting}
                  handleTabChange={handleTabChange}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
