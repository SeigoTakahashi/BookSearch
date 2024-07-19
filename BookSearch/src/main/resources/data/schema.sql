CREATE TABLE IF NOT EXISTS book (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50),
    src VARCHAR(300),
    pages INT(10),
    link VARCHAR(300),
    favorite BOOLEAN
);

CREATE TABLE IF NOT EXISTS favorite (
    favorite_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    book_id BIGINT,
    FOREIGN KEY (book_id) REFERENCES book(id)
);

