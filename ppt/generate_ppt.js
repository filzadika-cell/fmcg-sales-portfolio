// ============================================================
// FMCG Sales Performance Analytics — Editorial Style PPT
// Inspired by reference design: minimal, serif, terracotta accent
// ============================================================

const pptxgen = require("pptxgenjs");

// --- Editorial palette ---
const C = {
    ink:       "1A1A1A",
    accent:    "B84A2E",
    gray:      "999999",
    lightGray: "CCCCCC",
    grayText:  "666666",
    paleAccent:"F5E8E2",
    white:     "FFFFFF",
    success:   "2E7D5B",
    warn:      "D97706",
    bg:        "FFFFFF",
};

const F = {
    serif:     "Georgia",
    sans:      "Calibri",
    mono:      "Consolas",
};

const W = 13.3, H = 7.5;
const M = 0.75;

function addChrome(pres, slide, sectionNum, sectionName, slideNum, totalSlides, sectionFooter) {
    if (sectionNum && sectionName) {
        slide.addText(`${sectionNum}  ·  ${sectionName.toUpperCase()}`, {
            x: M, y: 0.4, w: 8, h: 0.3,
            fontFace: F.sans, fontSize: 10, color: C.accent,
            bold: true, charSpacing: 4, margin: 0,
        });
    }
    if (sectionFooter) {
        slide.addText(`FMCG SALES PERFORMANCE  ·  ${sectionFooter.toUpperCase()}`, {
            x: M, y: H - 0.45, w: 9, h: 0.3,
            fontFace: F.sans, fontSize: 9, color: C.gray,
            charSpacing: 3, margin: 0,
        });
    }
    if (slideNum && totalSlides) {
        slide.addText(`${String(slideNum).padStart(2,'0')} / ${totalSlides}`, {
            x: W - M - 2, y: H - 0.45, w: 2, h: 0.3,
            fontFace: F.sans, fontSize: 9, color: C.gray,
            charSpacing: 3, align: "right", margin: 0,
        });
    }
}

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.author = "Filza Dikaputra";
pres.title  = "FMCG Sales Performance Analytics";

const TOTAL = 14;
const ME = "[Your Name]";
const ROLE = "Sales & Data Professional · FMCG";

// ============================================================
// SLIDE 1 — COVER
// ============================================================
{
    const s = pres.addSlide();
    s.background = { color: C.bg };

    s.addText("DATA ANALYST PORTFOLIO  ·  2026", {
        x: M, y: 0.55, w: 8, h: 0.3,
        fontFace: F.sans, fontSize: 11, color: C.accent,
        bold: true, charSpacing: 5, margin: 0,
    });

    s.addText("FMCG Sales", {
        x: M, y: 1.7, w: W - 2*M, h: 1.4,
        fontFace: F.serif, fontSize: 78, color: C.ink,
        bold: true, margin: 0,
    });

    s.addText("Performance Analytics.", {
        x: M, y: 3.0, w: W - 2*M, h: 1.5,
        fontFace: F.serif, fontSize: 78, color: C.accent,
        bold: true, italic: true, margin: 0,
    });

    s.addText(
        "An end-to-end analytics project on Indonesian FMCG distribution — turning 15,806 transactions into eight strategic recommendations.",
        {
            x: M, y: 4.9, w: 11, h: 0.9,
            fontFace: F.sans, fontSize: 14, color: C.ink, margin: 0,
        }
    );

    s.addShape(pres.shapes.LINE, {
        x: M, y: 6.2, w: 1.5, h: 0,
        line: { color: C.ink, width: 0.75 },
    });

    s.addText(ME, {
        x: M, y: 6.35, w: 5, h: 0.35,
        fontFace: F.sans, fontSize: 12, color: C.ink, bold: true, margin: 0,
    });
    s.addText(ROLE, {
        x: M, y: 6.7, w: 6, h: 0.3,
        fontFace: F.sans, fontSize: 11, color: C.grayText, margin: 0,
    });

    s.addText("STACK", {
        x: W - M - 4, y: 6.35, w: 4, h: 0.25,
        fontFace: F.sans, fontSize: 9, color: C.accent,
        bold: true, charSpacing: 4, align: "right", margin: 0,
    });
    s.addText("SQL  ·  Python  ·  Tableau  ·  Excel", {
        x: W - M - 6, y: 6.7, w: 6, h: 0.3,
        fontFace: F.sans, fontSize: 11, color: C.ink,
        charSpacing: 1, align: "right", margin: 0,
    });
}

