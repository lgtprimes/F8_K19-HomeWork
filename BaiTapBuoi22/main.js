const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const invoiceData = {
    meta: {
        invoiceNo: "WM-20260521-0001",
        saleDate: "2026/05/21",
        currency: "VND",
        paymentMethod: "Cash",
    },

    seller: {
        name: "WinMark 2 Ba Trung",
        address: "2 Ba Trung - HN",
        phone: "012345678",
        representative: "Đại diện WinMark",
    },

    customer: {
        name: "Nguyen Van A",
        age: 20,
        address: "Ha Dong, Ha Noi",
    },
    items: [
        {
        no: 1,
        name: "Ao Thun",
        size: "XL",
        quantity: 1,
        price: 200000,
        },
        {
        no: 2,
        name: "Ao Thun",
        size: "XL",
        quantity: 1,
        price: 200000,
        },
    ],
    promotion: {
        description: "Khuyến mãi 50% dành cho khách hàng thân thiết",
        discountPercent: 50,
    },
};

const itemsHTML = invoiceData.items.map(item => {
    return `
        <tr>
            <td>${item.no}</td>
            <td>${item.name}</td>
            <td>${item.size}</td>
            <td>${item.quantity}</td>
            <td>${item.price.toLocaleString()}đ</td>
            <td class="table__price">${(item.price * item.quantity).toLocaleString()}đ</td>
        </tr>
    `;
}).join("");

const subtotal = invoiceData.items.reduce((total, item) => {
    return total + item.price * item.quantity;
}, 0);

const discount = subtotal * (invoiceData.promotion.discountPercent / 100);

const finalTotal = subtotal - discount;
 
const invoiceContainer = $('#invoice');

invoiceContainer.innerHTML = `
    <header class="header">
        <div class="header__left">
            <div class="header__brand">
                <div class="header__logo">WM</div>
                <h1>${invoiceData.seller.name}</h1>
            </div>
            <p class="header__desc">Cung cấp sản phẩm thời trang cao cấp & thiết kế độc quyền</p>
        </div>
        <div class="header__right">
            <div class="invoice__badge">
                HÓA ĐƠN BÁN LẺ
            </div>
            <p class="invoice__meta">
              <strong>Mã số:</strong>
              ${invoiceData.meta.invoiceNo}
            </p>
            <p class="invoice__meta">
              Ngày bán:
              <strong class="invoice__date">${invoiceData.meta.saleDate}</strong>
            </p>
        </div>
    </header>
    <section class="info">
        <div class="info__box">
            <div class="info__label">ĐƠN VỊ BÁN HÀNG (SELLER)</div>

            <h2 class="info__name">${invoiceData.seller.name}</h2>

            <p class="info__text">
                <i class="fa-solid fa-location-dot"></i> ${invoiceData.seller.address}
            </p>

            <p class="info__text">
                <i class="fa-solid fa-phone"></i> ${invoiceData.seller.phone}
            </p>
        </div>
        <div class="info__box">
            <div class="info__label">KHÁCH HÀNG (BUYER)</div>

            <h2 class="info__name">${invoiceData.customer.name}</h2>

            <p class="info__text">
                <span>Tuổi:</span> ${invoiceData.customer.age}
            </p>

            <p class="info__text">
                <i class="fa-regular fa-map"></i> ${invoiceData.customer.address}
            </p>
        </div>
    </section>
    <table>
        <thead>
            <tr>
                <th>STT</th>
                <th>TÊN SẢN PHẨM</th>
                <th>SIZE</th>
                <th>SL</th>
                <th>ĐƠN GIÁ</th>
                <th>THÀNH TIỀN</th>
            </tr>
        </thead>
        <tbody>
            ${itemsHTML}
        </tbody>
    </table>
    <section class="summary">
        <div class="promotion">
            <div class="check-box">
                <i class="checked-icon fa-solid fa-circle-check"></i>
            </div>
            <div>
                <div class="promotion__title">KHUYẾN MÃI / TRỢ GIÁ</div>
                <p class="promotion__desc">
                  ${invoiceData.promotion.description}
                </p>
            </div>
        </div>
        <div class="totals">
            <div class="totals__row">
                <span>Cộng tiền hàng:</span>
                <strong>${subtotal.toLocaleString()} đ</strong>
            </div>
            <div class="totals__row discount">
                <span>Khấu trừ giảm giá:</span>
                <strong>-${discount.toLocaleString()} đ</strong>
            </div>
            <div class="final__total">
                <span>Tổng thanh toán:</span>
                <strong>${finalTotal.toLocaleString()} đ</strong>
            </div>
        </div>
    </section>
`;



