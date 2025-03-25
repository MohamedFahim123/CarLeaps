"use client";

import { Models } from "@/app/store/allModels";
import { useCitiesStore } from "@/app/store/Cities";
import { useMakesCarsStore } from "@/app/store/makeCars";
import { useTokenStore } from "@/app/store/Token";
import { useYearsStore } from "@/app/store/years";
import { baseUrl } from "@/app/utils/mainData";
import axios from "axios";
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
}

const FindCarForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    watch,
    reset,
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

  const onSubmit: SubmitHandler<FormIDefaultValues> = async (data) => {
    const toastId = toast.loading("Loading...");
    try {
      const res = await axios.post(`${baseUrl}/find-car`, data, {
        headers: {
          "Content-Type": "application/json",
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
      reset()
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

export default React.memo(FindCarForm);
