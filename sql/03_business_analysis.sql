-- =====================================================================
-- FMCG SALES PERFORMANCE ANALYSIS
-- File: 03_business_analysis.sql
-- Purpose: Answer key business questions for sales performance
-- =====================================================================


-- =====================================================================
-- BUSINESS QUESTION 1:
-- "Berapa total revenue, units sold, dan gross profit margin per tahun?"
-- =====================================================================
-- STRFTIME('%Y', date) ekstrak tahun. Di PostgreSQL pakai EXTRACT(YEAR FROM date).
SELECT
    STRFTIME('%Y', transaction_date)                                      AS year,
    COUNT(DISTINCT transaction_id)                                        AS total_transactions,
    SUM(quantity)                                                         AS total_units_sold,
    ROUND(SUM(revenue), 0)                                                AS total_revenue,
    ROUND(SUM(gross_profit), 0)                                           AS total_gross_profit,
    -- Margin = profit / revenue, dikali 100 jadi persen
    ROUND(SUM(gross_profit) * 100.0 / SUM(revenue), 2)                    AS gross_margin_pct
FROM sales_clean
GROUP BY STRFTIME('%Y', transaction_date)
ORDER BY year;


-- =====================================================================
-- BUSINESS QUESTION 2:
-- "Cabang mana yang paling profit? Bagaimana ranking-nya?"
-- =====================================================================
-- RANK() memberi peringkat global; cabang revenue sama dapat rank sama,
-- lalu rank berikutnya di-skip.
SELECT
    b.branch_name,
    b.region,
    COUNT(DISTINCT s.transaction_id)                AS transaction_count,
    ROUND(SUM(s.revenue), 0)                        AS total_revenue,
    ROUND(SUM(s.gross_profit), 0)                   AS total_profit,
    ROUND(AVG(s.revenue), 0)                        AS avg_transaction_value,
    RANK() OVER (ORDER BY SUM(s.revenue) DESC)      AS revenue_rank
FROM sales_clean s
JOIN branches b ON s.branch_id = b.branch_id        -- INNER JOIN gabungkan dengan master cabang
GROUP BY b.branch_name, b.region
ORDER BY total_revenue DESC;


-- =====================================================================
-- BUSINESS QUESTION 3:
-- "Principal mana yang kontribusinya paling besar untuk total revenue?"
-- =====================================================================
-- Window function SUM() OVER () tanpa PARTITION = total keseluruhan.
-- Dipakai untuk menghitung % share tanpa subquery.
SELECT
    pr.principal_name,
    pr.category,
    ROUND(SUM(s.revenue), 0)                                              AS total_revenue,
    ROUND(SUM(s.gross_profit), 0)                                         AS total_profit,
    ROUND(SUM(s.revenue) * 100.0 / SUM(SUM(s.revenue)) OVER (), 2)        AS revenue_share_pct
FROM sales_clean s
JOIN products  p  ON s.product_id   = p.product_id
JOIN principals pr ON p.principal_id = pr.principal_id
GROUP BY pr.principal_name, pr.category
ORDER BY total_revenue DESC;


-- =====================================================================
-- BUSINESS QUESTION 4:
-- "Top 10 produk best-seller berdasarkan revenue & unit sold"
-- =====================================================================
SELECT
    p.product_name,
    p.category,
    pr.principal_name,
    SUM(s.quantity)                          AS units_sold,
    ROUND(SUM(s.revenue), 0)                 AS total_revenue,
    ROUND(SUM(s.gross_profit), 0)            AS total_profit,
    ROUND(AVG(s.discount_pct) * 100, 2)      AS avg_discount_pct
FROM sales_clean s
JOIN products  p  ON s.product_id   = p.product_id
JOIN principals pr ON p.principal_id = pr.principal_id
GROUP BY p.product_name, p.category, pr.principal_name
ORDER BY total_revenue DESC
LIMIT 10;


-- =====================================================================
-- BUSINESS QUESTION 5:
-- "Bagaimana tren bulanan revenue? Apakah ada seasonality?"
-- =====================================================================
-- LAG() ambil nilai dari baris sebelumnya dalam window — dipakai untuk
-- hitung Month-over-Month (MoM) growth.
WITH monthly AS (
    SELECT
        STRFTIME('%Y-%m', transaction_date)  AS year_month,
        ROUND(SUM(revenue), 0)               AS monthly_revenue
    FROM sales_clean
    GROUP BY STRFTIME('%Y-%m', transaction_date)
)
SELECT
    year_month,
    monthly_revenue,
    LAG(monthly_revenue) OVER (ORDER BY year_month)                                  AS prev_month_revenue,
    ROUND(
        (monthly_revenue - LAG(monthly_revenue) OVER (ORDER BY year_month)) * 100.0
        / LAG(monthly_revenue) OVER (ORDER BY year_month),
        2
    ) AS mom_growth_pct
