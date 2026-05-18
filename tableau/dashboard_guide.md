# 🎨 Tableau Dashboard Build Guide

Panduan lengkap membangun **interactive sales performance dashboard** di Tableau Public/Desktop.

> 👀 **Preview tampilan akhir** — buka file berikut sebelum mulai membangun di Tableau:
> - [`dashboard_mockup.html`](dashboard_mockup.html) — versi interaktif (filter dropdown, hover tooltip)
> - [`dashboard_preview.svg`](dashboard_preview.svg) — versi gambar statis (vector, scalable)
> - [`dashboard_preview.html`](dashboard_preview.html) — preview + tombol export PNG
>
> Semua mockup sudah memakai angka asli dari hasil analisis CSV (Total Revenue Rp 15.61 M, Nestle 45% share, dll) supaya mudah dijadikan referensi saat menyusun ulang di Tableau.

---

## 📋 Prerequisites

- Tableau Desktop atau Tableau Public (gratis)
- File data: `sales_clean_for_tableau.csv` (sudah di-cleaning lewat Python)

---

## 🔌 Step 1: Connect Data

1. Buka Tableau → **Connect → To a File → Text File**
2. Pilih `sales_clean_for_tableau.csv`
3. Verifikasi tipe data:
   - `transaction_date` → **Date**
   - `quantity`, `revenue`, `cost`, `gross_profit` → **Number (decimal)**
   - `branch_id`, `product_id`, `branch_name`, dll → **String**

---

## 📐 Step 2: Build Calculated Fields

**Right-click on Measures pane → Create Calculated Field**

| Field Name | Formula | Purpose |
|------------|---------|---------|
| `Margin %` | `SUM([Gross Profit]) / SUM([Revenue])` (format: Percentage) | Profitability ratio |
| `Avg Transaction Value` | `SUM([Revenue]) / COUNTD([Transaction Id])` | Basket size |
| `YoY Growth %` | `(SUM(IF YEAR([Transaction Date])=2024 THEN [Revenue] END) - SUM(IF YEAR([Transaction Date])=2023 THEN [Revenue] END)) / SUM(IF YEAR([Transaction Date])=2023 THEN [Revenue] END)` | Year-over-year growth |
| `Target 2024 (Qty)` | `SUM(IF YEAR([Transaction Date])=2023 THEN [Quantity] END) * 1.15` | 15% growth target |
| `Achievement %` | `SUM(IF YEAR([Transaction Date])=2024 THEN [Quantity] END) / [Target 2024 (Qty)]` | Target attainment |

---

## 📊 Step 3: Build Worksheets

### Sheet 1 — KPI Cards (Big Numbers)

Buat 4 worksheet terpisah, masing-masing menampilkan satu metric besar:

| KPI | Field | Format |
|-----|-------|--------|
| Total Revenue | `SUM(Revenue)` | Rp #,##0 (in Billion: divide by 1,000,000,000) |
| Total Profit | `SUM(Gross Profit)` | Rp #,##0 |
| Avg Margin | `[Margin %]` | 0.00% |
| Total Transactions | `COUNTD(Transaction Id)` | #,##0 |

> **Tip:** Gunakan **Text Mark** dengan font besar (40-60pt) untuk efek "scorecard".

### Sheet 2 — Monthly Revenue Trend (Line Chart)

- **Columns:** `MONTH(Transaction Date)` (continuous)
- **Rows:** `SUM(Revenue)`
- **Color:** `YEAR(Transaction Date)`
- **Mark:** Line + Circle
- Add reference line at average revenue

### Sheet 3 — Revenue by Branch (Horizontal Bar)

- **Rows:** `Branch Name` (sorted descending by revenue)
- **Columns:** `SUM(Revenue)`
- **Color:** Sequential gradient (light → dark)
- **Label:** `SUM(Revenue)` formatted as Rp Miliar

### Sheet 4 — Principal Share (Donut Chart)

- Trick: dual axis with two pie charts (one solid, one white smaller)
- **Angle:** `SUM(Revenue)`
- **Color:** `Principal Name`
- **Label:** `Principal Name` + `% of Total`

