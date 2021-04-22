import React from "react";
import { NextSeo } from "next-seo";

const Page = ({ name, path, children }) => {
  const title = `Fast Feedback – ${name}`;
  const url = `https://fast-feedback-agus.vercel.app/${path}`;

  return (
    <>
      <NextSeo
        title={title}
        canonical={url}
        openGraph={{
          url,
          title,
        }}
      />
      {children}
    </>
  );
};

export default Page;
