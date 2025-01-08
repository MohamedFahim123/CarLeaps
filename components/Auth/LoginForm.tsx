import Image from "next/image";

export default function LoginForm() {
    return (
        <div
            className="tab-pane fade show active"
            id="nav-home"
            role="tabpanel"
            aria-labelledby="nav-home-tab"
        >
            <div className="form-box">
                <form>
                    <div className="form_boxes">
                        <label>Email or Username</label>
                        <input
                            required
                            type="text"
                            name="name"
                            placeholder="Creativelayer088"
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
                    <div className="btn-box">
                        <label className="contain">
                            Remember
                            <input
                                required
                                type="checkbox"
                                defaultChecked={true}
                            />
                            <span className="checkmark" />
                        </label>
                        <a href="#" className="pasword-btn">
                            Forgotten password?
                        </a>
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
    );
};