import Cars from "@/components/Homes/CarsForSale/Cars";
import Cars2 from "@/components/Homes/CarsForSale/Cars2";
import CarType from "@/components/Homes/CarsForSale/CarType";
import Features from "@/components/Homes/CarsForSale/Features";
import Hero from "@/components/Homes/CarsForSale/Hero";
import Brands from "@/components/Homes/Home/Brands";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Cars For Sale',
    description: 'Find and rent cars at the best prices',
};

export default function CarsForSalePage() {
    return (
        <>
            <Hero />
            <CarType />
            <Brands currPage="carsForSale" />
            <Cars />
            <Features />
            <Cars2 />
        </>
    );
};