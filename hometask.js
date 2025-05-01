const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sadiaraja25:lC0W9k9GLrnztjlF@sp22-bcs-088.cppnbcg.mongodb.net/labDB?retryWrites=true&w=majority&appName=sp22-bcs-088', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('✅ Connected to MongoDB Atlas!');

    const ProductSchema = new mongoose.Schema({
        name: String,
        price: Number,
        category: String,
        inStock: Boolean
    });

    const Product = mongoose.model('Product', ProductSchema);

    const Products = [
        { name: 'Kettle', price: 2100, category: 'B', inStock: true },
        { name: 'Refrigerator', price: 22000, category: 'A', inStock: false },
        { name: 'Toaster', price: 2300, category: 'C', inStock: true }
    ];

    Product.insertMany(Products)
        .then(() => {
            console.log('✅ Products inserted!');
            return Product.find();
        })
        .then(allProducts => {
            console.log('📋 All Products:', allProducts);

            return Product.updateOne({ name: 'Kettle' }, { $set: { price: 21000 } });
        })
        .then(updateResult => {
            console.log('🔄 Product updated:', updateResult);

            return Product.findOne({ name: 'Toaster' });
        })
        .then(productToDelete => {
            if (productToDelete) {
                return Product.findByIdAndDelete(productToDelete._id);
            } else {
                throw new Error('Product not found for deletion.');
            }
        })
        .then(() => {
            console.log('❌ Product deleted!');
            mongoose.connection.close();
        })
        .catch(err => console.log('❗ Error:', err));
        


})
.catch(err => console.error('❌ Connection error:', err));
