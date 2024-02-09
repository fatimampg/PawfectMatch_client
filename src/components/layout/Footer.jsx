import twitter from "../../assets/images/twitter.png";
import facebook from "../../assets/images/facebook.png";
import linkedin from "../../assets/images/linkedin.png";
import instagram from "../../assets/images/instagram.png";

const Footer = () => {
  return (
    <div id="footer" name="Feedback" className="bg-darkest p-4 text-white">
      <div className="mx-auto flex  h-full max-w-screen-lg flex-col justify-center">
        <div>
          <p className="pt-3">We appreciate your feedback </p>
        </div>
        <div className="flex items-center justify-center">
          <form
            action="https://getform.io/f/329ce23f-b8d3-4c8c-bcf1-fc958f919fc5"
            method="POST"
            className="flex w-full flex-col md:w-1/2"
          >
            <textarea
              name="message"
              placeholder="Enter your Feedback"
              rows="2"
              className="p02 text-darkest rounded-md border-2 bg-transparent focus:outline-none"
              style={{ paddingLeft: "10px" }}
            ></textarea>
            <button className="text-darkest mx-auto my-2 flex items-center rounded-md bg-white px-3 py-1 duration-300 hover:scale-110">
              Submit
            </button>
          </form>
        </div>
        <div className="mx-auto flex h-full max-w-screen-lg flex-row justify-center">
          <a href="/" className="mx-2">
            <img src={twitter} alt="Twitter" className="h-5" />
          </a>
          <a href="/" className="mx-2">
            <img src={facebook} alt="Facebook" className="h-5" />
          </a>
          <a href="/" className="mx-2">
            <img src={instagram} alt="Instagram" className="h-5" />
          </a>
          <a href="/" className="mx-2">
            <img src={linkedin} alt="LinkedIn" className="h-5" />
          </a>
        </div>
        <div className="container mx-auto text-center">
          <p className="text-sm text-gray-500">Images courtesy - Google</p>
          <p className="text-xs text-gray-400">
            © 2024 Pawfetch. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
