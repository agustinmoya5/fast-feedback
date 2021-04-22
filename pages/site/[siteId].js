import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { Box, FormControl, Textarea, Button } from "@chakra-ui/react";

import { useAuth } from "@/lib/auth";
import { createFeedback } from "@/lib/db";
import { getAllFeedback, getAllSites, getSite } from "@/lib/db-admin";
import Feedback from "@/components/Feedback";
import DashboardShell from "@/components/DashboardShell";
import SiteHeader from "@/components/SiteHeader";
import LoginButtons from "@/components/LoginButtons";

export async function getStaticProps(context) {
  const siteId = context.params.siteId;
  const { feedback } = await getAllFeedback(siteId);
  const { site } = await getSite(siteId);

  return {
    props: {
      initialFeedback: feedback,
      site,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { sites } = await getAllSites();
  const paths = sites.map((site) => ({
    params: {
      siteId: site.id.toString(),
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

const FeedbackPage = ({ initialFeedback, site }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const inputEl = useRef(null);
  const [allFeedback, setAllFeedback] = useState(initialFeedback);

  const onSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      author: user.name,
      authorId: user.uid,
      siteId: router.query.siteId,
      text: inputEl.current.value,
      createdAt: new Date().toISOString(),
      provider: user.provider,
      status: "pending",
    };

    inputEl.current.value = "";
    setAllFeedback([newFeedback, ...allFeedback]);
    createFeedback(newFeedback);
  };

  const LoginOrLeaveFeedback = () =>
    user ? (
      <Button
        type="submit"
        isDisabled={router.isFallback}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        mt={4}
        _hover={{ bg: "gray.700" }}
        _active={{
          bg: "gray.800",
          transform: "scale(0.95)",
        }}
      >
        Leave Feedback
      </Button>
    ) : (
      <LoginButtons />
    );

  return (
    <DashboardShell>
      <SiteHeader siteName={site?.name} />
      <Box
        display="flex"
        mx={4}
        flexDirection="column"
        width="full"
        maxWidth="700px"
      >
        <Box as="form" onSubmit={onSubmit}>
          <FormControl mb={8}>
            <Textarea
              ref={inputEl}
              id="comment"
              placeholder="Leave a comment"
              h="100px"
              background="white"
            />
            {!loading && <LoginOrLeaveFeedback />}
          </FormControl>
        </Box>
        {allFeedback &&
          allFeedback.map((feedback) => (
            <Feedback key={feedback.id} {...feedback} />
          ))}
      </Box>
    </DashboardShell>
  );
};

export default FeedbackPage;