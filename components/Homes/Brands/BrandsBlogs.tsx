import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "./Data";

export default function BrandsBlogs({ blogPosts }: { blogPosts: BlogPost[] }) {
  const region: string = Cookies.get("region") || "riyadh";
  return (
    <section className="blog-section">
      <div className="boxcar-container">
        <div className="boxcar-title wow fadeInUp">
          <h2>Latest Blog Posts</h2>
        </div>
        <div className="row">
          {blogPosts.slice(0, 4).map((post, index) => (
            <div className="blog-block col-lg-3 col-md-6 col-sm-12" key={index}>
              <div className={`inner-box wow fadeInUp`}>
                <div className="image-box">
                  <figure className="image">
                    <Link href={`/blog-single/${post.id}`}>
                      <Image
                        alt={post.title}
                        src={post.image}
                        width={448}
                        height={300}
                      />
                    </Link>
                  </figure>
                </div>
                <div className="content-box">
                  <h6 className="fs-6">{post.type}</h6>
                  <h5 className="title">
                    <Link
                      href={`${region}/cars/blog-single/${post.id}`}
                      title={post.title}
                    >
                      {post.title}
                    </Link>
                  </h5>
                  <ul className="post-info">
                    <li>{post.author}</li>
                    <li>{post.datePublished}</li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
