

export default function HeaderBar() {
    return (
        <header className="header">
            <div className="header-inner">
            <div className="logo">
                Shop<span>.</span>
            </div>

            <nav className="nav">
                <a href="#">Home</a>
                <a href="#">Products</a>
                <a href="#">Categories</a>
            </nav>

            <div className="cart">
                <button className="cart-button">
                <span className="cart-icon">🛒</span>
                <span className="cart-text">Cart</span>
                <span className="cart-badge">
                    2
                </span>
                </button>
            </div>
            </div>
        </header>
    )
}