import React from "react";
import Link from "next/link";

const ThankYouPage: React.FC = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Thank You!</h1>
      <p>We appreciate your donation.</p>
      <Link href="/">Go Home</Link>
    </div>
  );
};

export default ThankYouPage;
