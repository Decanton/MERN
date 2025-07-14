import { Container, SimpleGrid, Text, VStack, Box } from "@chakra-ui/react"; // Added Box for potential future use or wrapping
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
    const { fetchProducts, products } = useProductStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);
    console.log("products", products);

    return (
        <Container maxW='container.xl' py={{ base: 8, md: 12 }}> {/* Responsive padding */}
            <VStack spacing={{ base: 6, md: 10 }}> {/* Responsive spacing */}
                <Text
                    fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }} // Responsive font sizes
                    fontWeight={"extrabold"} // Slightly bolder font weight
                    bgGradient={"linear(to-r, teal.400, green.500)"} // Changed gradient colors for a fresh look
                    bgClip={"text"}
                    textAlign={"center"}
                    pb={4} // Add some padding below the title
                >
                    Current Products <span role="img" aria-label="rocket">🚀</span>
                </Text>

                <SimpleGrid
                    columns={{
                        base: 1,
                        sm: 2, // Added a small breakpoint for 2 columns
                        md: 3,
                        lg: 4, // Increased to 4 columns on large screens for more density
                    }}
                    spacing={{ base: 6, md: 8, lg: 10 }} // Responsive spacing between grid items
                    w={"full"}
                >
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </SimpleGrid>

                {products.length === 0 && (
                    <Box textAlign="center" py={10}> {/* Wrapped in Box for better alignment and padding */}
                        <Text fontSize={{ base: "lg", md: "xl" }} fontWeight='medium' color='gray.600' mb={4}> {/* Slightly softer color and spacing */}
                            Currently, there are no items available in this category.
                        </Text>
                        <Link to={"/create"}>
                            <Text
                                as='span'
                                fontSize={{ base: "lg", md: "xl" }} // Match font size
                                color='blue.600' // Slightly darker blue for better contrast
                                _hover={{ textDecoration: "underline", color: "blue.700" }} // Darker hover state
                                fontWeight='semibold' // Make the link text a bit bolder
                            >
                                Create a Product
                            </Text>
                        </Link>
                    </Box>
                )}
            </VStack>
        </Container>
    );
};
export default HomePage;