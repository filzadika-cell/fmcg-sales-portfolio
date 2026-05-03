-- =====================================================================
-- FMCG SALES PERFORMANCE ANALYSIS
-- File: 01_schema_and_load.sql
-- Purpose: Define database schema and load CSV data
-- Author: [Your Name]
-- =====================================================================

-- ---------------------------------------------------------------------
-- DROP TABLES IF EXIST (for clean re-runs)
-- ---------------------------------------------------------------------
DROP TABLE IF EXISTS sales_transactions;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS principals;
DROP TABLE IF EXISTS branches;

-- ---------------------------------------------------------------------
-- 1. BRANCHES TABLE
-- Stores cabang/branch master data across Indonesia
-- ---------------------------------------------------------------------
CREATE TABLE branches (
    branch_id     VARCHAR(10) PRIMARY KEY,    -- Unique branch code (e.g., BR001)
    branch_name   VARCHAR(50) NOT NULL,       -- Human-readable branch name
    region        VARCHAR(30) NOT NULL,       -- Geographic region grouping
    manager       VARCHAR(50)                 -- Branch manager name
);

-- ---------------------------------------------------------------------
-- 2. PRINCIPALS TABLE
-- Stores principal/distributor partner master data
-- ---------------------------------------------------------------------
CREATE TABLE principals (
    principal_id    VARCHAR(10) PRIMARY KEY,
    principal_name  VARCHAR(50) NOT NULL,
    category        VARCHAR(30) NOT NULL,
    contract_start  DATE
);

-- ---------------------------------------------------------------------
-- 3. PRODUCTS TABLE
-- Stores product catalog with pricing
-- ---------------------------------------------------------------------
CREATE TABLE products (
    product_id     VARCHAR(10) PRIMARY KEY,
    product_name   VARCHAR(100) NOT NULL,
    principal_id   VARCHAR(10) NOT NULL,
    category       VARCHAR(30),
    cost_price     DECIMAL(12,2),     -- HPP (Harga Pokok)
    selling_price  DECIMAL(12,2),     -- Harga Jual
    FOREIGN KEY (principal_id) REFERENCES principals(principal_id)
);

-- ---------------------------------------------------------------------
-- 4. SALES_TRANSACTIONS TABLE
-- Fact table: every individual sales line item
-- ---------------------------------------------------------------------
CREATE TABLE sales_transactions (
    transaction_id    VARCHAR(15) PRIMARY KEY,
    transaction_date  DATE NOT NULL,
    branch_id         VARCHAR(10) NOT NULL,
    product_id        VARCHAR(10) NOT NULL,
    quantity          INTEGER,           -- nullable: dirty data on purpose
    unit_price        DECIMAL(12,2),
    discount_pct      DECIMAL(4,2),      -- e.g., 0.10 = 10% discount
    revenue           DECIMAL(14,2),     -- (qty * unit_price) - discount
    cost              DECIMAL(14,2),     -- qty * cost_price
    FOREIGN KEY (branch_id) REFERENCES branches(branch_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- ---------------------------------------------------------------------
-- INDEXES for query performance
-- ---------------------------------------------------------------------
CREATE INDEX idx_sales_date     ON sales_transactions(transaction_date);
CREATE INDEX idx_sales_branch   ON sales_transactions(branch_id);
CREATE INDEX idx_sales_product  ON sales_transactions(product_id);

-- ---------------------------------------------------------------------
-- LOAD DATA (SQLite syntax — use COPY in PostgreSQL, BULK INSERT in MSSQL)
-- ---------------------------------------------------------------------
-- .mode csv
-- .import branches.csv branches
-- .import principals.csv principals
-- .import products.csv products
-- .import sales_transactions.csv sales_transactions
