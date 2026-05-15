CREATE TABLE IF NOT EXISTS users (
      userId VARCHAR(255) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      deletion BIT DEFAULT 0,
      locked BIT DEFAULT 0
    )