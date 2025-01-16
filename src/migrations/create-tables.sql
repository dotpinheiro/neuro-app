CREATE TYPE scope_enum AS ENUM ('user', 'doctor', 'caregiver');
CREATE TYPE sex_enum AS ENUM ('m', 'f');
CREATE TYPE dosage_enum AS ENUM ('ml', 'mg', 'g', 'pills', 'drops');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    phone VARCHAR(255)
);

CREATE TABLE profiles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    age INT,
    sex sex_enum,
    height FLOAT,
    weight FLOAT,
    img TEXT,
    medication_started_at DATE
);

CREATE TABLE user_profiles (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    profile_id INT NOT NULL,
    scope scope_enum,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
);

CREATE TABLE profile_medications (
    id SERIAL PRIMARY KEY,
    profile_id INT NOT NULL,
    medication_name VARCHAR(255),
    medication_manufacturer VARCHAR(255),
    medication_description TEXT,
    medication_img TEXT,
    FOREIGN KEY (profile_id) REFERENCES user_profiles(id) ON DELETE CASCADE
);

CREATE TABLE profile_medications_schedule (
    id SERIAL PRIMARY KEY,
    profile_medication_id INT NOT NULL,
    schedule TIMESTAMP,
    dosage dosage_enum,
    FOREIGN KEY (profile_medication_id) REFERENCES profile_medications(id) ON DELETE CASCADE
);

CREATE TABLE base_medications (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    manufacturer VARCHAR(255),
    description TEXT,
    img TEXT
);
