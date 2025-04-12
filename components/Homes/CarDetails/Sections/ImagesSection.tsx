import { Car } from "@/app/[region]/cars/car-details/[id]/page";
import Image from "next/image";
import Link from "next/link";
import { Gallery, Item } from "react-photoswipe-gallery";

export default function ImagesSection({
  carItem,
  region,
  currentCurrency,
}: {
  carItem: Car;
  currentCurrency: string;
  region: string;
}) {
  return (
    <>
      <div className="boxcar-title-three">
        <ul className="breadcrumb">
          <li>
            <Link href={`/`}>Home</Link>
          </li>
          <li>
            <Link href={`/${region}/cars/cars-for-sale`}>Cars for Sale</Link>
          </li>
        </ul>
        <h2 className="mb-4 text-capitalize">{carItem?.name?.replaceAll("-", " ")}</h2>
        <ul className="spectes-list">
          <li>
            <span>
              <Image
                src="/images/resource/spec1-1.svg"
                width={18}
                height={18}
                alt=""
              />
              {carItem.year}
            </span>
          </li>
          <li>
            <span>
              <Image
                src="/images/resource/spec1-2.svg"
                width={18}
                height={18}
                alt=""
              />
              {carItem.mileage} miles
            </span>
          </li>
          <li>
            <span>
              <Image
                src="/images/resource/spec1-3.svg"
                width={18}
                height={18}
                alt=""
              />
              {carItem.drive_type}
            </span>
          </li>
          <li>
            <span>
              <Image
                src="/images/resource/spec1-4.svg"
                width={18}
                height={18}
                alt=""
              />
              {carItem.fuel_type}
            </span>
          </li>
        </ul>
        <div className="content-box">
          <div className="btn-box justify-content-end">
            <div className="share-btn">
              <span>Save</span>
              <button type="button" title="Share" className="share">
                <Image
                  src="/images/resource/share1-1.svg"
                  width={12}
                  height={12}
                  alt="Save Icon"
                />
              </button>
            </div>
          </div>
          <h3 className="title">
            {carItem.offer_price} {currentCurrency}
          </h3>
        </div>
      </div>
      <Gallery>
        <div className="gallery-sec">
          <div className="row">
            <div className="image-column item1 col-lg-6 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="image-box">
                  <figure className="image">
                    <Item
                      original={carItem?.main_image}
                      thumbnail={carItem?.main_image}
                      width={805}
                      height={550}
                    >
                      {({ ref, open }) => (
                        <a onClick={open}>
                          <Image
                            alt={`${carItem?.name} main Image`}
                            src={carItem?.main_image}
                            width={805}
                            height={550}
                            ref={ref}
                          />
                        </a>
                      )}
                    </Item>
                  </figure>
                  <div className="content-box">
                    {carItem?.video_link && (
                      <ul className="video-list">
                        <li>
                          <a href={carItem.video_link}>
                            <Image
                              src="/images/resource/video1-1.svg"
                              width={18}
                              height={18}
                              alt=""
                            />
                            Video
                          </a>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="row">
                {carItem.carImages?.slice(0, 4).map((image, idx) => (
                  <div key={idx} className="image-column-two item2 col-6">
                    <div className="inner-column">
                      <div className="image-box">
                        <figure className="image">
                          <Item
                            original={image.image}
                            thumbnail={image.image}
                            width={700}
                            height={600}
                          >
                            {({ ref, open }) => (
                              <a onClick={open} className="fancybox">
                                <Image
                                  ref={ref}
                                  alt={`${carItem?.name} Image ${idx}`}
                                  src={image.image}
                                  width={300}
                                  height={300}
                                />
                              </a>
                            )}
                          </Item>
                        </figure>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Gallery>
    </>
  );
}