// ============================================================
// SLIDE 2 — ABOUT
// ============================================================
{
    const s = pres.addSlide();
    s.background = { color: C.bg };
    addChrome(pres, s, "01", "About", 2, TOTAL, "About");

    s.addText("Bridging sales experience with analytics.", {
        x: M, y: 1.2, w: W - 2*M, h: 1.0,
        fontFace: F.serif, fontSize: 38, color: C.ink, bold: true, margin: 0,
    });

    s.addText("I'm " + ME + ", a sales and data professional in the FMCG industry.", {
        x: M, y: 2.8, w: 6.3, h: 0.6,
        fontFace: F.sans, fontSize: 14, color: C.ink, bold: true, margin: 0,
    });

    s.addText(
        "After working closely with sales performance, distribution, and channel data, I learned that the most valuable insights rarely come from dashboards alone — they come from connecting numbers to ground reality.",
        {
            x: M, y: 3.5, w: 6.3, h: 1.4,
            fontFace: F.sans, fontSize: 12, color: C.ink, margin: 0,
        }
    );

    s.addText(
        "This portfolio is my transition into a Data Analyst / BI Analyst role: combining domain knowledge of FMCG with analytical rigor in SQL, Python, and Tableau.",
        {
            x: M, y: 5.0, w: 6.3, h: 1.2,
            fontFace: F.sans, fontSize: 12, color: C.ink, margin: 0,
        }
    );

    s.addText("Target role:  Data Analyst  ·  Business Intelligence Analyst", {
        x: M, y: 6.4, w: 8, h: 0.3,
        fontFace: F.sans, fontSize: 11, color: C.accent,
        italic: true, margin: 0,
    });

    const RX = 7.7, RY = 2.8;
    s.addText("CORE STRENGTHS", {
        x: RX, y: RY, w: 5, h: 0.3,
        fontFace: F.sans, fontSize: 10, color: C.accent,
        bold: true, charSpacing: 5, margin: 0,
    });

    const strengths = [
        { title: "Data analysis & reporting", desc: "Translate raw sales data into clear narratives" },
        { title: "Dashboarding",                desc: "Tableau Public · Excel-based scorecards" },
        { title: "Business understanding",      desc: "Distribution, achievement vs target, channel" },
        { title: "Tools",                       desc: "Excel (advanced) · Tableau · SQL · Python" },
    ];

    let y = RY + 0.5;
    strengths.forEach((st, i) => {
        s.addText(st.title, {
            x: RX, y: y, w: 5, h: 0.4,
            fontFace: F.serif, fontSize: 16, color: C.ink, bold: true, margin: 0,
        });
        s.addText(st.desc, {
            x: RX, y: y + 0.4, w: 5, h: 0.35,
            fontFace: F.sans, fontSize: 11, color: C.grayText, margin: 0,
        });
        if (i < strengths.length - 1) {
            s.addShape(pres.shapes.LINE, {
                x: RX, y: y + 0.85, w: 5, h: 0,
                line: { color: C.lightGray, width: 0.5 },
            });
        }
        y += 0.95;
    });
}

// ============================================================
// SLIDE 3 — PROJECT
// ============================================================
{
    const s = pres.addSlide();
    s.background = { color: C.bg };
    addChrome(pres, s, "02", "Project", 3, TOTAL, "Overview");

    s.addText("What this portfolio demonstrates.", {
        x: M, y: 1.2, w: W - 2*M, h: 1.0,
        fontFace: F.serif, fontSize: 40, color: C.ink, bold: true, margin: 0,
    });

    const stats = [
        { num: "15,806", label: "clean transactions" },
        { num: "24",      label: "months of data" },
        { num: "8",       label: "branches across Indonesia" },
        { num: "25",      label: "SKUs · 5 principals" },
    ];

    const sx = M, sy = 3.2;
    const sw = (W - 2*M) / 4;
    stats.forEach((st, i) => {
        s.addText(st.num, {
            x: sx + i*sw, y: sy, w: sw - 0.2, h: 1.0,
            fontFace: F.serif, fontSize: 44, color: C.ink, bold: true, margin: 0,
        });
        s.addText(st.label, {
            x: sx + i*sw, y: sy + 1.05, w: sw - 0.2, h: 0.3,
            fontFace: F.sans, fontSize: 11, color: C.grayText, margin: 0,
        });
    });

    s.addShape(pres.shapes.LINE, {
        x: M, y: 5.3, w: W - 2*M, h: 0,
        line: { color: C.lightGray, width: 0.75 },
    });

    s.addText("Scope", {
        x: M, y: 5.5, w: 4, h: 0.3,
        fontFace: F.sans, fontSize: 10, color: C.accent,
        bold: true, charSpacing: 5, margin: 0,
    });

    s.addText("Data preparation  →  cleaning  →  SQL analysis  →  Python visualization  →  Tableau dashboard  →  business recommendations.", {
        x: M, y: 5.9, w: W - 2*M, h: 0.5,
        fontFace: F.sans, fontSize: 14, color: C.ink, margin: 0,
    });

    s.addText("Real-world FMCG context: actual sales vs target by branch, principal, and SKU; seasonality (Lebaran, year-end); and Pareto distribution of revenue.", {
        x: M, y: 6.4, w: W - 2*M, h: 0.5,
        fontFace: F.sans, fontSize: 12, color: C.grayText, italic: true, margin: 0,
    });
}