FROM monthly
ORDER BY year_month;


-- =====================================================================
-- BUSINESS QUESTION 6:
-- "Year-over-Year (YoY) growth — bagaimana 2024 dibanding 2023?"
-- =====================================================================
-- Pivot manual dengan CASE: pisahkan revenue per tahun ke kolom terpisah
SELECT
    b.branch_name,
    ROUND(SUM(CASE WHEN STRFTIME('%Y', s.transaction_date) = '2023'
                   THEN s.revenue ELSE 0 END), 0) AS revenue_2023,
    ROUND(SUM(CASE WHEN STRFTIME('%Y', s.transaction_date) = '2024'
                   THEN s.revenue ELSE 0 END), 0) AS revenue_2024,
    ROUND(
        (SUM(CASE WHEN STRFTIME('%Y', s.transaction_date) = '2024' THEN s.revenue ELSE 0 END)
       - SUM(CASE WHEN STRFTIME('%Y', s.transaction_date) = '2023' THEN s.revenue ELSE 0 END))
        * 100.0
       / NULLIF(SUM(CASE WHEN STRFTIME('%Y', s.transaction_date) = '2023' THEN s.revenue ELSE 0 END), 0),
        2
    ) AS yoy_growth_pct                         -- NULLIF cegah pembagian dengan nol
FROM sales_clean s
JOIN branches b ON s.branch_id = b.branch_id
GROUP BY b.branch_name
ORDER BY yoy_growth_pct DESC;


-- =====================================================================
-- BUSINESS QUESTION 7:
-- "Achievement vs Target — produk mana yang under-perform?"
-- =====================================================================
-- Asumsi target: total qty 2023 + 15% pertumbuhan. Realisasi vs target.
WITH target_2024 AS (
    SELECT
        product_id,
        SUM(quantity) * 1.15 AS target_qty       -- target growth 15%
    FROM sales_clean
    WHERE STRFTIME('%Y', transaction_date) = '2023'
    GROUP BY product_id
),
actual_2024 AS (
    SELECT
        product_id,
        SUM(quantity) AS actual_qty
    FROM sales_clean
    WHERE STRFTIME('%Y', transaction_date) = '2024'
    GROUP BY product_id
)
SELECT
    p.product_name,
    pr.principal_name,
    ROUND(t.target_qty, 0)                                   AS target_2024,
    a.actual_qty                                              AS actual_2024,
    ROUND(a.actual_qty * 100.0 / t.target_qty, 2)            AS achievement_pct,
    CASE
        WHEN a.actual_qty * 100.0 / t.target_qty >= 100 THEN 'Achieved'
        WHEN a.actual_qty * 100.0 / t.target_qty >= 80  THEN 'Almost There'
        ELSE 'Under Target'
    END AS status
FROM target_2024 t
JOIN actual_2024 a ON t.product_id   = a.product_id
JOIN products    p ON p.product_id   = t.product_id
JOIN principals pr ON p.principal_id = pr.principal_id
ORDER BY achievement_pct DESC;


-- =====================================================================
-- BUSINESS QUESTION 8:
-- "Pareto / 80-20 — berapa persen produk yang menyumbang 80% revenue?"
-- =====================================================================
-- Cumulative running total dengan SUM() OVER (ORDER BY ...)
WITH product_revenue AS (
    SELECT
        p.product_name,
        SUM(s.revenue) AS rev
    FROM sales_clean s
    JOIN products p ON s.product_id = p.product_id
    GROUP BY p.product_name
),
ranked AS (
    SELECT
        product_name,
        rev,
        SUM(rev) OVER (ORDER BY rev DESC)                                  AS cumulative_rev,
        SUM(rev) OVER ()                                                    AS total_rev,
        ROUND(SUM(rev) OVER (ORDER BY rev DESC) * 100.0 / SUM(rev) OVER (), 2) AS cumulative_pct
    FROM product_revenue
)
SELECT
    product_name,
    ROUND(rev, 0) AS revenue,
    cumulative_pct,
    CASE
        WHEN cumulative_pct <= 80 THEN 'Top 80% (Vital Few)'
        ELSE 'Bottom 20% (Trivial Many)'
    END AS pareto_segment
FROM ranked
ORDER BY rev DESC;
