import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Product from "../../components/Product";


export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [featured, setFeatured] = useState([]);

    console.log(product);
    
    useEffect( () => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
        .then(res => setProduct(res.data));
        axios.get("https://fakestoreapi.com/products")
        .then(res => {
        const all = res.data;
        // chọn ngẫu nhiên 4–8 sản phẩm
        const random = all.sort(() => 0.5 - Math.random()).slice(0, 6);
        setFeatured(random);
        });
    }, [id])

    if (!product) return <p>Đang tải...</p>;

    return (
        <div className="product-detail">
            <div className="product-detail-image">
                <img src={product.image} alt={product.title}/>
            </div>

            <div className="product-detail-info">
                <div className="product-category">{product.category}</div>
                <h2>{product.title}</h2>
                <p className="description">{product.description}   </p>
                <div className="product-rating">⭐ {product.rating.rate} ({product.rating.count})</div>
                <div className="product-bottom">
                <strong>${product.price}</strong>
                <button>Add to cart</button>
                </div>
            </div>


            <h3>Sản phẩm nổi bật</h3>
            <div className="featured-grid">
            {featured.map(item => (
                <Product key={item.id} product={item} showButton={false}/>
            ))}
            </div>

        </div>

    )
}