// ============================================================
// SLIDE 4 — METHOD
// ============================================================
{
    const s = pres.addSlide();
    s.background = { color: C.bg };
    addChrome(pres, s, "03", "Method", 4, TOTAL, "Method");

    s.addText("End-to-end workflow.", {
        x: M, y: 1.2, w: W - 2*M, h: 1.0,
        fontFace: F.serif, fontSize: 40, color: C.ink, bold: true, margin: 0,
    });

    const steps = [
        { n: "01", t: "Business Questions", d: "Define eight questions a sales leader actually asks" },
        { n: "02", t: "Data Preparation",   d: "Generate realistic 24-month transaction dataset" },
        { n: "03", t: "Data Cleaning",      d: "Profile, dedupe, fix dates, handle outliers" },
        { n: "04", t: "SQL Analysis",       d: "Window functions, CTEs, Pareto, achievement" },
        { n: "05", t: "Python & Tableau",   d: "Visualize patterns; publish interactive dashboard" },
        { n: "06", t: "Recommendations",    d: "Translate findings into prioritized actions" },
    ];

    const gx = M, gy = 3.0;
    const colW = (W - 2*M) / 3;
    const rowH = 1.85;

    steps.forEach((st, i) => {
        const col = i % 3, row = Math.floor(i / 3);
        const x = gx + col * colW;
        const y = gy + row * rowH;

        s.addText(st.n, {
            x: x, y: y, w: colW - 0.3, h: 0.7,
            fontFace: F.serif, fontSize: 32, color: C.accent,
            bold: true, italic: true, margin: 0,
        });

        s.addText(st.t, {
            x: x, y: y + 0.7, w: colW - 0.3, h: 0.4,
            fontFace: F.serif, fontSize: 18, color: C.ink, bold: true, margin: 0,
        });

        s.addText(st.d, {
            x: x, y: y + 1.1, w: colW - 0.3, h: 0.4,
            fontFace: F.sans, fontSize: 11, color: C.grayText, margin: 0,
        });

        s.addShape(pres.shapes.LINE, {
            x: x, y: y + 1.55, w: colW - 0.3, h: 0,
            line: { color: C.lightGray, width: 0.5 },
        });
    });
}

// ============================================================
// SLIDE 5 — QUESTIONS
// ============================================================
{
    const s = pres.addSlide();
    s.background = { color: C.bg };
    addChrome(pres, s, "04", "Questions", 5, TOTAL, "Questions");

    s.addText("Eight questions, answered with SQL.", {
        x: M, y: 1.2, w: W - 2*M, h: 1.0,
        fontFace: F.serif, fontSize: 38, color: C.ink, bold: true, margin: 0,
    });

    const qs = [
        "Total revenue and profit margin in 2024?",
        "Top principals by revenue contribution?",
        "Branch achievement vs target (2024)?",
        "Top 10 best-selling products?",
        "Monthly trend YoY (2023 vs 2024)?",
        "Branch × principal achievement matrix?",
        "Branch growth: who leads, who lags?",
        "Pareto: 80% of revenue from how many SKUs?",
    ];

    const colX = [M, M + 6.0];
    const startY = 2.7;
    const lineH = 0.7;

    qs.forEach((q, i) => {
        const col = i < 4 ? 0 : 1;
        const row = i % 4;
        const x = colX[col];
        const y = startY + row * lineH;

        s.addText(String(i + 1).padStart(2, '0'), {
            x: x, y: y, w: 0.7, h: 0.5,
            fontFace: F.serif, fontSize: 18, color: C.accent,
            bold: true, italic: true, margin: 0,
        });

        s.addText(q, {
            x: x + 0.7, y: y, w: 5.3, h: 0.5,
            fontFace: F.sans, fontSize: 13, color: C.ink, margin: 0, valign: "middle",
        });
    });

    s.addShape(pres.shapes.LINE, {
        x: M, y: 6.1, w: W - 2*M, h: 0,
        line: { color: C.lightGray, width: 0.5 },
    });
    s.addText("Techniques used:  CTEs  ·  Window functions (RANK, SUM OVER)  ·  CASE WHEN  ·  multi-table JOINs  ·  NULLIF  ·  COALESCE", {
        x: M, y: 6.3, w: W - 2*M, h: 0.4,
        fontFace: F.sans, fontSize: 11, color: C.grayText, italic: true, margin: 0,
    });
}

