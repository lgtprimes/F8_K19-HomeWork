CREATE TABLE customer (
    id SERIAL PRIMARY KEY,
    name TEXT,
    age INT,
    address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    created_by INT,
    modified_at TIMESTAMPTZ,
    modified_by INT,
    deleted_at TIMESTAMPTZ,
    deleted_by INT,
    active BOOL DEFAULT true
);

INSERT INTO  customer (name, age, address, created_by, active) VALUES
('Nguyễn Văn An', 25, 'Hà Nội', 1, true),
('Trần Thị Bình', 34, 'TP. Hồ Chí Minh', 1, true),
('Lê Văn Cường', 42, 'Hà Nội', 1, true),
('Phạm Thị Dung', 29, 'Đà Nẵng', 1, false),
('Hoàng Văn An', 31, 'Hải Phòng', 1, true),
('Vũ Thị Hoa', 22, 'Cần Thơ', 1, true),
('Đỗ Minh Tuấn', 38, 'Hà Nội', 1, false),
('Bùi Thị Mai', 27, 'Bình Dương', 1, true),
('Đặng Văn An', 45, 'Quảng Ninh', 1, true),
('Ngo Thi Khanh', 19, 'Hà Nội', 1, true),
('Dương Văn Hùng', 33, 'Đồng Nai', 1, false),
('Lý Thị Lan', 50, 'TP. Hồ Chí Minh', 1, true),
('Trịnh Văn Nam', 28, 'Thừa Thiên Huế', 1, true),
('Mai Văn An', 36, 'Hà Nội', 1, true),
('Phan Thị Yến', 24, 'Đà Nẵng', 1, true);


-- SELECT ACTIVE CUSTOMER
SELECT * FROM customer WHERE active = true;

-- SELECT CUSTOMER > 30
SELECT * FROM customer WHERE age > 30;

-- SELECT CUSTOMER FROM HANOI
SELECT * FROM customer WHERE address = 'Hà Nội';

-- SELECT CUSTOMER HAVE CHARACTER "An"
SELECT * FROM customer WHERE name ILIKE '%An%';

ALTER TABLE customer 
ADD COLUMN email TEXT,
ADD phone TEXT,
ADD gender TEXT;

UPDATE customer SET email = 'an.nguyen@gmail.com', phone = '0901234567', gender = 'Nam' WHERE id = 1;
UPDATE customer SET email = 'binh.tran@gmail.com', phone = '0912345678', gender = 'Nữ' WHERE id = 2;
UPDATE customer SET email = 'cuong.le@gmail.com', phone = '0923456789', gender = 'Nam' WHERE id = 3;
UPDATE customer SET email = 'lythilan@gmail.com', phone = '0963564852', gender = 'Nữ' WHERE id = 12;


UPDATE customer 
SET 
    address = 'TP. Hồ Chí Minh',
    age = 26,
    modified_at = NOW(),
    modified_by = 2
WHERE id = 1;


UPDATE customer 
SET 
    active = true,
    modified_at = NOW(),
    modified_by = 2
WHERE id = 4;