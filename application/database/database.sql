CREATE DATABASE users IF NOT EXIST (
    user_id INT PRIMARY KEY,
    name VARCHAR(32) NOT NULL,
    password_hash VARCHAR(128),
    password_salt VARCHAR(128),
    email VARCHAR(128),
    twitter_display_name VARCHAR(32),
    twitter_id BIGINT,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    destroyed_at DATETIME NOT NULL
) InnoDB;

CREATE DATABASE cards IF NOT EXIST (
    card_id INT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(32) NOT NULL,
    cost TINYINT(32) NOT NULL,
    image_url VARCHAR(128) NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    destroyed_at DATETIME NOT NULL,
    INDEX user_id
);

CREATE DATABASE skills IF NOT EXIST (
    skill_id INT PRIMARY KEY,
    card_id INT NOT NULL,
    name VARCHAR(32) NOT NULL,
    cost TINYINT(32) NOT NULL DEFAULT 0,
    effect VARCHAR(1024) NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    destroyed_at DATETIME NOT NULL,
    INDEX card_id
) InnoDB;

CREATE DATABASE 'result' IF NOT EXIST (
    result_id INT PRIMARY KEY,
    supply_id INT NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    destroyed_at DATETIME NOT NULL,
) InnoDB;

CREATE DATABASE result_user_relations IF NOT EXIST(
    id INT PRIMARY KEY,
    result_id PRIMARY KEY,
    user_id INT NOT NULL,
);

CREATE DATABASE supply IF NOT EXIST (
    id INT PRIMARY KEY,
    user_id INT NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    destroyed_at DATETIME NOT NULL,
);
