// controllers/products.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a product
const createProduct = async (req, res) => {
    const { name, description, price, category, image_url } = req.body;
    try {
        const product = await prisma.products.create({
            data: {
                name,
                description,
                price,
                category,
                image_url,
            },
        });
        res.status(201).json({ message: 'Product created', product });
    } catch (error) {
        console.error('Error creating product:', error); // แสดงข้อผิดพลาดใน console
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

// Update a product
const updateProduct = async (req, res) => {
    const { id } = req.params; // ควรใช้ชื่อ product_id แทน id
    const { name, description, price, category, image_url } = req.body;

    try {
        const product = await prisma.products.update({
            where: { product_id: Number(id) }, // ใช้ product_id แทน id
            data: { name, description, price, category, image_url },
        });
        res.status(200).json({ message: 'Product updated', product });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};


// Delete a product
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.products.delete({
            where: { product_id: Number(id) },
        });
        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        console.error('Error deleting product:', error); // แสดงข้อผิดพลาดใน console
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};

// Get a product
const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await prisma.products.findUnique({
            where: { product_id: Number(id) },
        });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error); // แสดงข้อผิดพลาดใน console
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
};

// Search products by name or category
const getProductsByTerm = async (req, res) => {
    const { term } = req.params;
    try {
        const products = await prisma.products.findMany({
            where: {
                OR: [
                    { name: { contains: term } },
                    { category: { contains: term } },
                ],
            },
        });
        res.status(200).json(products);
    } catch (error) {
        console.error('Error searching products:', error); // แสดงข้อผิดพลาดใน console
        res.status(500).json({ message: 'Error searching products', error: error.message });
    }
};

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await prisma.products.findMany();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error); // แสดงข้อผิดพลาดใน console
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

// Export all functions
module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getProductsByTerm,
    getProducts,
};