// ============================================================
// SLIDE 6 — DATA CLEANING
// ============================================================
{
    const s = pres.addSlide();
    s.background = { color: C.bg };
    addChrome(pres, s, "05", "Data Cleaning", 6, TOTAL, "Cleaning");

    s.addText("Real-world data is messy. Here's how I handled it.", {
        x: M, y: 1.2, w: W - 2*M, h: 1.0,
        fontFace: F.serif, fontSize: 36, color: C.ink, bold: true, margin: 0,
    });

    const issues = [
        { t: "Duplicate rows",   accent: "16,045  →  15,966", desc: "drop_duplicates(keep='first')" },
        { t: "Missing values",   accent: "80 NaN  →  0 missing", desc: "Drop rows where qty / revenue null" },
        { t: "Negative values",  accent: "77 rows  →  0 rows",   desc: "Filter quantity > 0 AND revenue > 0" },
        { t: "Whitespace",       accent: "Trimmed branch_id",     desc: "Multi-format string normalization" },
    ];

    const cx = [M, M + 6.0];
    const cy = [3.0, 5.0];

    issues.forEach((iss, i) => {
        const col = i % 2, row = Math.floor(i / 2);
        const x = cx[col];
        const y = cy[row];

        s.addShape(pres.shapes.LINE, {
            x: x, y: y - 0.05, w: 5.5, h: 0,
            line: { color: C.ink, width: 1 },
        });

        s.addText(iss.t, {
            x: x, y: y + 0.1, w: 5.5, h: 0.4,
            fontFace: F.serif, fontSize: 18, color: C.ink, bold: true, margin: 0,
        });

        s.addText(iss.accent, {
            x: x, y: y + 0.55, w: 5.5, h: 0.4,
            fontFace: F.sans, fontSize: 14, color: C.accent, bold: true, margin: 0,
        });

        s.addText(iss.desc, {
            x: x, y: y + 1.05, w: 5.5, h: 0.35,
            fontFace: F.mono, fontSize: 10, color: C.grayText, margin: 0,
        });
    });
}

// ============================================================
// SLIDE 7 — FINDING 01: Lebaran
// ============================================================
{
    const s = pres.addSlide();
    s.background = { color: C.bg };
    addChrome(pres, s, "06", "Finding 01", 7, TOTAL, "Findings");

    s.addText("Lebaran is the single biggest sales lever.", {
        x: M, y: 1.2, w: W - 2*M, h: 1.0,
        fontFace: F.serif, fontSize: 36, color: C.ink, bold: true, margin: 0,
    });

    s.addText([
        { text: "April 2024 grew  ", options: { fontSize: 14, color: C.ink } },
        { text: "+29.6% YoY", options: { fontSize: 18, color: C.accent, bold: true } },
    ], {
        x: M, y: 3.0, w: 5.5, h: 0.5,
        fontFace: F.sans, margin: 0,
    });

    s.addText(
        "Lebaran demand drives Q1–Q2 spikes — particularly March and April. The +29.6% jump in April 2024 is not a fluke; it's a recurring window for inventory and promotion planning.",
        {
            x: M, y: 3.7, w: 5.2, h: 1.5,
            fontFace: F.sans, fontSize: 12, color: C.ink, margin: 0,
        }
    );

    s.addText("Action:  Lock 1.5× safety stock for Mar–Apr; redirect promo budget to recover slower months.", {
        x: M, y: 5.4, w: 5.2, h: 1.0,
        fontFace: F.sans, fontSize: 12, color: C.grayText, italic: true, margin: 0,
    });

    s.addImage({
        path: "/home/claude/portfolio/docs/editorial/01_monthly_yoy.png",
        x: 6.4, y: 2.7, w: 6.3, h: 3.5,
    });
}

