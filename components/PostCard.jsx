import {
  Flex,
  Text,
  Box,
  useDisclosure,
  Collapse,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";

const PostCard = ({ post }) => {
  const { isOpen, onToggle } = useDisclosure();
  const [comments, setComments] = useState(null);
  const { id, title, body } = post;
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    setLoading(true);
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${id}`
    );
    const data = await res.json();
    if (data) {
      setComments(data);
    }
    setLoading(false);
  };
  return (
    <Flex
      p={6}
      flexDir="column"
      bgColor="gray.200"
      borderRadius={12}
      mt={6}
      shadow="sm"
      onClick={() => {
        onToggle();
        fetchComments();
      }}
    >
      <Text mb={4} textAlign="center" fontWeight="bold">
        {title}
      </Text>
      <Text>{body}</Text>
      <Collapse in={isOpen} animateOpacity>
        <Box
          p="40px"
          color="white"
          mt="4"
          bg="teal.500"
          rounded="md"
          shadow="md"
        >
          {loading && (
            <Flex justifyContent="center">
              <Spinner mt={8} mb={8} />
            </Flex>
          )}
          {comments?.map(({ id, body, name, email }, index) => {
            return (
              <Flex
                key={id}
                bgColor={index % 2 === 0 ? "teal.200" : "teal.300"}
                borderRadius={4}
                mb={4}
                p={6}
                shadow="md"
                flexDir="column"
              >
                <Text key={id} fontSize={14} fontWeight="semibold">
                  {email}
                </Text>
                <Text key={id} fontSize={14} fontWeight="medium" mb={4}>
                  {name}
                </Text>
                <Text>{body}</Text>
              </Flex>
            );
          })}
        </Box>
      </Collapse>
    </Flex>
  );
};

export default PostCard;
