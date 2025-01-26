import { NextPage } from "next";
import Header from "@/components/Header";

const About: NextPage = () => {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <div className="m-4 max-w-3xl h-full mx-auto p-6">
        <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
          About Us
        </h1>
        <p className="text-lg text-gray-800 mb-4">
          At <strong>Your App Name</strong>, we believe in the power of small
          actions to create big change. Our mission is simple: to inspire and
          empower individuals to take meaningful actions toward environmental
          sustainability.
        </p>
        <p className="text-lg text-gray-800 mb-4">
          Through our platform, you can make a difference by sharing photos of
          yourself engaging in eco-friendly activities. These actions, whether
          it&apos;s cleaning up a local park, planting a tree, or reducing
          waste, serve as the seeds for virtual trees. Every tree you plant
          symbolizes your commitment to protecting the planet.
        </p>
        <p className="text-lg text-gray-800 mb-4">
          Not only do you get to document and share your eco-friendly actions,
          but you also have the opportunity to inspire others. As others
          discover your trees, they are motivated to take similar steps in their
          own lives. Our platform allows users to donate to the trees they
          discover, helping fuel even more environmental efforts.
        </p>
        <p className="text-lg text-gray-800 mb-4">
          The best part? You can plant your own virtual tree out of inspiration.
          Let the actions of others spark your own journey of sustainability,
          knowing that each tree planted contributes to a greater cause.
        </p>
        <p className="text-lg text-gray-800">
          Join us today and become part of a community that&apos;s planting the
          seeds for a better future, one tree at a time.
        </p>
      </div>
    </div>
  );
};

export default About;