### Sheet 5 — Top 10 Products (Bar Chart)

- **Rows:** `Product Name` (Top N filter = 10 by Revenue)
- **Columns:** `SUM(Revenue)`
- **Color:** `Principal Name`

### Sheet 6 — Branch × Principal Heatmap

- **Columns:** `Principal Name`
- **Rows:** `Branch Name`
- **Mark:** Square
- **Color:** `SUM(Revenue)` (gradient blue)
- **Label:** `SUM(Revenue)` in Rp Miliar

### Sheet 7 — Achievement vs Target (Bullet Chart)

- **Rows:** `Product Name`
- **Columns:** `SUM(Quantity)` (actual)
- **Reference Line:** `Target 2024 (Qty)`
- **Color:** Red if `[Achievement %] < 0.80`, Green if `> 1.0`, Yellow else (use calculated field with IF)

---

## 🎨 Step 4: Assemble Dashboard

1. **New Dashboard** → set size to **1366 × 768** (laptop standard)
2. Layout:

```
┌─────────────────────────────────────────────────────┐
│  🏷️  TITLE: FMCG SALES PERFORMANCE DASHBOARD        │
│  📅  Filter: Year, Region                           │
├──────────┬──────────┬──────────┬──────────┬─────────┤
│ Revenue  │  Profit  │  Margin  │  Trans.  │   YoY   │  ← KPI Row
├──────────┴──────────┴──────────┴──────────┴─────────┤
│                                                     │
│         📈 MONTHLY REVENUE TREND (Line)             │
│                                                     │
├─────────────────────────┬───────────────────────────┤
│  🏢 BRANCH REVENUE      │  🤝 PRINCIPAL SHARE       │
│     (Horizontal Bar)    │     (Donut)              │
├─────────────────────────┼───────────────────────────┤
│  📦 TOP 10 PRODUCTS     │  🔥 BRANCH × PRINCIPAL    │
│     (Bar Chart)         │     (Heatmap)            │
└─────────────────────────┴───────────────────────────┘
```

3. **Add filters** at top: Year, Region, Principal (apply to all sheets)
4. **Add tooltips** with extra context (margin %, transaction count)
5. **Color palette:** stick to 1 primary color + 1 accent (avoid rainbow)

---

## 🎨 Color Palette Recommendation

```
Primary  : #1E2761 (Navy)
Secondary: #065A82 (Deep Blue)
Accent   : #B85042 (Terracotta — for alerts/under-target)
Success  : #2C5F2D (Forest — for achieved/positive growth)
Background: #FFFFFF (White)
Text     : #36454F (Charcoal)
```

---

## 🚀 Step 5: Publish

### Tableau Public (free, public)
1. **Server → Tableau Public → Save to Tableau Public As...**
2. Login dengan akun Tableau Public
3. Salin link → embed di GitHub README & LinkedIn

### Tableau Online / Desktop (private)
1. Save as `.twbx` (packaged workbook with data)
2. Upload to GitHub: `tableau/dashboard.twbx`

---

## ✅ Final Checklist

- [ ] Semua filter berfungsi (cross-sheet filtering enabled)
- [ ] KPI angka sesuai dengan perhitungan SQL
- [ ] Tooltip informatif (tidak generic)
- [ ] Mobile responsive (optional, gunakan Device Designer)
- [ ] Dashboard title & description jelas
- [ ] Source data attribution di footer
- [ ] Link Tableau Public ditambahkan ke README

---

## 📚 Bonus: Storytelling Tips

1. **Lead with insight, not data** — judul setiap sheet harus berupa insight ("Revenue Tumbuh 12% YoY"), bukan deskripsi ("Revenue per Tahun")
2. **Hierarchy of attention** — terbesar = paling penting (KPI di top)
3. **Strip ink-to-data ratio** — buang chart junk (3D, heavy gridlines, gradients tidak perlu)
4. **Consistent number formatting** — Rp Miliar untuk angka besar, 1 digit decimal max
