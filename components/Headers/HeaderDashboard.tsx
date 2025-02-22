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
import { useProfileStore } from "@/app/store/profile";
import { useTokenStore } from "@/app/store/Token";
import { useTransmissionsStore } from "@/app/store/transmissions";
import { useYearsStore } from "@/app/store/years";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect } from "react";
import Nav from "./Nav";
import { useActiveCars } from "@/app/store/activecars";
import { usePendingCars } from "@/app/store/pendingCars";
import { useDeactiveCars } from "@/app/store/deactiveCars";

function HeaderDashboard() {
  const { makesCars, getMakesCars, makesCarsLoading } = useMakesCarsStore();
  const { models, getModels, modelsLoading } = useModelsStore();
  const { trims, getTrims, trimsLoading } = useTrimsStore();
  const { adStates, getAdStates, adStatesLoading } = useAdStatesStore();
  const { bodies, getBodies, bodiesLoading } = useBodiesStore();
  const { condition, getCondition, conditionLoading } = useConditionStore();
  const { getFeatures, featuresLoading } = useFeaturesStore();
  const { fuelTypes, getFuelTypes, fuelTypesLoading } = useFuelTypesStore();
  const { transmissions, getTransmissions, transmissionsLoading } = useTransmissionsStore();
  const { years, getYears, yearsLoading } = useYearsStore();
  const { countries, getCountries, countriesLoading } = useCountriesStore();
  const { token, getToken, tokenLoading } = useTokenStore();
  const { profile, getProfile, profileLoading } = useProfileStore();
  const { activeCars, getActiveCars, activeCarsLoading } = useActiveCars();
  const { pendingCars, getPendingCars, pendingCarsLoading } = usePendingCars();
  const { deactiveCars, getDeactiveCars, deactiveCarsLoading } = useDeactiveCars();

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
    if (!featuresLoading) {
      getFeatures();
    }
  }, [getFeatures, featuresLoading]);

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

  const getAllActiveCars = useCallback(() => {
    if (!activeCars && !activeCarsLoading) {
      getActiveCars();
    }
  }, [getActiveCars, activeCarsLoading, activeCars]);

  const getAllPendingCars = useCallback(() => {
    if (!pendingCars && !pendingCarsLoading) {
      getPendingCars();
    }
  }, [getPendingCars, pendingCarsLoading, pendingCars]);

  const getAllDeactiveCars = useCallback(() => {
    if (!deactiveCars && !deactiveCarsLoading) {
      getDeactiveCars();
    }
  }, [getDeactiveCars, deactiveCarsLoading, deactiveCars]);

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
    getTheToken();
    getTheProfile();
    getAllActiveCars();
    getAllPendingCars();
    getAllDeactiveCars();
  }, [
    getAllModels,
    getAllTrims,
    getAllMakesCars,
    getAllAdStates,
    getAllBodies,
    getAllCondition,
    getAllFeatures,
    getAllFuelTypes,
    getAllTransmissions,
    getAllYears,
    getAllCountries,
    getTheToken,
    getTheProfile,
    getAllActiveCars,
    getAllPendingCars,
    getAllDeactiveCars,
  ]);

  return (
    <header className="boxcar-header header-style-ten">
      <div className="header-inner">
        <div className="inner-container">
          <div className="c-box">
            <div className="logo-inner">
              <div className="logo">
                <Link href={`/`}>
                  <Image alt="" title="Boxcar" width={108} height={26} src="/images/logo.svg" />
                </Link>
              </div>
            </div>
            <div className="nav-out-bar">
              <nav className="nav main-menu">
                <ul className="navigation" id="navbar">
                  <Nav />
                </ul>
              </nav>
            </div>
            <div className="right-box">
              <a href="#" className="haeder-img">
                <Image
                  width={50}
                  height={50}
                  src={profile?.image === "N/A" ? "/images/resource/header-img.png" : profile?.image ? profile?.image : "/images/resource/header-img.png"}
                  alt={"Profile Image"}
                  className="object-fit-cover rounded-circle"
                />
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
        </div>
      </div>
      <div id="nav-mobile" />
    </header>
  );
}

export default React.memo(HeaderDashboard);
