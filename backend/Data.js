import bcrypt from 'bcryptjs'
const data = {
    users: [
        {
            name: "Denis",
            email: "denis@mail.com",
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true
        },
        {
            name: "Syahputra",
            email: "syah@mail.com",
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false
        }
    ]
    ,
    products : 
    [
        {
            name: "Nike Slim Shirt",
            price: 120,
            countInStock: 4,
            category: 'Shits',
            rating: 4.5,
            image: '/images/p1.jpg',
            brand: 'Nike',
            numReviews: 10,
            description: 'high quality product'
        },
        
        {
            name: "Adidas Fit Shirt",
            price: 100,
            countInStock: 0,
            category: 'Shirts',
            rating: 4,
            image: '/images/p2.jpg',
            brand: 'Adidas',
            numReviews: 10,
            description: 'high quality product'
        },
        {
            name: "Lacoste Free Shirt",
            price: 105,
            countInStock: 15,
            category: 'Shirts',
            rating: 3.5,
            image: '/images/p3.jpg',
            brand: 'Lacoste',
            numReviews: 10,
            description: 'high quality product'
        },
        {
            name: "Puma Slim Pant",
            price: 120,
            countInStock: 30,
            category: 'Pant',
            rating: 4.5,
            image: '/images/p4.jpg',
            brand: 'Puma',
            numReviews: 10,
            description: 'high quality product'
        },
        {
            name: "Adidas Fit Pant",
            price: 120,
            countInStock: 1,
            category: 'Pant',
            rating: 5,
            image: '/images/p5.jpg',
            brand: 'Adidas',
            numReviews: 10,
            description: 'high quality product'
        },
        {
            name: "Adidas Fit Pant",
            price: 120,
            countInStock: 20,
            category: 'Pant',
            rating: 5,
            image: '/images/p6.jpg',
            brand: 'Adidas',
            numReviews: 10,
            description: 'high quality product'
        }
    ]
}

export default data;