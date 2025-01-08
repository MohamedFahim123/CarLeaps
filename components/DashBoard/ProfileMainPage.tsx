'use client';

import Image from "next/image";
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function ProfileMainPage() {
    const [images, setImages] = useState<string[]>(["/images/resource/list2-4.png"]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newImages = [...images];
                newImages[index] = reader.result as string;
                setImages(newImages);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDelete = (index: number) => {
        const newImages = images.filter((_, imgIndex) => imgIndex !== index);
        setImages(newImages);
    };

    const [images2, setImages2] = useState<string[]>([
        "/images/resource/list2-1.png",
        "/images/resource/list2-2.png",
        "/images/resource/list2-3.png",
    ]);

    const handleImageChange2 = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newImages = [...images2];
                newImages[index] = reader.result as string;
                setImages2(newImages);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDelete2 = (index: number) => {
        const newImages = images2.filter((_, imgIndex) => imgIndex !== index);
        setImages2(newImages);
    };

    return (
        <section className="dashboard-widget-two">
            <div className="right-box">
                <Sidebar />
                <div className="content-column">
                    <div className="inner-column">
                        <div className="list-title">
                            <h3 className="title">Profile</h3>
                            <div className="text">Lorem ipsum dolor sit amet, consectetur.</div>
                        </div>
                        <div className="gallery-sec">
                            <div className="right-box-three">
                                <h6 className="title">Gallery</h6>
                                <div className="gallery-box">
                                    <div className="inner-box add-input-image">
                                        {images.map((imgSrc, index) => (
                                            <div className="image-box" key={index}>
                                                <Image
                                                    width={190}
                                                    height={167}
                                                    src={imgSrc}
                                                    alt={`Preview ${index}`}
                                                    className="uploaded-img"
                                                />
                                                <div className="content-box">
                                                    <ul className="social-icon">
                                                        <li>
                                                            <button type="button" onClick={() => handleDelete(index)}>
                                                                <Image
                                                                    width={18}
                                                                    height={18}
                                                                    src="/images/resource/delet.svg"
                                                                    alt=""
                                                                />
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <label htmlFor={`file-upload-${index}`}>
                                                                <button title="UpLoad Image" type="button">
                                                                    <Image
                                                                        width={18}
                                                                        height={18}
                                                                        src="/images/resource/delet1-1.svg"
                                                                        alt="Upload"
                                                                    />
                                                                </button>
                                                            </label>
                                                            <input
                                                                id={`file-upload-${index}`}
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) => handleImageChange(e, index)}
                                                                style={{ display: "none" }}
                                                            />
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        ))}

                                        <div className="uplode-box">
                                            <div className="content-box">
                                                <label htmlFor="upload-new">
                                                    <Image
                                                        width={34}
                                                        height={34}
                                                        src="/images/resource/uplode.svg"
                                                        alt="Upload"
                                                    />
                                                    <span>Upload</span>
                                                </label>
                                                <input
                                                    id="upload-new"
                                                    type="file"
                                                    accept="image/*"
                                                    style={{ display: "none" }}
                                                    onChange={(e) => handleImageChange(e, images.length)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text">
                                        Max file size is 1MB, Minimum dimension: 330x300 And Suitable files are .jpg
                                        &amp; .png
                                    </div>
                                </div>
                            </div>
                            <div className="form-sec">
                                <form onSubmit={(e) => e.preventDefault()} className="row">
                                    <div className="col-lg-4">
                                        <div className="form_boxes">
                                            <label htmlFor="FirstName">First Name</label>
                                            <input id="FirstName" name="name" required type="text" placeholder="Ali" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="form_boxes">
                                            <label htmlFor="lastName">Last Name</label>
                                            <input id="lastName" name="last-name" required type="text" placeholder="Tufan" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="form_boxes">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                required
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="creativelayers088@gmail.com"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="form_boxes">
                                            <label htmlFor="PhoneNumber">Phone</label>
                                            <input id="PhoneNumber" name="phone" required type="number" placeholder="+77" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="form_boxes">
                                            <label htmlFor="whatsApp">Whatsapp</label>
                                            <input id="whatsApp" name="whatsapp" required type="number" placeholder="+98" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="form_boxes">
                                            <label htmlFor="WebSite">Website</label>
                                            <input
                                                id="WebSite"
                                                name="website"
                                                type="text"
                                                required
                                                placeholder="www.creativelayers.net"
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="right-box-three v2">
                                <h6 className="title">Photos</h6>
                                <div className="gallery-box">
                                    <div className="inner-box">
                                        {images2.map((imgSrc, index) => (
                                            <div className="image-box" key={index}>
                                                <Image
                                                    width={190}
                                                    height={167}
                                                    src={imgSrc}
                                                    alt={`Preview ${index}`}
                                                />
                                                <div className="content-box">
                                                    <ul className="social-icon">
                                                        <li>
                                                            <button type="button" onClick={() => handleDelete2(index)}>
                                                                <Image
                                                                    width={18}
                                                                    height={18}
                                                                    src="/images/resource/delet.svg"
                                                                    alt=""
                                                                />
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <label htmlFor={`file-upload-${index}`}>
                                                                <button title="UpLoad Image" type="button">
                                                                    <Image
                                                                        width={18}
                                                                        height={18}
                                                                        src="/images/resource/delet1-1.svg"
                                                                        alt="Upload"
                                                                    />
                                                                </button>
                                                            </label>
                                                            <input
                                                                id={`file-upload-${index}`}
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) => handleImageChange2(e, index)}
                                                                style={{ display: "none" }}
                                                            />
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        ))}

                                        <div className="uplode-box">
                                            <div className="content-box">
                                                <label htmlFor="upload-new-photos">
                                                    <Image
                                                        width={34}
                                                        height={34}
                                                        src="/images/resource/uplode.svg"
                                                        alt="Upload"
                                                    />
                                                    <span>Upload</span>
                                                </label>
                                                <input
                                                    id="upload-new-photos"
                                                    type="file"
                                                    accept="image/*"
                                                    style={{ display: "none" }}
                                                    onChange={(e) => handleImageChange2(e, images2.length)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text">
                                        Max file size is 1MB, Minimum dimension: 330x300 And Suitable files are .jpg &amp; .png
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