// ============================================================
// SLIDE 8 — FINDING 02: Pareto
// ============================================================
{
    const s = pres.addSlide();
    s.background = { color: C.bg };
    addChrome(pres, s, "07", "Finding 02", 8, TOTAL, "Findings");

    s.addText("The 80/20 rule is alive — and well-defined.", {
        x: M, y: 1.2, w: W - 2*M, h: 1.0,
        fontFace: F.serif, fontSize: 36, color: C.ink, bold: true, margin: 0,
    });

    s.addImage({
        path: "/home/claude/portfolio/docs/editorial/02_pareto.png",
        x: M, y: 2.7, w: 7.8, h: 3.9,
    });

    const RX = 9.2;
    const stats = [
        { num: "10 SKUs",  desc: "generate 80% of total revenue",      color: C.accent },
        { num: "15.6%",    desc: "from one product alone (Dancow)",    color: C.ink },
        { num: "15 SKUs",  desc: "contribute only 20% — review for promo",  color: C.gray },
    ];

    let yy = 2.9;
    stats.forEach((st, i) => {
        s.addText(st.num, {
            x: RX, y: yy, w: 3.5, h: 0.7,
            fontFace: F.serif, fontSize: 32, color: st.color, bold: true, margin: 0,
        });
        s.addText(st.desc, {
            x: RX, y: yy + 0.7, w: 3.5, h: 0.5,
            fontFace: F.sans, fontSize: 11, color: C.grayText, margin: 0,
        });
        if (i < stats.length - 1) {
            s.addShape(pres.shapes.LINE, {
                x: RX, y: yy + 1.25, w: 3.3, h: 0,
                line: { color: C.lightGray, width: 0.5 },
            });
        }
        yy += 1.4;
    });
}

// ============================================================
// SLIDE 9 — FINDING 03: Branch Growth
// ============================================================
{
    const s = pres.addSlide();
    s.background = { color: C.bg };
    addChrome(pres, s, "08", "Finding 03", 9, TOTAL, "Findings");

    s.addText("Branch performance varies by 59 percentage points.", {
        x: M, y: 1.2, w: W - 2*M, h: 1.0,
        fontFace: F.serif, fontSize: 32, color: C.ink, bold: true, margin: 0,
    });

    s.addImage({
        path: "/home/claude/portfolio/docs/editorial/03_branch_growth.png",
        x: M, y: 2.6, w: 7.0, h: 4.2,
    });

    const RX = 8.3;
    s.addText("Best:", {
        x: RX, y: 2.9, w: 1.2, h: 0.4,
        fontFace: F.sans, fontSize: 13, color: C.grayText, margin: 0,
    });
    s.addText("Makassar  +49.2%", {
        x: RX + 1.2, y: 2.85, w: 4, h: 0.5,
        fontFace: F.sans, fontSize: 16, color: C.success, bold: true, margin: 0,
    });

    s.addText("Worst:", {
        x: RX, y: 3.45, w: 1.2, h: 0.4,
        fontFace: F.sans, fontSize: 13, color: C.grayText, margin: 0,
    });
    s.addText("Jakarta Timur  −9.6%", {
        x: RX + 1.2, y: 3.4, w: 4, h: 0.5,
        fontFace: F.sans, fontSize: 16, color: C.accent, bold: true, margin: 0,
    });

    s.addShape(pres.shapes.LINE, {
        x: RX, y: 4.1, w: 4.2, h: 0,
        line: { color: C.lightGray, width: 0.5 },
    });

    s.addText("What this tells us", {
        x: RX, y: 4.3, w: 4.2, h: 0.4,
        fontFace: F.serif, fontSize: 14, color: C.ink, bold: true, margin: 0,
    });

    s.addText(
        "Same products, same targets — yet a 59-point spread. The variance lives in execution: outlet coverage, sales team capability, and trade promotion effectiveness.",
        {
            x: RX, y: 4.7, w: 4.2, h: 1.4,
            fontFace: F.sans, fontSize: 11, color: C.ink, margin: 0,
        }
    );

    s.addText(
        "Recommendation:  cross-pollinate Makassar's playbook; investigate Jakarta Timur's contraction.",
        {
            x: RX, y: 6.0, w: 4.2, h: 0.8,
            fontFace: F.sans, fontSize: 11, color: C.accent, italic: true, margin: 0,
        }
    );
}

