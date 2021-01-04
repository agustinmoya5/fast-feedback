import Head from "next/head";
import { Button, Flex } from "@chakra-ui/react";

import { useAuth } from "@/lib/auth";

import { FastFeedbackIcon } from "@/public/icons";

const Home = () => {
  const { user, signinWithGithub } = useAuth();

  return (
    <Flex
      as="main"
      direction="column"
      align="center"
      justify="center"
      h="100vh"
    >
      <Head>
        <title>Fast Feedback</title>
      </Head>

      <FastFeedbackIcon color="black.500" boxSize="64px" />

      {user ? (
        <Button as="a" href="/dashboard">
          View Dashboard
        </Button>
      ) : (
        <Button mt={4} size="sm" onClick={(e) => signinWithGithub()}>
          Sign In
        </Button>
      )}
    </Flex>
  );
};

export default Home;
