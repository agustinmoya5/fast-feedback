import Head from "next/head";
import { Box, Button, Flex, Text, Link, Stack } from "@chakra-ui/react";

import { useAuth } from "@/lib/auth";
import { getAllFeedback } from "@/lib/db-admin";
import Feedback from "@/components/Feedback";
import FeedbackLink from "@/components/FeedbackLink";

import { FastFeedbackIcon, GithubIcon, GoogleIcon } from "@/public/icons";

const SITE_ID = "GBxxkac8bI4MuAP6fo8V";

export async function getStaticProps(context) {
  const { feedback } = await getAllFeedback(SITE_ID);

  return {
    props: {
      allFeedback: feedback,
    },
    revalidate: 1,
  };
}

const Home = ({ allFeedback }) => {
  const { user, signinWithGoogle, signinWithGitHub } = useAuth();

  return (
    <>
      <Box bg="gray.100" py={16}>
        <Flex as="main" direction="column" maxW="700px" margin="0 auto">
          <Head>
            <script
              dangerouslySetInnerHTML={{
                __html: `
              if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
                window.location.href = "/dashboard"
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
              href="/dashboard"
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
            <Stack isInline>
              <Button
                onClick={(e) => signinWithGitHub()}
                backgroundColor="gray.900"
                color="white"
                fontWeight="medium"
                leftIcon={<GithubIcon />}
                size="lg"
                _hover={{ bg: "gray.700" }}
                _active={{
                  bg: "gray.800",
                  transform: "scale(0.95)",
                }}
              >
                Sign In with GitHub
              </Button>
              <Button
                onClick={(e) => signinWithGoogle()}
                backgroundColor="white"
                color="gray.900"
                variant="outline"
                fontWeight="medium"
                leftIcon={<GoogleIcon />}
                size="lg"
                _hover={{ bg: "gray.100" }}
                _active={{
                  bg: "gray.100",
                  transform: "scale(0.95)",
                }}
              >
                Sign In with Google
              </Button>
            </Stack>
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
        <FeedbackLink siteId={SITE_ID} />
        {allFeedback.map((feedback) => (
          <Feedback key={feedback.id} {...feedback} />
        ))}
      </Box>
    </>
  );
};

export default Home;
