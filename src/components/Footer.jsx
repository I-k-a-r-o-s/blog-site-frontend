import { footer_data } from "../assets/assets";
import logo from "../assets/logo.jpeg";
const Footer = () => {
  return (
    <div>
      <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
        <aside>
          <img src={logo} alt="logo" className="w-25 h-25 rounded-full" />
          <p>
            ACME Industries Ltd.
            <br />
            Providing reliable tech since 1992
          </p>
        </aside>
        {footer_data.map((section, index) => (
          <nav key={index}>
            <h6 className="footer-title">{section.title}</h6>
            {section.links.map((link, i) => (
              <a href={section.url[i]} key={i} className="link link-hover">
                {link}
              </a>
            ))}
          </nav>
        ))}
      </footer>
      <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            Someone
          </p>
        </aside>
      </footer>
    </div>
  );
};
export default Footer;
