const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// search any product by name
const getProductsByTerm = async (req, res) => {
    const searchString = req.params.term;
    try {
        const prods = await prisma.products.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: searchString,
                        },
                    },
                    {
                        category: {
                            contains: searchString,
                        },
                    },
                    {
                        description: {
                            contains: searchString,
                        },
                    },
                ],
            },
        });
        
        if (!prods || prods.length === 0) {
            res.status(404).json({ message: 'Product not found!' });
        } else {
            res.status(200).json(prods);
        }
    } catch (err) {
        console.error(err); // แสดงข้อผิดพลาดใน console
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getProductsByTerm };