// ============================================================
// SLIDE 10 — FINDING 04: Achievement Matrix
// ============================================================
{
    const s = pres.addSlide();
    s.background = { color: C.bg };
    addChrome(pres, s, "09", "Finding 04", 10, TOTAL, "Findings");

    s.addText("Where exactly are the gaps?", {
        x: M, y: 1.2, w: W - 2*M, h: 1.0,
        fontFace: F.serif, fontSize: 38, color: C.ink, bold: true, margin: 0,
    });

    s.addText("Branch × Principal achievement matrix reveals specific underperforming combinations.", {
        x: M, y: 2.1, w: W - 2*M, h: 0.4,
        fontFace: F.sans, fontSize: 12, color: C.grayText, italic: true, margin: 0,
    });

    s.addImage({
        path: "/home/claude/portfolio/docs/editorial/04_achievement_matrix.png",
        x: M, y: 2.6, w: 8.5, h: 4.2,
    });

    const RX = 9.7;

    s.addText("HOW TO READ", {
        x: RX, y: 2.9, w: 3, h: 0.3,
        fontFace: F.sans, fontSize: 9, color: C.accent,
        bold: true, charSpacing: 4, margin: 0,
    });

    const legend = [
        { color: "27AE60", label: "Green",  desc: ">100% — achieved" },
        { color: "F1C40F", label: "Yellow", desc: "90–100% — near target" },
        { color: "C0392B", label: "Red",    desc: "Below 90% — investigate" },
    ];

    let yy = 3.3;
    legend.forEach(l => {
        s.addShape(pres.shapes.RECTANGLE, {
            x: RX, y: yy + 0.1, w: 0.3, h: 0.3,
            fill: { color: l.color }, line: { color: l.color },
        });
        s.addText(l.label, {
            x: RX + 0.45, y: yy + 0.05, w: 2.5, h: 0.35,
            fontFace: F.serif, fontSize: 14, color: C.ink, bold: true, margin: 0,
        });
        s.addText(l.desc, {
            x: RX + 0.45, y: yy + 0.4, w: 2.5, h: 0.3,
            fontFace: F.sans, fontSize: 10, color: C.grayText, margin: 0,
        });
        yy += 0.85;
    });

    s.addShape(pres.shapes.LINE, {
        x: RX, y: 5.7, w: 2.8, h: 0,
        line: { color: C.lightGray, width: 0.5 },
    });

    s.addText("USE CASE", {
        x: RX, y: 5.85, w: 3, h: 0.3,
        fontFace: F.sans, fontSize: 9, color: C.accent,
        bold: true, charSpacing: 4, margin: 0,
    });

    s.addText(
        "Identify which branch–principal pairs are bleeding revenue and act on the root cause: pricing, distribution, or sales skill.",
        {
            x: RX, y: 6.2, w: 2.9, h: 1.1,
            fontFace: F.sans, fontSize: 10, color: C.ink, margin: 0,
        }
    );
}

// ============================================================
// SLIDE 11 — RECOMMENDATIONS
// ============================================================
{
    const s = pres.addSlide();
    s.background = { color: C.bg };
    addChrome(pres, s, "10", "Recommendations", 11, TOTAL, "Recommendations");

    s.addText("From insight to action.", {
        x: M, y: 1.2, w: W - 2*M, h: 1.0,
        fontFace: F.serif, fontSize: 40, color: C.ink, bold: true, margin: 0,
    });

    const HY = 2.6;
    const colX = [M, M + 0.7, M + 2.2, M + 5.1, M + 9.6];
    const headers = ["", "TIMING", "INITIATIVE", "ACTION", "IMPACT"];
    headers.forEach((h, i) => {
        s.addText(h, {
            x: colX[i], y: HY, w: i < headers.length - 1 ? colX[i+1] - colX[i] - 0.1 : 2.5,
            h: 0.3,
            fontFace: F.sans, fontSize: 9, color: C.grayText,
            bold: true, charSpacing: 4, margin: 0,
        });
    });

    s.addShape(pres.shapes.LINE, {
        x: M, y: HY + 0.4, w: W - 2*M, h: 0,
        line: { color: C.ink, width: 0.75 },
    });

    const recs = [
        { p: "P1", color: C.accent,  time: "0–30 days",   init: "Stockout prevention for Class A SKUs", action: "Set safety stock to 2× daily avg for top 10 SKUs; real-time alerts <30% buffer.", impact: "+2–3% revenue" },
        { p: "P2", color: C.warn,    time: "30–90 days",  init: "Pareto-driven sales targeting",          action: "Re-segment outlets; 80% of effort on Class A buyers; cross-sell Class B.",       impact: "+5% revenue" },
        { p: "P2", color: C.warn,    time: "30–90 days",  init: "Lebaran campaign optimization",          action: "Lock Q1 inventory + marketing budget; capture predictable +29.6% uplift.",      impact: "+3–4% revenue" },
        { p: "P3", color: C.success, time: "90+ days",    init: "Diversify principal mix",                action: "Reduce Nestle dependency (46%) by expanding Mayora & Indofood programs.",        impact: "Risk mitigation" },
    ];

    let yy = HY + 0.55;
    const rh = 0.75;
    recs.forEach(r => {
        s.addShape(pres.shapes.OVAL, {
            x: colX[0] + 0.05, y: yy + 0.18, w: 0.2, h: 0.2,
            fill: { color: r.color }, line: { color: r.color },
        });
        s.addText(r.p, {
            x: colX[0] + 0.3, y: yy + 0.1, w: 0.4, h: 0.35,
            fontFace: F.sans, fontSize: 10, color: C.ink, bold: true, margin: 0,
        });

        s.addText(r.time, {
            x: colX[1], y: yy + 0.1, w: 1.4, h: 0.35,
            fontFace: F.sans, fontSize: 11, color: C.grayText, margin: 0,
        });

        s.addText(r.init, {
            x: colX[2], y: yy + 0.05, w: 2.8, h: 0.35,
            fontFace: F.serif, fontSize: 13, color: C.ink, bold: true, margin: 0,
        });

        s.addText(r.action, {
            x: colX[3], y: yy + 0.05, w: 4.4, h: 0.65,
            fontFace: F.sans, fontSize: 10, color: C.grayText, margin: 0,
        });

        s.addText(r.impact, {
            x: colX[4], y: yy + 0.1, w: 2.5, h: 0.35,
            fontFace: F.sans, fontSize: 11, color: C.accent, bold: true, margin: 0,
        });

        s.addShape(pres.shapes.LINE, {
            x: M, y: yy + rh, w: W - 2*M, h: 0,
            line: { color: C.lightGray, width: 0.5 },
        });

        yy += rh;
    });

    // Footer with breathing room — placed above the breadcrumb area
    s.addText([
        { text: "Conservative total impact:  ", options: { color: C.grayText, italic: true } },
        { text: "+10 to +12% revenue growth", options: { color: C.accent, italic: true, bold: true } },
        { text: "  vs current baseline.", options: { color: C.grayText, italic: true } },
    ], {
        x: M, y: yy + 0.3, w: 10, h: 0.3,
        fontFace: F.sans, fontSize: 11, margin: 0,
    });
}

