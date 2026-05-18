-- =====================================================================
-- FMCG SALES PERFORMANCE ANALYSIS
-- File: 02_data_cleaning.sql
-- Purpose: Identify and fix data quality issues before analysis
-- =====================================================================

-- ---------------------------------------------------------------------
-- BUSINESS QUESTION:
-- "Apakah data kita bersih? Apakah ada NULL, duplikat, atau nilai aneh
--  yang bisa membuat hasil analisis menjadi salah?"
-- ---------------------------------------------------------------------


-- =====================================================================
-- STEP 1: PROFILING — Lihat kondisi awal data
-- =====================================================================
-- Hitung total rows + cek berapa banyak NULL di kolom kritis.
-- COUNT(*) hitung semua baris, COUNT(kolom) hanya yang bukan NULL,
-- jadi selisihnya = jumlah NULL.
SELECT
    COUNT(*)                                          AS total_rows,
    COUNT(*) - COUNT(quantity)                        AS null_quantity,
    COUNT(*) - COUNT(revenue)                         AS null_revenue,
    SUM(CASE WHEN quantity < 0 THEN 1 ELSE 0 END)     AS negative_quantity,
    SUM(CASE WHEN revenue  < 0 THEN 1 ELSE 0 END)     AS negative_revenue
FROM sales_transactions;


-- =====================================================================
-- STEP 2: CARI DUPLIKAT
-- =====================================================================
-- transaction_id seharusnya unik. Kalau ada yang muncul > 1x, itu duplikat.
SELECT
    transaction_id,
    COUNT(*) AS occurrence_count
FROM sales_transactions
GROUP BY transaction_id
HAVING COUNT(*) > 1                  -- HAVING dipakai untuk filter hasil GROUP BY
ORDER BY occurrence_count DESC;


-- =====================================================================
-- STEP 3: CEK WHITESPACE DI BRANCH_ID
-- =====================================================================
-- TRIM() menghilangkan spasi di awal/akhir string. Kalau hasilnya beda
-- dengan original, berarti ada spasi tersembunyi.
SELECT
    branch_id                       AS original_value,
    TRIM(branch_id)                 AS cleaned_value,
    LENGTH(branch_id)               AS original_length,
    LENGTH(TRIM(branch_id))         AS cleaned_length,
    COUNT(*)                        AS row_count
FROM sales_transactions
WHERE branch_id <> TRIM(branch_id)
GROUP BY branch_id;


-- =====================================================================
-- STEP 4: CLEAN UP — Buat tabel bersih untuk analisis lanjutan
-- =====================================================================
-- Strategi:
-- 1) Buang baris dengan NULL di field wajib (quantity, revenue)
-- 2) Buang baris dengan nilai negatif (data error)
-- 3) Trim whitespace di branch_id
-- 4) Hilangkan duplikat dengan ROW_NUMBER()

DROP TABLE IF EXISTS sales_clean;

CREATE TABLE sales_clean AS
WITH ranked AS (
    SELECT
        transaction_id,
        transaction_date,
        TRIM(branch_id)        AS branch_id,        -- Bersihkan whitespace
        product_id,
        quantity,
        unit_price,
        discount_pct,
        revenue,
        cost,
        -- ROW_NUMBER() memberi nomor urut per group transaction_id;
        -- baris pertama = 1, duplikat berikutnya = 2, 3, dst.
        ROW_NUMBER() OVER (
            PARTITION BY transaction_id
            ORDER BY transaction_date
        ) AS rn
    FROM sales_transactions
    WHERE quantity IS NOT NULL          -- buang NULL
      AND revenue  IS NOT NULL
      AND quantity > 0                  -- buang negatif
      AND revenue  > 0
)
SELECT
    transaction_id,
    transaction_date,
    branch_id,
    product_id,
    quantity,
    unit_price,
    discount_pct,
    revenue,
    cost,
    revenue - cost AS gross_profit       -- tambah kolom turunan untuk analisis
FROM ranked
WHERE rn = 1;                           -- ambil hanya baris pertama per id


-- =====================================================================
-- STEP 5: VALIDASI HASIL CLEANING
-- =====================================================================
-- Bandingkan jumlah baris sebelum & sesudah cleaning
SELECT 'Before cleaning' AS stage, COUNT(*) AS row_count FROM sales_transactions
UNION ALL
SELECT 'After cleaning',  COUNT(*)            FROM sales_clean;
