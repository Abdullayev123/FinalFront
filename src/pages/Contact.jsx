import gsap from "gsap";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineArrowOutward } from "react-icons/md";

const Contact = () => {
  const location = useLocation();

  useEffect(() => {
    gsap.set("#menu-link-holder", { y: 75 });
    gsap.to("#contact-image", {
      clipPath: "polygon(0 0, 0 100%, 100% 100%, 100% 0)",
      ease: "power4.inOut",
    });
    gsap.to("#menu-link-holder", {
      y: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power4.inOut",
      delay: 0.5,
    });
  }, [location.pathname]);

  const contactLinks = [
    {
      name: "WhatsApp",
      url: "https://wa.me/+994517857982",
      displayText: "+994 (51)785 79 82",
    },
    {
      name: "Email",
      url: "mailto:abdullayevxezer2005@gmail.com",
      displayText: "abdullayevxezer2005@gmail.com",
    },
  ];

  const socialLinks = [
    { name: "Facebook", url: "https://www.facebook.com/abdullayev.xezer" },
    { name: "Instagram", url: "https://www.instagram.com" },
    { name: "LinkedIn", url: "https://www.linkedin.com" },
  ];

  return (
    <div className="w-full min-h-screen bg-[#111]">
      <div className="h-full flex py-0 pt-20 items-center  lg:py-[200px] px-4 flex-col lg:flex-row ">
        <div className="w-full lg:w-[50%] flex-col flex sm:flex-row md:flex-col gap-[100px] pr-0 lg:pr-30">
          {/* Contact Section */}
          <div className="flex  justify-between flex-col  md:flex-row w-full text-[20px]">
            <div>
              <div id="menu-link">
                <div id="menu-link-holder" className="overflow-hidden">
                  <span
                    id="menu-link-item"
                    className="hover:opacity-80 transition-all duration-300"
                  >
                    <h1 className="text-white">(Contact)</h1>
                  </span>
                </div>
              </div>
            </div>
            <div className="will-change-transform">
              {contactLinks.map((link, index) => (
                <div id="menu-link" key={index}>
                  <div id="menu-link-holder" className="overflow-hidden">
                    <span
                      id="menu-link-item"
                      className="hover:opacity-80 transition-all duration-300"
                    >
                      <Link to={link.url} target="_blank" key={index}>
                        <p className="text-white ">{link.displayText}</p>
                      </Link>
                    </span>
                  </div>
                </div>
              ))}
              <div className="pt-3">
                {socialLinks.map((link, index) => (
                  <div id="menu-link" key={index}>
                    <div id="menu-link-holder" className="overflow-hidden">
                      <span
                        id="menu-link-item"
                        className="hover:opacity-80 transition-all duration-300"
                      >
                        <Link to={link.url} target="_blank" key={index}>
                          <p className="text-white ">{link.name}</p>
                        </Link>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Office Section */}
          <div className="flex justify-between flex-col md:flex-row w-full text-[20px]">
            <div>
              <div id="menu-link">
                <div id="menu-link-holder" className="overflow-hidden">
                  <span id="menu-link-item">
                    <h1 className="text-white">(Office)</h1>
                  </span>
                </div>
              </div>
            </div>
            <div className="text-white">
              <div>
                <div id="menu-link">
                  <div id="menu-link-holder" className="overflow-hidden">
                    <span id="menu-link-item">
                      <p>Azerbaijan</p>
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div id="menu-link">
                  <div id="menu-link-holder" className="overflow-hidden">
                    <span id="menu-link-item">
                      <p className="animated-text">
                        Baku, Nasimi district, 28 may street
                      </p>
                    </span>
                  </div>
                </div>
              </div>
              <div className="mb-10">
                <div id="menu-link">
                  <div id="menu-link-holder" className="overflow-hidden">
                    <span id="menu-link-item">
                      <p className="animated-text">Azerbaijan Gallery</p>
                    </span>
                  </div>
                </div>
              </div>
              <div id="menu-link" className="group">
                <div
                  id="menu-link-holder"
                  className="overflow-hidden  text-white"
                >
                  <span
                    id="menu-link-item"
                    className="flex items-center gap-2 hover:opacity-80 transition-all duration-300 underline"
                  >
                    <Link
                      to={"https://maps.app.goo.gl/swLMX6NPUiihM5HY8"}
                      target="_blank"
                      className=""
                    >
                      Get directions
                    </Link>
                    <MdOutlineArrowOutward className="group-hover:rotate-[47deg] transition-all duration-300 " />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="contact-image"
          className="overflow-hidden transition-all duration-500 hidden sm:block"
        >
          <img
            src="https://i.pinimg.com/736x/ad/a1/c9/ada1c992568e928a7eaf8cb543683356.jpg"
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
