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
import Image from "next/image";
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

export default function AddListingCarDetails({ tab, handleTabChange, setValue, register, errors, watch, store }: TabProps) {
  const [images2, setImages2] = useState<string[]>([]);
  const [currCities, setCurrCities] = useState<CITY[]>([]);
  const [currModel, setCurrModel] = useState<Models[]>([]);
  const [currTrims, setCurrTrims] = useState<Trims[]>([]);
  const country_id: string = watch ? (watch("country_id") ? `${watch("country_id")}` : "") : "";
  const make_id: string = watch ? (watch("make_id") ? `${watch("make_id")}` : "") : "";
  const model_id: string = watch ? (watch("model_id") ? `${watch("model_id")}` : "") : "";
  const getCurrCitiesInsideChosenCountry = async () => {
    if (country_id) {
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
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error?.response?.data?.message || "City Not Found");
        }
      }
    }
  };

  const getModelByMake = async () => {
    if (make_id) {
      const data: { make_id: string } = {
        make_id: make_id,
      };

      try {
        const res = await axios.post(`${baseUrl}/get-model?t=${new Date().getTime()}`, data, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        setCurrModel(res?.data?.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error("Model Not Found");
        }
      }
    }
  };

  const getTrimsByModel = async () => {
    if (model_id) {
      const data: { model_id: string } = {
        model_id: model_id,
      };

      try {
        const res = await axios.post(`${baseUrl}/get-trim?t=${new Date().getTime()}`, data, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        setCurrTrims(res?.data?.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error("Trim Not Found");
        }
      }
    }
  };

  const handleImageChange2 = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
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
      const updatedImages = prevImages.filter((_, imgIndex) => imgIndex !== index);

      // Update form state
      if (setValue) {
        const currentImages = (watch && watch("images")) ?? [];
        const updatedFormImages = currentImages.filter((_, imgIndex) => imgIndex !== index);
        setValue("images", updatedFormImages);
      }

      return updatedImages;
    });
  };

  useEffect(() => {
    if (country_id) {
      getCurrCitiesInsideChosenCountry();
    }
    if (make_id) {
      getModelByMake();
    }
    if (model_id) {
      getTrimsByModel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country_id, make_id, model_id]);

  return (
    <div className={`tab-pane fade ${tab === "car_details" ? "show active" : ""}`} id="car_details" role="tabpanel" aria-labelledby="car_details_tab">
      <div className="row">
        <div className="form-column col-lg-4 col-md-6">
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
        <div className="form-column col-lg-4 col-md-6">
          <SelectField label="Body" name="body_id" register={register} errors={errors} options={store?.bodies || []} />
        </div>
        <div className="form-column col-lg-4 col-md-6">
          <SelectField label="Make" name="make_id" register={register} errors={errors} options={store?.makesCars || []} />
        </div>
        <div className="form-column col-lg-4 col-md-6">
          <SelectField label="Model" select="Should be selected after make" name="model_id" register={register} errors={errors} options={currModel || []} />
        </div>
        <div className="form-column col-lg-4 col-md-6">
          <SelectField label="Trim" select="Should be selected after model" name="trim_id" register={register} errors={errors} options={currTrims || []} />
        </div>
        <div className="form-column col-lg-4 col-md-6">
          <SelectField label="Transmission" name="transmission_id" register={register} errors={errors} options={store?.transmissions || []} />
        </div>
        <div className="form-column col-lg-4 col-md-6">
          <SelectField label="Year" name="year_id" register={register} errors={errors} options={store?.years || []} />
        </div>
        <div className="form-column col-lg-4 col-md-6">
          <InputField label="Mileage" name="mileage" register={register} errors={errors} type="number" placeholder="Enter Mileage" />
        </div>
        <div className="form-column col-lg-4 col-md-6">
          <InputField label="Exterior Color" name="exterior" register={register} errors={errors} type="text" placeholder="Enter Exterior" />
        </div>
        <div className="form-column col-lg-4 col-md-6">
          <InputField label="Interior Color" name="interior" register={register} errors={errors} type="text" placeholder="Enter Interior" />
        </div>
        <div className="form-column col-lg-4 col-md-6">
          <SelectField label="Country" name="country_id" register={register} errors={errors} options={store?.countries || []} />
        </div>
        <div className="form-column col-lg-4 col-md-6">
          <SelectField label="City" select="Should be selected after country" name="city_id" register={register} errors={errors} options={currCities || []} />
        </div>
        <div className="form-column col-lg-4 col-md-6">
          <SelectField label="Fuel Type" name="fuel_type_id" register={register} errors={errors} options={store?.fuelTypes || []} />
        </div>
        <div className="form-column col-lg-4 col-md-6">
          <InputField label="Engine Size" name="engine_size" register={register} errors={errors} type="text" placeholder="Enter Engine Size" />
        </div>
        <div className="form-column col-lg-4 col-md-6">
          <div className="form_boxes">
            <label htmlFor="Driver">Drive Type</label>
            <select className="form-select" id="Driver" defaultValue={""}>
              <option value="" disabled>
                select
              </option>
              <option value="New">AWD</option>
              <option value="Used">FWD</option>
            </select>
          </div>
          {/* <InputField label="Drive Type" name="drive" register={register} errors={errors} type="text" placeholder="Enter Drive Type" /> */}
        </div>
        <div className="form-column col-lg-4 col-md-6">
          <InputField label="VIN" name="VIN" register={register} errors={errors} type="text" placeholder="Enter VIN" />
        </div>
        <div className="form-column col-lg-12 tab-pane gallery-sec">
          <div className="attachment-sec">
            <h6 className="title">History</h6>
            {errors.images && <span className="text-danger">{errors.images.message}</span>}
            <div className="right-box-four row gap-2">
              {images2.map((imgSrc, index) => (
                <div key={index} className="report-box col-lg-3 col-md-6 col-sm-12">
                  <span>{imgSrc.slice(0, 15) + "..."}</span>
                  <ul className="social-icon">
                    <li>
                      <a onClick={() => handleDelete2(index)}>
                        <Image width={18} height={18} src="/images/resource/delet.svg" alt="" />
                      </a>
                    </li>
                    <li>
                      <label style={{ cursor: "pointer" }} htmlFor={`file-upload2-${index}`}>
                        <a>
                          <Image width={18} height={18} src="/images/resource/delet1-1.svg" alt="Upload" />
                        </a>
                      </label>
                      <input id={`file-upload2-${index}`} type="file" onChange={(e) => handleImageChange2(e, index)} style={{ display: "none" }} />
                    </li>
                  </ul>
                </div>
              ))}
              <div className="uplode-box col-lg-3 col-md-6 col-sm-12">
                <div className="content-box">
                  <label style={{ cursor: "pointer" }} htmlFor="upload-new2">
                    <Image width={34} height={34} src="/images/resource/uplode.svg" alt="Upload" />
                    <span>Upload</span>
                  </label>
                  <input id="upload-new2" type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleImageChange2(e, images2.length)} />
                </div>
              </div>
            </div>
            <div className="text">Max file size is 5MB,only docs files (pdf,doc,docx)</div>
          </div>
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
