import {
  Flex,
  Text,
  Box,
  useDisclosure,
  Collapse,
  Spinner,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Textarea,
  Input,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";

const Comment = ({ body, name, email }, index) => {
  return (
    <Flex
      bgColor={index % 2 === 0 ? "teal.200" : "teal.300"}
      borderRadius={4}
      mb={4}
      p={6}
      shadow="md"
      flexDir="column"
    >
      <Text fontSize={14} fontWeight="semibold">
        {email}
      </Text>
      <Text fontSize={14} fontWeight="medium" mb={4}>
        {name}
      </Text>
      <Text>{body}</Text>
    </Flex>
  );
};

const PostCard = ({ post }) => {
  const { isOpen, onToggle } = useDisclosure();
  const [comments, setComments] = useState([]);
  const [clientComments, setClientComments] = useState([]);
  const { id, title, body } = post;
  const [loading, setLoading] = useState(false);

  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [comment, setComment] = useState("");

  const fetchComments = async () => {
    if (!isOpen) {
      setLoading(true);
    }
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    );
    const data = await res.json();
    if (data) {
      setComments(data);
    }
    setLoading(false);
  };

  const updateClientComments = () => {
    setClientComments((prevComments) => [
      ...prevComments,
      { email: userEmail, name: userName, body: comment },
    ]);
    setUserEmail("");
    setUserName("");
    setComment("");
  };

  return (
    <Flex
      p={6}
      flexDir="column"
      bgColor="gray.200"
      borderRadius={12}
      mt={6}
      shadow="sm"
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
          {loading ? (
            <Flex justifyContent="center">
              <Spinner mt={8} mb={8} />
            </Flex>
          ) : (
            <>
              {[...comments, ...clientComments].map((comment, index) => {
                return <Comment {...comment} index={index} key={index} />;
              })}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateClientComments();
                }}
              >
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    onChange={(e) => {
                      setUserEmail(e.target.value);
                    }}
                    value={userEmail}
                  />
                </FormControl>
                <FormControl id="name" isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                    value={userName}
                  />
                </FormControl>
                <FormControl id="comment" isRequired>
                  <FormLabel>Comment</FormLabel>
                  <Textarea
                    placeholder="Here is a sample placeholder"
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                    value={comment}
                  />
                </FormControl>
                <Button type="submit" colorScheme="blackAlpha" mt={4}>
                  Submit Comment
                </Button>
              </form>
            </>
          )}
        </Box>
      </Collapse>
      <Button
        mt={6}
        alignSelf="center"
        w={36}
        onClick={() => {
          onToggle();
          fetchComments();
        }}
      >{`${isOpen ? "Close" : "View"} comments`}</Button>
    </Flex>
  );
};

export default PostCard;
