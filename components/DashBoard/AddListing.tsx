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
import { useTransmissionsStore } from "@/app/store/transmissions";
import { useYearsStore } from "@/app/store/years";
import { baseUrl } from "@/app/utils/mainData";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AddListingCarDetails from "./AddListingCarDetails";
import AddListingFeatures from "./AddListingFeatures";
import AddListingLocation from "./AddListingLocation";
import AddListingMedia from "./AddListingMedia";
import AddListingPrice from "./AddListingPrice";
import Sidebar from "./Sidebar";

export type IFormInput = {
  name?: string;
  condition?: string[];
  body_id?: number;
  make_id?: number;
  model_id?: number;
  trim_id?: number;
  transmission_id?: number;
  year_id?: number;
  city_id?: number;
  mileage?: string;
  exterior?: string;
  interior?: string;
  country_id?: string;
  description?: string;
  price?: number;
  office_price?: number;
  fuel_type_id?: number;
  engine_size?: number;
  history?: number;
  VIN?: string;
  drive?: string;
  register?: string;
  ad_state_id?: number;
  comfort?: string[];
  seats?: string[];
  safty?: string[];
  entertainment?: string[];
  main_image?: File;
  images?: File[];
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

  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    const toastId = toast.loading("Submitting...");
    console.log(data);

    try {
      const token = await axios.get("/api/get-token");
      console.log(token);

      const response = await axios.post(`${baseUrl}/dealer/store-car`, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token?.data?.token}`,
        },
      });

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
              <div className="text">Lorem ipsum dolor sit amet, consectetur.</div>
            </div>
            <div className="form-box">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button className={`nav-link ${activeTab === "car_details" ? "active" : ""}`} id="car_details_tab" type="button" onClick={() => handleTabChange("car_details")}>
                    Car Details
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className={`nav-link ${activeTab === "price" ? "active" : ""}`} id="price_tab" type="button" onClick={() => handleTabChange("price")}>
                    Price
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className={`nav-link ${activeTab === "features" ? "active" : ""}`} id="features_tab" type="button" onClick={() => handleTabChange("features")}>
                    Features
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className={`nav-link ${activeTab === "media" ? "active" : ""}`} id="media_tab" type="button" onClick={() => handleTabChange("media")}>
                    Media
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className={`nav-link ${activeTab === "location" ? "active" : ""}`} id="location_tab" type="button" onClick={() => handleTabChange("location")}>
                    Location
                  </button>
                </li>
              </ul>
              <form onSubmit={handleSubmit(onSubmit)} className="tab-content" id="myTabContent">
                <AddListingCarDetails register={register} watch={watch} errors={errors} store={{ makesCars, models, trims, countries, condition, bodies, transmissions, years, fuelTypes, adStates }} tab={activeTab} handleTabChange={handleTabChange} />
                <AddListingPrice register={register} errors={errors} tab={activeTab} handleTabChange={handleTabChange} />
                <AddListingFeatures register={register} errors={errors} store={{ features }} tab={activeTab} handleTabChange={handleTabChange} />
                <AddListingMedia register={register} errors={errors} setValue={setValue} watch={watch} tab={activeTab} handleTabChange={handleTabChange} />
                <AddListingLocation isSubmitting={isSubmitting} register={register} errors={errors} tab={activeTab} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
