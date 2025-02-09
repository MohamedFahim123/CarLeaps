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
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect } from "react";
import Nav from "./Nav";

function HeaderDashboard() {
  const { makesCars, getMakesCars, makesCarsLoading } = useMakesCarsStore();
  const { models, getModels, modelsLoading } = useModelsStore();
  const { trims, getTrims, trimsLoading } = useTrimsStore();
  const { adStates, getAdStates, adStatesLoading } = useAdStatesStore();
  const { bodies, getBodies, bodiesLoading } = useBodiesStore();
  const { condition, getCondition, conditionLoading } = useConditionStore();
  const { features, getFeatures, featuresLoading } = useFeaturesStore();
  const { fuelTypes, getFuelTypes, fuelTypesLoading } = useFuelTypesStore();
  const { transmissions, getTransmissions, transmissionsLoading } = useTransmissionsStore();
  const { years, getYears, yearsLoading } = useYearsStore();
  const { countries, getCountries, countriesLoading } = useCountriesStore();

  const getAllMakesCars = useCallback(() => {
    if (makesCars.length === 0 && !makesCarsLoading) {
      getMakesCars();
    }
  }, [getMakesCars, makesCarsLoading, makesCars.length]);

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

  const getAllAdStates = useCallback(() => {
    if (adStates.length === 0 && !adStatesLoading) {
      getAdStates();
    }
  }, [getAdStates, adStatesLoading, adStates.length]);

  const getAllBodies = useCallback(() => {
    if (bodies.length === 0 && !bodiesLoading) {
      getBodies();
    }
  }, [getBodies, bodiesLoading, bodies.length]);

  const getAllCondition = useCallback(async () => {
    if (condition.length === 0 && !conditionLoading) {
      await getCondition();
    }
  }, [getCondition, conditionLoading, condition.length]);

  const getAllFeatures = useCallback(() => {
    if (features.length === 0 && !featuresLoading) {
      getFeatures();
    }
  }, [getFeatures, featuresLoading, features.length]);

  const getAllFuelTypes = useCallback(() => {
    if (fuelTypes.length === 0 && !fuelTypesLoading) {
      getFuelTypes();
    }
  }, [getFuelTypes, fuelTypesLoading, fuelTypes.length]);

  const getAllTransmissions = useCallback(() => {
    if (transmissions.length === 0 && !transmissionsLoading) {
      getTransmissions();
    }
  }, [getTransmissions, transmissionsLoading, transmissions.length]);

  const getAllYears = useCallback(() => {
    if (years.length === 0 && !yearsLoading) {
      getYears();
    }
  }, [getYears, yearsLoading, years.length]);

  const getAllCountries = useCallback(() => {
    if (countries.length === 0 && !countriesLoading) {
      getCountries();
    }
  }, [getCountries, countriesLoading, countries.length]);

  useEffect(() => {
    getAllModels();
    getAllTrims();
    getAllMakesCars();
    getAllAdStates();
    getAllCondition();
    getAllBodies();
    getAllFeatures();
    getAllTransmissions();
    getAllFuelTypes();
    getAllYears();
    getAllCountries();
  }, [getAllModels, getAllTrims, getAllMakesCars, getAllAdStates, getAllBodies, getAllCondition, getAllFeatures, getAllFuelTypes, getAllTransmissions, getAllYears, getAllCountries]);

  return (
    <header className="boxcar-header header-style-ten">
      <div className="header-inner">
        <div className="inner-container">
          {/* Main box */}
          <div className="c-box">
            <div className="logo-inner">
              <div className="logo">
                <Link href={`/`}>
                  <Image alt="" title="Boxcar" width={108} height={26} src="/images/logo.svg" />
                </Link>
              </div>
            </div>
            {/*Nav Box*/}
            <div className="nav-out-bar">
              <nav className="nav main-menu">
                <ul className="navigation" id="navbar">
                  <Nav />
                </ul>
              </nav>
              {/* Main Menu End*/}
            </div>
            <div className="right-box">
              <a href="#" className="haeder-img">
                <Image width={50} height={50} src="/images/resource/header-img.png" alt="" />
              </a>
              <div className="mobile-navigation">
                <a href="#nav-mobile" title="">
                  <svg width={22} height={11} viewBox="0 0 22 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width={22} height={2} fill="white" />
                    <rect y={9} width={22} height={2} fill="white" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          {/* Mobile Menu  */}
        </div>
      </div>
      {/* End Header Search */}
      <div id="nav-mobile" />
    </header>
  );
}

export default React.memo(HeaderDashboard);
