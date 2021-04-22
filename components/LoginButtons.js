import { Button, Stack } from "@chakra-ui/react";

import { useAuth } from "@/lib/auth";
import { GithubIcon, GoogleIcon } from "@/public/icons";

const LoginButtons = () => {
  const { signinWithGoogle, signinWithGitHub } = useAuth();

  return (
    <Stack isInline>
      <Button
        onClick={() => signinWithGitHub()}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        leftIcon={<GithubIcon />}
        mt={4}
        _hover={{ bg: "gray.700" }}
        _active={{
          bg: "gray.800",
          transform: "scale(0.95)",
        }}
      >
        Continue with GitHub
      </Button>
      <Button
        onClick={() => signinWithGoogle()}
        backgroundColor="white"
        color="gray.900"
        variant="outline"
        fontWeight="medium"
        leftIcon={<GoogleIcon />}
        mt={4}
        _hover={{ bg: "gray.100" }}
        _active={{
          bg: "gray.100",
          transform: "scale(0.95)",
        }}
      >
        Continue with Google
      </Button>
    </Stack>
  );
};

export default LoginButtons;
