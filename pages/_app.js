import { ChakraProvider } from "@chakra-ui/react";
import { Global, css } from "@emotion/react";
import { MDXProvider } from "@mdx-js/react";

import { DefaultSeo } from "next-seo";
import Head from "next/head";

import MDXComponents from "@/components/MDXComponents";
import { AuthProvider } from "@/lib/auth";

import customTheme from "@/styles/theme";

import SEO from "../next-seo.config";

const GlobalStyle = ({ children }) => {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <Global
        styles={css`
          html {
            scroll-behavior: smooth;
          }
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
        `}
      />
      {children}
    </>
  );
};

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={customTheme}>
      <AuthProvider>
        <MDXProvider components={MDXComponents}>
          <DefaultSeo {...SEO} />
          <GlobalStyle />
          <Component {...pageProps} />
        </MDXProvider>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default App;
