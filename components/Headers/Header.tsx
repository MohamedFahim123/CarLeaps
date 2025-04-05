"use client";

import { useAdStatesStore } from "@/app/store/ad-states";
import { useModelsStore } from "@/app/store/allModels";
import { useTrimsStore } from "@/app/store/allTirms";
import { useBodiesStore } from "@/app/store/bodies";
import { useCarsForSaleStore } from "@/app/store/CarsForSale";
import { useCitiesStore } from "@/app/store/Cities";
import { useConditionStore } from "@/app/store/conditions";
import { useCountriesStore } from "@/app/store/countries";
import { useCPOCarsMakesStore } from "@/app/store/cpoMakes";
import { useFuelTypesStore } from "@/app/store/fuel-types";
import { useProfileStore } from "@/app/store/profile";
import { useResearchCarsMakesStore } from "@/app/store/ResearchCarMakes";
import { useTokenStore } from "@/app/store/Token";
import { baseUrl, MainRegionName } from "@/app/utils/mainData";
import { setRegionCookie } from "@/app/utils/setRegionCookie";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";
import { toast } from "react-toastify";
import styles from "./headerStyles.module.css";
import Nav from "./Nav";

interface Header1Props {
  headerClass?: string;
  white?: boolean;
}

export default function Header1({
  headerClass = "header-style-v1 header-default",
  white = false,
}: Header1Props) {
  const pathName = usePathname();
  const router = useRouter();
  const [currRegion, setCurrRegion] = useState<string>(MainRegionName);
  // ResearchPage Apis
  const {
    researchCarsMakes,
    getResearchCarsMakes,
    setResearchMakesRegion,
    researchCarsMakesLoading,
  } = useResearchCarsMakesStore();

  const getAllResearchMakes = useCallback(() => {
    if (researchCarsMakes.length === 0 && !researchCarsMakesLoading) {
      getResearchCarsMakes();
    }
  }, [getResearchCarsMakes, researchCarsMakesLoading, researchCarsMakes]);

  useEffect(() => {
    getAllResearchMakes();
  }, [getAllResearchMakes]);

  // CPO Apis
  const { CPOCarsMakes, getCPOCarsMakes, CPOCarsMakesLoading } =
    useCPOCarsMakesStore();

  const getAllCPOCarsMakes = useCallback(() => {
    if (CPOCarsMakes.length === 0 && !CPOCarsMakesLoading) {
      getCPOCarsMakes();
    }
  }, [getCPOCarsMakes, CPOCarsMakesLoading, CPOCarsMakes]);

  // All WebsiteApis
  const { countries, getCountries, countriesLoading } = useCountriesStore();
  const { token, clearToken, getToken, tokenLoading } = useTokenStore();
  const { profile, getProfile, profileLoading } = useProfileStore();
  const { models, getModels, modelsLoading } = useModelsStore();
  const { trims, getTrims, trimsLoading } = useTrimsStore();
  const { bodies, getBodies, bodiesLoading } = useBodiesStore();
  const { condition, getCondition, conditionLoading } = useConditionStore();
  const { cities, getCities, citiesLoading } = useCitiesStore();
  const { fuelTypes, getFuelTypes, fuelTypesLoading } = useFuelTypesStore();
  const { carsForSale, getCarsForSale, setRegion, carsForSaleLoading } =
    useCarsForSaleStore();
  const { adStates, getAdStates, adStatesLoading } = useAdStatesStore();

  const getAllFuelTypes = useCallback(() => {
    if (fuelTypes.length === 0 && !fuelTypesLoading) {
      getFuelTypes();
    }
  }, [getFuelTypes, fuelTypesLoading, fuelTypes.length]);

  const getAllCarsForSale = useCallback(() => {
    if (carsForSale.length === 0 && !carsForSaleLoading) {
      getCarsForSale();
    }
  }, [getCarsForSale, carsForSaleLoading, carsForSale.length]);

  const getAllConditions = useCallback(() => {
    if (condition.length === 0 && !conditionLoading) {
      getCondition();
    }
  }, [getCondition, conditionLoading, condition]);

  const getAllBodiesCars = useCallback(() => {
    if (bodies.length === 0 && !bodiesLoading) {
      getBodies();
    }
  }, [getBodies, bodiesLoading, bodies.length]);

  const getAllCountries = useCallback(() => {
    if (countries.length === 0 && !countriesLoading) {
      getCountries();
    }
  }, [getCountries, countriesLoading, countries.length]);

  const getTheToken = useCallback(() => {
    if (!token && !tokenLoading) {
      getToken();
    }
  }, [token, getToken, tokenLoading]);

  const getTheProfile = useCallback(() => {
    if (!profile && !profileLoading) {
      getProfile();
    }
  }, [profile, getProfile, profileLoading]);

  const getAllModels = useCallback(() => {
    if (models.length === 0 && !modelsLoading) {
      getModels();
    }
  }, [getModels, modelsLoading, models.length]);

  const getAllTrims = useCallback(() => {
    if (trims.length === 0 && !trimsLoading) {
      getTrims();
    }
  }, [getTrims, trimsLoading, trims.length]);

  const getAllCities = useCallback(() => {
    if (cities.length === 0 && !citiesLoading) {
      getCities();
    }
  }, [getCities, citiesLoading, cities.length]);

  const getAllAdStates = useCallback(() => {
    if (adStates.length === 0 && !adStatesLoading) {
      getAdStates();
    }
  }, [getAdStates, adStatesLoading, adStates.length]);

  useEffect(() => {
    getAllCountries();
    getAllAdStates();
    getTheToken();
    getTheProfile();
    getAllModels();
    getAllTrims();
    getAllCarsForSale();
    getAllBodiesCars();
    getAllConditions();
    getAllFuelTypes();
    getAllCities();
    getAllCPOCarsMakes();
  }, [
    getAllBodiesCars,
    getAllCPOCarsMakes,
    getAllFuelTypes,
    getAllConditions,
    getAllCountries,
    getAllAdStates,
    getTheToken,
    getTheProfile,
    getAllModels,
    getAllTrims,
    getAllCarsForSale,
    getAllCities,
  ]);

  useEffect(() => {
    const region: string = Cookies.get("region") || MainRegionName;
    setCurrRegion(region);
  }, []);

  const logoutHandler = useCallback(async () => {
    const toastId = toast.loading("Submitting...");
    try {
      const res = await axios.post(
        `${baseUrl}/dealer/logout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.dismiss(toastId);
      toast.success(res?.data?.message, {
        autoClose: 1500,
      });
      if (res.status === 200) {
        clearToken();
        axios.post("/api/logout", { token: "" });
        window.location.reload();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.dismiss(toastId);
        toast.error(error?.response?.data?.message || "Something went wrong!", {
          autoClose: 1500,
        });
      }
    }
  }, [clearToken, token]);

  useEffect(() => {
    const region: string = Cookies.get("region") || MainRegionName;
    setCurrRegion(region);
  }, []);

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newRegion = event.target.value;
    setRegionCookie(newRegion);
    setCurrRegion(newRegion);
    setRegion(newRegion);
    setResearchMakesRegion(newRegion);
    router.replace(`/${newRegion}/cars/home`);
  };

  const RenderCondition: boolean =
    pathName.includes(`/${currRegion}/cars/cars-for-sale/search`) ||
    pathName.includes(`/${currRegion}/cars/car-details`) ||
    pathName.includes(`/${currRegion}/cars/perfect-match`);

  return (
    <header
      className={`boxcar-header ${styles.backGroundBlack} ${
        !RenderCondition && styles.mainPadding
      } ${headerClass}`}
    >
      <div className="header-inner py-3">
        <div className="container">
          <div className="c-box">
            <div className="logo-inner">
              <div className="logo">
                <Link href={`/${currRegion}/cars/home`}>
                  {white ? (
                    <Image
                      alt="CarLeaps logo"
                      title="CarLeaps"
                      src="/images/lightlogo.svg"
                      width={115}
                      height={28}
                    />
                  ) : (
                    <Image
                      alt="CarLeaps logo"
                      title="CarLeaps"
                      src="/images/logo.svg"
                      width={115}
                      height={28}
                    />
                  )}
                </Link>
              </div>
            </div>
            <div className="nav-out-bar mx-auto">
              <nav className="nav main-menu">
                <ul className="navigation" id="navbar">
                  <Nav />
                </ul>
              </nav>
            </div>
            <div className="right-box ms-auto">
              {cities.length > 0 && (
                <div className="region-selector me-3">
                  <select
                    className="form-select"
                    value={currRegion}
                    onChange={handleRegionChange}
                  >
                    {cities?.map((city) => (
                      <option key={city.id} value={city.code}>
                        {city.code.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {!token ? (
                <Link
                  href={`/${currRegion}/auth/login`}
                  title=""
                  className="box-account"
                >
                  <span className="icon">
                    <svg
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_147_6490)">
                        <path
                          d="M7.99998 9.01221C3.19258 9.01221 0.544983 11.2865 0.544983 15.4161C0.544983 15.7386 0.806389 16.0001 1.12892 16.0001H14.871C15.1935 16.0001 15.455 15.7386 15.455 15.4161C15.455 11.2867 12.8074 9.01221 7.99998 9.01221ZM1.73411 14.8322C1.9638 11.7445 4.06889 10.1801 7.99998 10.1801C11.9311 10.1801 14.0362 11.7445 14.2661 14.8322H1.73411Z"
                          fill="white"
                        />
                        <path
                          d="M7.99999 0C5.79171 0 4.12653 1.69869 4.12653 3.95116C4.12653 6.26959 5.86415 8.15553 7.99999 8.15553C10.1358 8.15553 11.8735 6.26959 11.8735 3.95134C11.8735 1.69869 10.2083 0 7.99999 0ZM7.99999 6.98784C6.50803 6.98784 5.2944 5.62569 5.2944 3.95134C5.2944 2.3385 6.43231 1.16788 7.99999 1.16788C9.54259 1.16788 10.7056 2.36438 10.7056 3.95134C10.7056 5.62569 9.49196 6.98784 7.99999 6.98784Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_147_6490">
                          <rect width={16} height={16} fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  Sign in
                </Link>
              ) : (
                <>
                  <div className="btn">
                    <Link
                      href={`/${currRegion}/dashboard/profile`}
                      className={`btn ${styles.btnCarPortal} px-3`}
                    >
                      Dealer Portal
                    </Link>
                  </div>
                  <button
                    className={`btn text-white ${styles.logoutBtn}`}
                    type="button"
                    title="Logout"
                    onClick={logoutHandler}
                  >
                    <CiLogout size={30} />
                  </button>
                </>
              )}
              <div className="mobile-navigation">
                {white ? (
                  <a href="#nav-mobile" title="">
                    <svg
                      width={22}
                      height={11}
                      viewBox="0 0 22 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width={22} height={2} fill="#050B20" />
                      <rect y={9} width={22} height={2} fill="#050B20" />
                    </svg>
                  </a>
                ) : (
                  <a href="#nav-mobile" title="">
                    <svg
                      width={22}
                      height={11}
                      viewBox="0 0 22 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width={22} height={2} fill="white" />
                      <rect y={9} width={22} height={2} fill="white" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="nav-mobile" />
    </header>
  );
}
