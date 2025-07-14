import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { useState, useCallback } from "react"; // Added useCallback for potential future memoization
import { useProductStore } from "../store/product";

const CreatePage = () => {
    // State to manage the new product's details
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: "",
    });
    const toast = useToast(); // Chakra UI toast hook for notifications

    // Accessing the createProduct action from your Zustand store
    const { createProduct } = useProductStore();

    // Memoized callback for handling product addition to prevent unnecessary re-renders
    const handleAddProduct = useCallback(async () => {
        // Log the product data being sent for debugging/information
        console.log("Attempting to add product:", newProduct);

        // Call the createProduct action from the store
        const { success, message } = await createProduct(newProduct);

        // Display toast notification based on the API response
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });
        }
        // Reset the form fields after attempting to add the product
        setNewProduct({ name: "", price: "", image: "" });
    }, [createProduct, newProduct, toast]); // Dependencies for useCallback

    // Determine background and border colors based on the current color mode
    const bgColor = useColorModeValue("whiteAlpha.900", "gray.700");
    const formBgColor = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.200", "gray.600");

    return (
        <Container
            maxW={{ base: "container.sm", md: "container.md" }}
            py={{ base: 8, md: 12 }}
            px={{ base: 4, md: 0 }}
            bg={bgColor}
            borderRadius="xl"
            boxShadow="lg"
            borderWidth="1px"
            borderColor={borderColor}
        >
            <VStack spacing={{ base: 6, md: 10 }}>
                <Heading
                    as={"h1"}
                    size={{ base: "xl", md: "2xl" }}
                    textAlign={"center"}
                    mb={{ base: 4, md: 6 }}
                    color={useColorModeValue("gray.800", "whiteAlpha.900")}
                    fontWeight="extrabold"
                    letterSpacing="wide"
                >
                    Create New Product
                </Heading>

                <Box
                    w={"full"}
                    bg={formBgColor}
                    p={{ base: 6, md: 8 }}
                    rounded={"xl"}
                    shadow={"xl"}
                    borderWidth="1px"
                    borderColor={borderColor}
                >
                    <VStack spacing={{ base: 4, md: 6 }}>
                        <Input
                            placeholder='Product Name'
                            name='name'
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            size="lg"
                            variant="filled"
                            focusBorderColor="teal.400"
                            _placeholder={{ color: useColorModeValue("gray.500", "gray.400") }}
                        />
                        <Input
                            placeholder='Price'
                            name='price'
                            type='number'
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            size="lg"
                            variant="filled"
                            focusBorderColor="teal.400"
                            _placeholder={{ color: useColorModeValue("gray.500", "gray.400") }}
                        />
                        <Input
                            placeholder='Image URL'
                            name='image'
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                            size="lg"
                            variant="filled"
                            focusBorderColor="teal.400"
                            _placeholder={{ color: useColorModeValue("gray.500", "gray.400") }}
                        />

                        <Button
                            colorScheme='teal'
                            onClick={handleAddProduct}
                            w='full'
                            size="lg"
                            mt={{ base: 4, md: 6 }}
                            _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                            transition="all 0.2s ease-in-out"
                            leftIcon={<Box as="span" role="img" aria-label="add" fontSize="xl">➕</Box>}
                        >
                            Add Product
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};
export default CreatePage;