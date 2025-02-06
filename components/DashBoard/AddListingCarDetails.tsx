import { AdStates } from "@/app/store/ad-states";
import { Models } from "@/app/store/allModels";
import { Trims } from "@/app/store/allTirms";
import { Bodies } from "@/app/store/bodies";
import { Country } from "@/app/store/countries";
import { Features } from "@/app/store/features";
import { FuelTypes } from "@/app/store/fuel-types";
import { MakesCars } from "@/app/store/makeCars";
import { Transmissions } from "@/app/store/transmissions";
import { Years } from "@/app/store/years";
import { baseUrl } from "@/app/utils/mainData";
import axios from "axios";
import { useEffect, useState } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { IFormInput } from "./AddListing";
import { InputField, SelectField } from "./CustomFields";

interface CITY {
  id: number | string;
  name: string;
  code: string;
  country_id: number;
  country: string;
}
interface store {
  condition?: string[];
  makesCars?: MakesCars[];
  models?: Models[];
  trims?: Trims[];
  countries?: Country[];
  bodies?: Bodies[];
  transmissions?: Transmissions[];
  years?: Years[];
  fuelTypes?: FuelTypes[];
  features?: Features;
  adStates?: AdStates[];
}
export interface TabProps {
  tab: string;
  handleTabChange?: (tabId: string) => void;
  register: UseFormRegister<IFormInput>;
  errors: FieldErrors<IFormInput>;
  watch?: UseFormWatch<IFormInput>;
  setValue?: UseFormSetValue<IFormInput>;
  isSubmitting?: boolean;
  store?: store;
}

export default function AddListingCarDetails({ tab, handleTabChange, register, errors, watch, store }: TabProps) {
  const [currCities, setCurrCities] = useState<CITY[]>([]);
  const country_id: string = watch ? (watch("country_id") ? `${watch("country_id")}` : "") : "";
  const getCurrCitiesInsideChosenCountry = async () => {
    if (country_id) {
      const toastId = toast.loading("Loading...");
      const data: { country_id: string } = {
        country_id: country_id,
      };
      try {
        const res = await axios.post(`${baseUrl}/get-cities?t=${new Date().getTime()}`, data, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        setCurrCities(res?.data?.data);
        toast.update(toastId, {
          render: res?.data?.message || "Success! Cities loaded.",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.update(toastId, {
            render: error.response?.data?.message || "Error loading Cities!",
            type: "error",
            isLoading: false,
            autoClose: 1500,
          });
        }
      }
    }
  };

  useEffect(() => {
    if (country_id) {
      getCurrCitiesInsideChosenCountry();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country_id]);

  return (
    <div className={`tab-pane fade ${tab === "car_details" ? "show active" : ""}`} id="car_details" role="tabpanel" aria-labelledby="car_details_tab">
      <div className="row">
        <div className="form-column col-lg-3">
          <InputField label="Name" name="name" register={register} errors={errors} type="text" placeholder="Enter Name" />
        </div>
        <div className="form-column col-lg-3">
          <div className="form_boxes">
            <label htmlFor="condition">Condition</label>
            <select className="form-select" {...register("condition", { required: "Required" })} id="condition" defaultValue={""}>
              <option value="" disabled>
                select
              </option>
              {store?.condition?.map((cond, index) => (
                <option key={index} value={cond}>
                  {cond}
                </option>
              ))}
            </select>
            {errors.condition && <p className="text-danger">{errors.condition.message}</p>}
          </div>
        </div>
        <div className="form-column col-lg-3">
          <SelectField label="Body" name="body_id" register={register} errors={errors} options={store?.bodies || []} />
        </div>
        <div className="form-column col-lg-3">
          <SelectField label="Make" name="make_id" register={register} errors={errors} options={store?.makesCars || []} />
        </div>
        <div className="form-column col-lg-3">
          <SelectField label="Model" name="model_id" register={register} errors={errors} options={store?.models || []} />
        </div>
        <div className="form-column col-lg-3">
          <SelectField label="Trim" name="trim_id" register={register} errors={errors} options={store?.trims || []} />
        </div>
        <div className="form-column col-lg-3">
          <SelectField label="Transmission" name="transmission_id" register={register} errors={errors} options={store?.transmissions || []} />
        </div>
        <div className="form-column col-lg-3">
          <SelectField label="Year" name="year_id" register={register} errors={errors} options={store?.years || []} />
        </div>
        <div className="form-column col-lg-3">
          <InputField label="Mileage" name="mileage" register={register} errors={errors} type="number" placeholder="Enter Mileage" />
        </div>
        <div className="form-column col-lg-3">
          <InputField label="Exterior" name="exterior" register={register} errors={errors} type="text" placeholder="Enter Exterior" />
        </div>
        <div className="form-column col-lg-3">
          <InputField label="Interior" name="interior" register={register} errors={errors} type="text" placeholder="Enter Interior" />
        </div>
        <div className="form-column col-lg-3">
          <SelectField label="Country" name="country_id" register={register} errors={errors} options={store?.countries || []} />
        </div>
        <div className="form-column col-lg-3">
          <SelectField label="City" name="city_id" register={register} errors={errors} options={currCities || []} />
        </div>
        <div className="form-column col-lg-3">
          <SelectField label="Fuel Type" name="fuel_type_id" register={register} errors={errors} options={store?.fuelTypes || []} />
        </div>
        <div className="form-column col-lg-3">
          <InputField label="Engine Size" name="engine_size" register={register} errors={errors} type="text" placeholder="Enter Engine Size" />
        </div>
        <div className="form-column col-lg-3">
          <InputField label="Drive Type" name="drive" register={register} errors={errors} type="text" placeholder="Enter Drive Type" />
        </div>
        <div className="form-column col-lg-3">
          <InputField label="VIN" name="VIN" register={register} errors={errors} type="text" placeholder="Enter VIN" />
        </div>
        <div className="form-column col-lg-3">
          <InputField label="History" name="history" register={register} errors={errors} type="text" placeholder="Enter History" />
        </div>
        <div className="form-column col-lg-3">
          <SelectField label="Address State" name="ad_state_id" register={register} errors={errors} options={store?.adStates || []} />
        </div>

        <div className="form-column col-lg-12">
          <div className="form_boxes v2">
            <label>Listing Description</label>
            <div className="drop-menu">
              <textarea {...register("description", { required: "Required" })} placeholder="Lorem Ipsum Dolar Sit Amet" defaultValue={""} />
              {errors.description && <p className="text-danger">{errors.description.message}</p>}
            </div>
          </div>
        </div>

        <div className="col-lg-12">
          <div className="form-submit">
            <button type="button" onClick={() => handleTabChange && handleTabChange("price")} className="theme-btn">
              Next Price
              <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 14 14" fill="none">
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
