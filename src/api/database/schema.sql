PRAGMA foreign_keys = true;

CREATE TABLE IF NOT EXISTS users (
	id CHAR(36) PRIMARY KEY, -- UUIDv7
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL, -- HASH + SALT !!!
);

CREATE TABLE IF NOT EXISTS counters (
	id CHAR(36) PRIMARY KEY, -- UUIDv7
	icon CHAR(2) NOT NULL,
	title VARCHAR(50) NOT NULL,
	type CHAR(1) NOT NULL CHECK(type IN ('r','p')), -- [R]egressive, [P]rogressive
	start_date CHAR(10) NOT NULL,
	end_date CHAR(10),
	description TEXT,
	hue INT NOT NULL CHECK(hue >= 0 AND hue <= 360),
	notify_interval CHAR(1) NOT NULL CHECK(notify_interval IN ('d','s','m','a')), -- [D]iario, [S]emanal, [M]ensal, [A]nual
	user_id CHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,

	CONSTRAINT verify_end_date_needed CHECK(
		(type = 'r' AND date(end_date) IS NOT NULL) OR
		(type = 'p' AND end_date IS NULL)
	),
	CONSTRAINT verify_start_date_format CHECK(
		date(start_date) IS NOT NULL
	)
);

CREATE TRIGGER IF NOT EXISTS date_fmt AFTER INSERT ON counters
    BEGIN
        UPDATE counters
        SET
            start_date = date(start_date);
            end_date = CASE
                WHEN end_date IS NOT NULL THEN date(end_date)
                ELSE NULL
            END
        WHERE id = NEW.id;
    END;