// ============================================================
// SLIDE 12 — DELIVERABLES
// ============================================================
{
    const s = pres.addSlide();
    s.background = { color: C.bg };
    addChrome(pres, s, "11", "Deliverables", 12, TOTAL, "Deliverables");

    s.addText("What's in the repository.", {
        x: M, y: 1.2, w: W - 2*M, h: 1.0,
        fontFace: F.serif, fontSize: 40, color: C.ink, bold: true, margin: 0,
    });

    const deliverables = [
        { n: "01", t: "Generated dataset",     d: "4 CSVs · 15,806 transactions · 24 months" },
        { n: "02", t: "Cleaning pipeline",     d: "SQL + Python scripts with profiling logs" },
        { n: "03", t: "SQL analysis",          d: "8 business-question queries (SQLite-compatible)" },
        { n: "04", t: "Python visualizations", d: "Editorial-grade charts (matplotlib + seaborn)" },
        { n: "05", t: "Tableau dashboard",     d: "Interactive — build guide included" },
        { n: "06", t: "Documentation",         d: "README · Business insights · Reproduce guide" },
    ];

    const dx = M;
    let dy = 2.9;
    const dh = 0.65;

    deliverables.forEach(dl => {
        s.addText(dl.n, {
            x: dx, y: dy + 0.05, w: 0.7, h: 0.45,
            fontFace: F.serif, fontSize: 16, color: C.accent,
            bold: true, italic: true, margin: 0,
        });

        s.addText(dl.t, {
            x: dx + 0.9, y: dy + 0.03, w: 4.5, h: 0.45,
            fontFace: F.serif, fontSize: 16, color: C.ink, bold: true, margin: 0,
        });

        s.addText(dl.d, {
            x: dx + 5.5, y: dy + 0.08, w: 6.5, h: 0.4,
            fontFace: F.sans, fontSize: 11, color: C.grayText, margin: 0,
        });

        s.addShape(pres.shapes.LINE, {
            x: dx, y: dy + dh, w: W - 2*M, h: 0,
            line: { color: C.lightGray, width: 0.5 },
        });

        dy += dh;
    });
}

