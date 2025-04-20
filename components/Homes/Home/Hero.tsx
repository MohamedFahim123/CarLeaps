"use client";
import { useCarsForSaleStore } from "@/app/store/CarsForSale";
import { MainRegionName } from "@/app/utils/mainData";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import styles from "./heroStyles.module.css";
// const categories = ["All", "New", "Used"];

interface SearchFormInputs {
  condition: string;
  make: string;
  model: string;
}

export default function Hero() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SearchFormInputs>();
  const { makes, models, boodies } = useCarsForSaleStore();
  const router = useRouter();
  const currRegion: string = Cookies.get("region") || MainRegionName;

  const onSubmit = (data: SearchFormInputs) => {
    const newData = data.condition
      ? {
          ...data,
          condition: data?.condition?.toLowerCase(),
        }
      : { ...data };

    const filteredData = Object.fromEntries(
      Object.entries(newData).filter(([, value]) => value !== "")
    );

    const queryString = new URLSearchParams(filteredData).toString();

    router.push(
      `/${currRegion}/cars/cars-for-sale/search${
        queryString ? `?${queryString}` : ""
      }`
    );
  };

  // const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  return (
    <section className="boxcar-banner-section-v1">
      <div className="container">
        <div className="banner-content">
          <span className="wow fadeInUp">
            New and Used Cars for Sale in{" "}
            {currRegion ? currRegion : MainRegionName}
          </span>
          <h2 className="wow fadeInUp" data-wow-delay="100ms">
            Find Your Perfect Car
          </h2>
          <div className="form-tabs">
            {/* <ul className="form-tabs-list wow fadeInUp" data-wow-delay="200ms">
              {categories.map((category) => (
                <li
                  className={selectedCategory == category ? "current" : ""}
                  onClick={() => {
                    setSelectedCategory(category);
                    setValue("condition", category === "All" ? "" : category);
                  }}
                  key={category}
                >
                  {category}
                </li>
              ))}
            </ul> */}
            <div className="form-tab-content">
              <div
                className="form-tab-content wow fadeInUp"
                data-wow-delay="300ms"
              >
                <div className="form-tab-pane current" id="tab-1">
                  <form
                    className={`${styles.form_container}`}
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className={`${styles.form_boxes}`}>
                      <select
                        className="form-select w-100"
                        defaultValue={""}
                        {...register("make")}
                        id="searchMake"
                      >
                        <option value="" disabled>
                          Select Make
                        </option>
                        {makes.map((make) => (
                          <option key={make.id} value={make.id}>
                            {make.name}
                          </option>
                        ))}
                      </select>
                      {errors.make && (
                        <div className="text-danger text-small">
                          {errors.make.message}
                        </div>
                      )}
                    </div>
                    <div className={`${styles.form_boxes}`}>
                      <select
                        className="form-select w-100"
                        defaultValue={""}
                        {...register("model")}
                        id="searchModels"
                      >
                        <option value="" disabled>
                          Select Model
                        </option>
                        {models?.map((model: { id: number; name: string }) => (
                          <option key={model.id} value={model.id}>
                            {model.name}
                          </option>
                        ))}
                      </select>
                      {errors.model && (
                        <div className="text-danger text-small">
                          {errors.model.message}
                        </div>
                      )}
                    </div>
                    <div className="form-submit">
                      <button
                        disabled={isSubmitting}
                        type="submit"
                        className="theme-btn"
                      >
                        <i className="flaticon-search" />
                        Search
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <span className="wow fadeInUp" data-wow-delay="400ms">
                Or Browse With Body Type
              </span>
              <ul className="model-links">
                {boodies.map((body) => (
                  <li key={body.id}>
                    <Link
                      href={`/${currRegion}/cars/cars-for-sale/search?body=${body.id}`}
                      title={body.name}
                    >
                      {body.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
