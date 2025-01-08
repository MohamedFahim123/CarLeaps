import Image from "next/image";


export default function RegisterForm() {
    return (
        <div
            className="tab-pane fade show active"
            id="nav-profile"
            role="tabpanel"
            aria-labelledby="nav-profile-tab"
        >
            <div className="form-box two">
                <form>
                    <div className="form_boxes">
                        <label>Username</label>
                        <input
                            required
                            type="text"
                            name="name"
                            placeholder="Creativelayer088"
                        />
                    </div>
                    <div className="form_boxes">
                        <label>Email</label>
                        <input
                            required
                            type="email"
                            name="email"
                            placeholder="Creative@gmail.com"
                        />
                    </div>
                    <div className="form_boxes">
                        <label>Phone</label>
                        <input
                            required
                            type="number"
                            name="phone"
                            placeholder={'+67'}
                        />
                    </div>
                    <div className="form_boxes">
                        <label>Password</label>
                        <input
                            required
                            type="password"
                            name="password"
                            placeholder="********"
                        />
                    </div>
                    <div className="btn-box-three">
                        <label className="contain">
                            Private seller
                            <input
                                required
                                type="radio"
                                defaultChecked={true}
                                name="radio"
                            />
                            <span className="checkmark" />
                        </label>
                        <label className="contain">
                            Business seller
                            <input
                                required
                                type="radio"
                                defaultChecked={true}
                                name="radio"
                            />
                            <span className="checkmark" />
                        </label>
                    </div>
                    <div className="form-submit">
                        <button type="submit" className="theme-btn">
                            Login{" "}
                            <Image
                                alt=""
                                src="/images/arrow.svg"
                                width={14}
                                height={14}
                            />
                        </button>
                    </div>
                    <div className="btn-box">
                        <label className="contain">
                            I accept the privacy policy
                            <input
                                required
                                type="checkbox"
                                defaultChecked={true}
                            />
                            <span className="checkmark" />
                        </label>
                    </div>
                </form>
                <div className="btn-box-two">
                    <span>OR</span>
                    <div className="social-btns">
                        <a href="#" className="fb-btn">
                            <i className="fa-brands fa-facebook-f" />
                            Continue Facebook
                        </a>
                        <a href="#" className="fb-btn two">
                            <i className="fa-brands fa-google" />
                            Continue Google
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
