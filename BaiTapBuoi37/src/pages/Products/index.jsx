import { useEffect, useState } from 'react'
import api from "../../plugins/axios.js"
import Product from '../../components/Product/index.jsx'
import HeaderBar from '../../components/HeaderBar/index.jsx'

export default function Products() {
    const [products, setProducts] = useState([])
    const [productsInCart, setProductsInCart] = useState([])

    const getProducts = async () => {
        const { data } = await api.get('products');
        setProducts(data);
    }

    const onAddToCart = (productId) => {
        if(productsInCart.includes(productId)) return;
        setProductsInCart([...productsInCart, productId])
    }

    useEffect(() => {
        const fetchData = async () => {
            await getProducts()
        }   
        fetchData();
    }, [])

    return (
        <>
            <HeaderBar />

            <main className="container">
                <h1>Products</h1>

                <div className="product-grid">
                {products.map((product) => (
                    <Product product={product} onClickAddToCart={onAddToCart}/>
                ))}
                </div>
            </main>
        </>
    )
}