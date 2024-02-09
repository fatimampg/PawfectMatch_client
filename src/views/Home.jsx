import dog1 from "../assets/images/dog1.jpg";
import Dogimage2 from "../assets/images/Dogimage2.jpg";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/context/UserContext";
import { useContext } from "react";

const Home = () => {
  const navigate = useNavigate();

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.mail;
  let userType = currentUser?.usertype;

  return (
    <div>
      <div>
        <section id="hero" className>
          {userType === "association" ? (
            <img
              src={Dogimage2}
              alt="img"
              className="z-10 mx-auto mt-[4rem] h-auto w-full max-w-[800px] object-cover"
            />
          ) : (
            <img
              src={dog1}
              alt="img"
              className="z-10 mx-auto mt-[4rem] h-auto w-full max-w-[850px] object-cover"
            />
          )}

          <div className="mx-auto mt-6 max-w-screen-lg p-4 text-center">
            <p className="text-darkest mb-[2rem] text-[1.25rem] font-bold">
              Welcome to PawfectMatch!
            </p>
            {userType === "association" ? (
              <p className="text-darkest font-bold leading-8">
                As an association you have the opportunity to introduce dogs
                that are looking for a new home to potential Adopters and look
                for Volunteers to walk the dogs you are housing.
              </p>
            ) : (
              <>
                <p className="text-darkest font-bold leading-8">
                  The ultimate platform for dog lovers! Whether you are looking
                  for a furry friend to adopt, or you want to help out a dog in
                  need of some exercise, we have you covered. PawfectMatch
                  connects you with local associations that rescue and care for
                  dogs, as well as volunteers who are willing to walk them. You
                  can browse through hundreds of profiles of adorable dogs,
                  filter by breed, size, age, and personality, and find your
                  perfect match.
                </p>
                <p className="text-darkest mt-4 font-bold leading-8">
                  You can also register as a volunteer or an association, and
                  create your own profile to showcase your dog or your services.
                  PawfectMatch makes it easy and fun to find, adopt, or walk a
                  dog in your area. Join us today and discover the joy of dog
                  companionship!
                </p>
              </>
            )}
          </div>
          {userType === "association" ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="grid w-full max-w-[1100px] grid-cols-1 gap-8 rounded-lg p-8 md:grid-cols-2">
                <div className="bg-darkest rounded-lg p-8">
                  <h6 className="text-center text-base font-bold text-white md:text-lg lg:text-lg">
                    DOG ADOPTION
                  </h6>

                  <div className="mt-4">
                    <p className="text-center text-white">
                      Looking for a new home for your dogs? Post them and add
                      useful information to help them find a pawfect home.
                    </p>
                  </div>
                  <div className="mt-4">
                    <button
                      className="text-darkest mx-auto flex items-center rounded-md bg-white px-6 py-2 font-bold duration-300 hover:scale-110"
                      onClick={() => navigate("/adddog")}
                    >
                      Add Dog
                    </button>
                  </div>
                </div>

                <div className="bg-darkest rounded-lg p-8">
                  <h6 className="text-center text-base font-bold text-white md:text-lg lg:text-lg">
                    VOLUNTEERS
                  </h6>

                  <div className="mt-4">
                    <p className="pb-5 text-center text-white">
                      Find volounteers to take your dogs on walks.
                    </p>
                  </div>
                  <div className="mt-4">
                    <button
                      className="text-darkest mx-auto flex items-center rounded-md bg-white px-6 py-2 font-bold duration-300 hover:scale-110"
                      onClick={() => navigate("/dogwalking")}
                    >
                      Find Volunteers
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="grid w-full max-w-[1100px] grid-cols-1 gap-10 rounded-lg p-8 md:grid-cols-2">
                <div className="bg-darkest rounded-lg p-8">
                  <h6 className="text-center text-base font-bold text-white md:text-lg lg:text-lg">
                    ADOPT A DOG
                  </h6>

                  <div className="mt-4">
                    <p className="text-center text-white">
                      Browse nearby shelters for dogs that are looking for a new
                      home.
                    </p>
                  </div>
                  <div className="mt-4">
                    <button
                      className="text-darkest mx-auto flex items-center rounded-md bg-white px-6 py-2 font-bold duration-300 hover:scale-110"
                      onClick={() => navigate("/dogsadoption")}
                    >
                      Find Dogs
                    </button>
                  </div>
                </div>

                <div className="bg-darkest rounded-lg p-8">
                  <h6 className="text-center text-base font-bold text-white md:text-lg lg:text-lg">
                    WALK A DOG
                  </h6>

                  <div className="mt-4">
                    <p className="text-center text-white">
                      Browse nearby shelters for dogs that need a buddy to go on
                      walks together.
                    </p>
                  </div>
                  <div className="mt-4">
                    <button
                      className="text-darkest mx-auto flex items-center rounded-md bg-white px-6 py-2 font-bold duration-300 hover:scale-110"
                      onClick={() => navigate("/dogwalking")}
                    >
                      Find Shelters
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <h6 className="text-darkest text-center text-base md:text-lg lg:text-lg">
                  Are you an association?
                </h6>

                <h6 className="text-darkest text-center text-base md:text-lg lg:text-lg">
                  Sign Up or Login to find Volunteers and potential Adopters.
                </h6>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
