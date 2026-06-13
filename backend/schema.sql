-- ─────────────────────────────────────────────────────────────────────────────
-- Volunteers Table
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS volunteers (
  id               INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name             VARCHAR(100) NOT NULL,
  email            VARCHAR(150) NOT NULL UNIQUE,
  phone            VARCHAR(20)  DEFAULT NULL,
  skills           TEXT         DEFAULT NULL,   -- comma-separated e.g. "Teaching,Coding"
  availability     TEXT         DEFAULT NULL,   -- comma-separated e.g. "Weekends,Weekday Evenings"
  area_of_interest VARCHAR(100) DEFAULT NULL,
  created_at       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_area   (area_of_interest),
  INDEX idx_email  (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─────────────────────────────────────────────────────────────────────────────
-- Contacts Table
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contacts (
  id         INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(150) NOT NULL,
  message    TEXT         NOT NULL,
  created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─────────────────────────────────────────────────────────────────────────────
-- Programs Table
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS programs (
  id          INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(100) NOT NULL,
  description TEXT         DEFAULT NULL,
  category    ENUM('education','environment','community') NOT NULL,
  icon        VARCHAR(50)  DEFAULT NULL,
  active      TINYINT(1)   NOT NULL DEFAULT 1,
  created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_active   (active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─────────────────────────────────────────────────────────────────────────────
-- Seed: Default Programs
-- ─────────────────────────────────────────────────────────────────────────────
INSERT IGNORE INTO programs (title, description, category, icon) VALUES
  ('Education Program',       'Bridging the education gap through mentoring and digital literacy.',               'education',   'BookOpen'),
  ('Environment Program',     'Tree plantation drives, waste management, and eco-awareness campaigns.',           'environment', 'Leaf'),
  ('Community Support',       'Health camps, women empowerment, and senior citizen outreach initiatives.',        'community',   'HandHeart');
