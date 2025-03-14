"use client";
import { useBodiesStore } from "@/app/store/bodies";
import { useCitiesStore } from "@/app/store/Cities";
import { useInterestsStore } from "@/app/store/Interest";
import { baseUrl, MainRegionName } from "@/app/utils/mainData";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useCallback, useEffect, useState } from "react";

interface CarModel {
  cover: string;
  end_price: string;
  gallery: {
    id: number;
    model_id: number;
    model: string;
    image: string;
  }[];
  image: string;
  make: string;
  make_id: number;
  name: string;
  specifications: string[];
  start_price: string;
  status: string;
}

let currentPage: number = 1;
let totalPage: number = 1;
let ErrorMessage: string = "";

export default function ShopList() {
  const { bodies } = useBodiesStore();
  const region: string = Cookies.get("region") || MainRegionName;
  const { interests, interestsLoading, getInterests } = useInterestsStore();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedBody, setSelectedBody] = useState<string>("");
  const [price, setPrice] = useState<number[]>([0, 50000]);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [currentCars, setCurrentCars] = useState<CarModel[]>([]);
  const [carLoading, setCarLoading] = useState<boolean>(false);
  const { cities } = useCitiesStore();
  const currentCurrency =
    cities.find((city) => city.code === region)?.currency || "";

  const getAllInterests = useCallback(() => {
    if (interests.length === 0 && !interestsLoading) {
      getInterests();
    }
  }, [interests.length, interestsLoading, getInterests]);

  useEffect(() => {
    getAllInterests();
  }, [getAllInterests]);

  const handleInterestChange = (interestId: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interestId)
        ? prev.filter((id) => id !== interestId)
        : [...prev, interestId]
    );
    debounce(handleSubmit, 500);
  };

  const handlePriceChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setPrice(value);
      debounce(handleSubmit, 500);
    }
  };

  const debounce = (callback: () => void, delay: number) => {
    if (debounceTimeout) clearTimeout(debounceTimeout);
    const newTimeout = setTimeout(callback, delay);
    setDebounceTimeout(newTimeout);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBody(e.target.value);
    debounce(handleSubmit, 500);
  };

  const handleReset = () => {
    setSelectedInterests([]);
    setSelectedBody("");
    setPrice([0, 50000]);
  };

  const handleSubmit = useCallback(async () => {
    const formData: Record<string, unknown> = {};

    if (selectedInterests.length > 0) {
      formData.interests = selectedInterests;
    }

    if (selectedBody) {
      formData.body = [selectedBody];
    }

    if (price && price.length === 2) {
      formData.minPrice = price[0];
      formData.maxPrice = price[1];
    }

    if (debounceTimeout) clearTimeout(debounceTimeout);

    if (Object.keys(formData).length > 0) {
      ErrorMessage = "";
      setCarLoading(true);
      try {
        const res = await axios.post(
          `${baseUrl}/cars/perfect/match/search`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              code: region,
            },
          }
        );

        if (res.status === 200) {
          setCurrentCars(res.data.data.models);
          setCarLoading(false);
          if (res.data.data.current_page)
            currentPage = res.data.data.current_page;
          if (res.data.data.last_page) totalPage = res.data.data.last_page;
          console.log(res);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          ErrorMessage = error.response?.data.message;
          setCarLoading(false);
        }
      }
    }
  }, [debounceTimeout, region, selectedInterests, selectedBody, price]);

  useEffect(() => {
    if (selectedInterests.length > 0 || selectedBody || price.length > 0) {
      handleSubmit();
    }
  }, [handleSubmit, price.length, selectedBody, selectedInterests.length]);

  return (
    <section className={`cars-section-fourteen layout-radius`}>
      <div className="boxcar-container">
        <div className="boxcar-title-three">
          <ul className="breadcrumb">
            <li>
              <Link href={`/`}>Home</Link>
            </li>
            <li>
              <span>Perfect Match</span>
            </li>
          </ul>
          <h2>Perfect Match Cars List</h2>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-12 col-sm-12">
            <div className="side-bar">
              <div className="categories-box">
                <h6 className="title">Interests</h6>
                <div className="cheak-box">
                  {interests?.map((interest) => (
                    <label className="contain" key={interest?.id}>
                      {interest?.name}
                      <input
                        type="checkbox"
                        value={interest?.id}
                        checked={selectedInterests.includes(`${interest?.id}`)}
                        onChange={() => handleInterestChange(`${interest?.id}`)}
                      />
                      <span className="checkmark" />
                    </label>
                  ))}
                </div>
              </div>
              <div className="form_boxes accordion-flush p-3 border-1 border-bottom">
                <label htmlFor="SearchBody">Body Type</label>
                <select
                  className="form-select"
                  value={selectedBody}
                  onChange={handleBodyChange}
                  id="SearchBody"
                >
                  <option value="" disabled>
                    Select Body
                  </option>
                  {bodies.map((body) => (
                    <option key={body.id} value={body.id}>
                      {body.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="price-box">
                <h6 className="title">Price</h6>
                <form onSubmit={(e) => e.preventDefault()} className="row g-0">
                  <div className="form-column col-lg-6">
                    <div className="form_boxes">
                      <label>Min price</label>
                      <div className="drop-menu">
                        {currentCurrency} {price[0]}
                      </div>
                    </div>
                  </div>
                  <div className="form-column v2 col-lg-6">
                    <div className="form_boxes">
                      <label>Max price</label>
                      <div className="drop-menu">
                        {currentCurrency} {price[1]}
                      </div>
                    </div>
                  </div>
                </form>
                <div className="widget-price">
                  <Slider
                    range
                    max={50000}
                    min={0}
                    value={price}
                    onChange={handlePriceChange}
                    id="slider"
                  />
                </div>
                <button
                  style={{ backgroundColor: "var(--theme-color1)" }}
                  type="button"
                  className="btn px-5 text-white py-2 fs-5 mb-4 w-100"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
          <div className="content-column col-lg-9 col-md-12 col-sm-12">
            <div className="inner-column">
              <div className="row">
                {ErrorMessage && <p className="text-danger">{ErrorMessage}</p>}
                {carLoading ? (
                  <div className="fs-4 fw-bold">Loading....</div>
                ) : (
                  currentCars?.map((product, index) => (
                    <div
                      key={index}
                      className="car-block-fourteen col-lg-4 col-md-6 col-sm-6"
                    >
                      <div className="inner-box">
                        <div className="image-box">
                          <figure className="image">
                            <Image
                              alt={product.name}
                              src={product.cover}
                              width={186}
                              height={186}
                            />
                          </figure>
                        </div>
                        <div className="content-box">
                          <div className="text">{product.name}</div>
                          <h6 className="title">
                            {currentCurrency} {product.end_price}
                          </h6>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="pagination-sec">
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li>
                      {currentPage} | {totalPage}
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
