"use client";
import { useRouteRegion } from "@/app/hooks/useRouteRegion";
import { carSearchHref } from "@/app/lib/cars/searchFilters";
import { useCarsForSaleStore } from "@/app/store/CarsForSale";
import AppSelect from "@/components/Common/AppSelect";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import styles from "./heroStyles.module.css";

interface SearchFormInputs {
  condition: string;
  make: string;
  model: string;
}

export default function Hero() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SearchFormInputs>({
    defaultValues: { condition: "", make: "", model: "" },
  });
  const { makes, models, boodies } = useCarsForSaleStore();
  const router = useRouter();
  const currRegion = useRouteRegion();

  const onSubmit = (data: SearchFormInputs) => {
    router.push(carSearchHref(currRegion, data));
  };

  return (
    <section className="boxcar-banner-section-v1">
      <div className="boxcar-container">
        <div className="banner-content">
          <span className={`wow fadeInUp ${styles.banner_span}`}>
            New and Used Cars for Sale in {currRegion}
          </span>
          <h2
            className={`wow fadeInUp ${styles.banner_h2}`}
            data-wow-delay="100ms"
          >
            Find Your Perfect Car
          </h2>
          <div className="form-tabs">
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
                      <Controller
                        name="make"
                        control={control}
                        render={({ field }) => (
                          <AppSelect
                            id="searchMake"
                            variant="compact"
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Select Make"
                            options={makes.map((make) => ({
                              value: String(make.id),
                              label: make.name,
                            }))}
                          />
                        )}
                      />
                      {errors.make && (
                        <div className="text-danger text-small">
                          {errors.make.message}
                        </div>
                      )}
                    </div>
                    <div className={`${styles.form_boxes}`}>
                      <Controller
                        name="model"
                        control={control}
                        render={({ field }) => (
                          <AppSelect
                            id="searchModels"
                            variant="compact"
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Select Model"
                            options={(models || []).map(
                              (model: { id: number; name: string }) => ({
                                value: String(model.id),
                                label: model.name,
                              })
                            )}
                          />
                        )}
                      />
                      {errors.model && (
                        <div className="text-danger text-small">
                          {errors.model.message}
                        </div>
                      )}
                    </div>
                    <div className={`form-submit ${styles.form_submit}`}>
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
              <span
                className={`wow fadeInUp ${styles.banner_span}`}
                data-wow-delay="400ms"
              >
                Or Browse With Body Type
              </span>
              <ul className={`model-links ${styles.model_links}`}>
                {boodies?.slice(0, 6)?.map((body) => (
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
