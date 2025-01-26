import Header from "@/components/Header";
import Link from "next/link";

const Home = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full scale-150 h-full object-cover filter blur-lg z-0"
      >
        <source src="/landingVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="bg-black bg-opacity-20 relative flex flex-col z-10 h-full">
        <Header />
        {/* Content on top of the video */}
        <div className=" relative text-center z-10 flex flex-col m-auto h-full justify-center align-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-200">
            Welcome to Tree Planting
          </h1>
          <p className="mb-6 text-lg text-gray-400">
            Join us in making a positive impact on the environment by planting
            trees!
          </p>
          <div className="flex flex-row align-center justify-center gap-6">
            <Link href="/plant">
              <button className="rounded-lg w-40 bg-green-500 py-2 px-4 text-white hover:text-gray-200 hover:bg-green-600">
                Start Planting
              </button>
            </Link>
            <Link href="/explore">
              <button className="rounded-lg w-40 bg-green-500 py-2 px-4 text-white hover:text-gray-200 hover:bg-green-600">
                Explore
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
