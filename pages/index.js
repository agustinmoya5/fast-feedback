import Head from "next/head";
import { Box, Button, Flex, Text, Link, Stack } from "@chakra-ui/react";

import { useAuth } from "@/lib/auth";
import { getAllFeedback, getSite } from "@/lib/db-admin";
import Feedback from "@/components/Feedback";
import FeedbackLink from "@/components/FeedbackLink";
import LoginButtons from "@/components/LoginButtons";
import Footer from "@/components/Footer";

import { FastFeedbackIcon } from "@/public/icons";

const SITE_ID = "GBxxkac8bI4MuAP6fo8V";

export async function getStaticProps(context) {
  const { feedback } = await getAllFeedback(SITE_ID);
  const { site } = await getSite(SITE_ID);

  return {
    props: {
      allFeedback: feedback,
      site,
    },
    revalidate: 1,
  };
}

const Home = ({ allFeedback, site }) => {
  const { user } = useAuth();

  return (
    <>
      <Box bg="gray.100" py={16}>
        <Flex as="main" direction="column" maxW="700px" margin="0 auto">
          <Head>
            <script
              dangerouslySetInnerHTML={{
                __html: `
              if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
                window.location.href = "/sites"
              }
            `,
              }}
            />
          </Head>
          <FastFeedbackIcon color="black.500" boxSize="64px" mb={2} />
          <Text mb={4} fontSize="lg" py={4}>
            <Text as="span" fontWeight="bold" display="inline">
              Fast Feedback
            </Text>
            {" is being built as part of "}
            <Link
              href="https://react2025.com"
              isExternal
              textDecoration="underline"
            >
              React 2025
            </Link>
            {`. It's the easiest way to add comments or reviews to your static site. It's still a work-in-progress, but you can try it out by logging in.`}
          </Text>
          {user ? (
            <Button
              as="a"
              href="/sites"
              backgroundColor="gray.900"
              color="white"
              fontWeight="medium"
              mt={4}
              maxW="200px"
              _hover={{ bg: "gray.700" }}
              _active={{
                bg: "gray.800",
                transform: "scale(0.95)",
              }}
            >
              View Dashboard
            </Button>
          ) : (
            <LoginButtons />
          )}
        </Flex>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        width="full"
        maxWidth="700px"
        margin="0 auto"
        mt={8}
      >
        <FeedbackLink paths={[SITE_ID]} />
        {allFeedback.map((feedback, index) => (
          <Feedback
            key={feedback.id}
            settings={site?.settings}
            isLast={index === allFeedback.length - 1}
            {...feedback}
          />
        ))}
      </Box>
      <Footer />
    </>
  );
};

export default Home;