// ============================================================
// SLIDE 13 — TECH STACK
// ============================================================
{
    const s = pres.addSlide();
    s.background = { color: C.bg };
    addChrome(pres, s, "12", "Tech Stack", 13, TOTAL, "Stack");

    s.addText("Tools used.", {
        x: M, y: 1.2, w: W - 2*M, h: 1.0,
        fontFace: F.serif, fontSize: 40, color: C.ink, bold: true, margin: 0,
    });

    const tools = [
        { cat: "SQL",    name: "SQLite",            desc: "Window funcs · CTEs · Pareto" },
        { cat: "PYTHON", name: "Pandas",            desc: "Cleaning · pipeline · analysis" },
        { cat: "VIZ",    name: "Matplotlib +\nSeaborn",  desc: "Editorial-grade charts" },
        { cat: "BI",     name: "Tableau Public",    desc: "Interactive dashboard" },
    ];

    const tx = M, ty = 3.1;
    const tw = (W - 2*M) / 4;
    tools.forEach((t, i) => {
        const x = tx + i * tw;

        s.addText(t.cat, {
            x: x, y: ty, w: tw - 0.3, h: 0.3,
            fontFace: F.sans, fontSize: 9, color: C.accent,
            bold: true, charSpacing: 5, margin: 0,
        });

        s.addText(t.name, {
            x: x, y: ty + 0.5, w: tw - 0.3, h: 1.2,
            fontFace: F.serif, fontSize: 22, color: C.ink, bold: true, margin: 0,
        });

        s.addShape(pres.shapes.LINE, {
            x: x, y: ty + 1.7, w: tw - 0.5, h: 0,
            line: { color: C.lightGray, width: 0.5 },
        });

        s.addText(t.desc, {
            x: x, y: ty + 1.85, w: tw - 0.3, h: 0.4,
            fontFace: F.sans, fontSize: 10, color: C.grayText, margin: 0,
        });
    });

    s.addText("REPRODUCE", {
        x: M, y: 5.6, w: 4, h: 0.3,
        fontFace: F.sans, fontSize: 9, color: C.accent,
        bold: true, charSpacing: 5, margin: 0,
    });

    s.addShape(pres.shapes.RECTANGLE, {
        x: M, y: 5.95, w: W - 2*M, h: 1.0,
        fill: { color: "F8F8F8" }, line: { color: "F8F8F8" },
    });

    const cmds = [
        "$ python data/generate_data.py",
        "$ sqlite3 fmcg.db < sql/01_schema_and_load.sql",
        "$ jupyter notebook python/fmcg_sales_analysis.ipynb",
    ];
    s.addText(cmds.map((c, i) => ({
        text: c,
        options: { breakLine: i < cmds.length - 1, fontSize: 10, fontFace: F.mono, color: C.ink }
    })), {
        x: M + 0.2, y: 6.0, w: W - 2*M - 0.4, h: 0.9,
        valign: "middle", margin: 0,
    });
}

// ============================================================
// SLIDE 14 — THANK YOU
// ============================================================
{
    const s = pres.addSlide();
    s.background = { color: C.bg };

    s.addText(`${ME.toUpperCase()}  ·  FMCG ANALYTICS PORTFOLIO`, {
        x: M, y: H - 0.45, w: W - 2*M, h: 0.3,
        fontFace: F.sans, fontSize: 9, color: C.gray,
        charSpacing: 3, margin: 0,
    });

    s.addText("Thank you.", {
        x: M, y: 2.4, w: W - 2*M, h: 1.6,
        fontFace: F.serif, fontSize: 96, color: C.ink, bold: true, margin: 0,
    });

    s.addText("Open to data analyst & BI analyst opportunities.", {
        x: M, y: 4.0, w: W - 2*M, h: 0.6,
        fontFace: F.serif, fontSize: 22, color: C.accent,
        italic: true, margin: 0,
    });

    s.addShape(pres.shapes.LINE, {
        x: M, y: 5.0, w: 1.5, h: 0,
        line: { color: C.ink, width: 0.75 },
    });

    const contacts = [
        ["NAME",     ME],
        ["EMAIL",    "your.email@example.com"],
        ["LINKEDIN", "linkedin.com/in/yourname"],
        ["GITHUB",   "github.com/[your-username]/fmcg-sales-portfolio"],
    ];

    let cy = 5.25;
    contacts.forEach(([label, val]) => {
        s.addText(label, {
            x: M, y: cy, w: 1.3, h: 0.35,
            fontFace: F.sans, fontSize: 9, color: C.gray,
            bold: true, charSpacing: 4, margin: 0,
        });
        s.addText(val, {
            x: M + 1.5, y: cy, w: 8, h: 0.35,
            fontFace: F.sans, fontSize: 12, color: C.ink, margin: 0,
        });
        cy += 0.4;
    });
}

// Write
const outPath = "/home/claude/portfolio/ppt/FMCG_Sales_Analysis.pptx";
pres.writeFile({ fileName: outPath }).then(() => {
    console.log("✓ Generated:", outPath);
});
