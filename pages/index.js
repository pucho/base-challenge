import { Container, Flex } from "@chakra-ui/react";
import PostCard from "../components/PostCard";

export default function Home(props) {
  const { error, data } = props;
  return (
    <Container maxW="container.sm" bgColor="gray.100">
      <Flex
        flexDir="column"
        alignItems="center"
        alignItems="center"
        justifyContent="center"
      >
        {error && <h1>{error}</h1>}
        {data.map((post) => {
          return <PostCard post={post} key={post.id} />;
        })}
      </Flex>
    </Container>
  );
}

export async function getServerSideProps(context) {
  //TODO update with env file api url
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  if (!data) {
    return {
      error: "There's been an error, please reload",
    };
  }
  return {
    props: { data }, // will be passed to the page component as props
  };
}
