"""
Generate editorial-style charts matching the reference portfolio aesthetic.
Style: minimal, white background, serif typography feel, terracotta accent.
"""
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.ticker as mticker
import os

# ---------- Style palette (matching reference) ----------
ACCENT   = '#B84A2E'   # terracotta red-brown
INK      = '#1A1A1A'   # near black for text
GRAY     = '#999999'   # muted captions
GRID     = '#E5E5E5'   # subtle grid
SUCCESS  = '#2E7D5B'   # green
WARN     = '#D97706'   # orange
NAVY     = '#2C3E50'   # alternative dark accent

# Use serif-feel fonts where matplotlib supports them
plt.rcParams.update({
    'font.family': 'serif',
    'font.serif': ['DejaVu Serif', 'Liberation Serif', 'Georgia', 'Times New Roman'],
    'axes.edgecolor': INK,
    'axes.linewidth': 0.8,
    'axes.labelcolor': INK,
    'axes.titlecolor': INK,
    'xtick.color': INK,
    'ytick.color': INK,
    'xtick.labelsize': 10,
    'ytick.labelsize': 10,
    'axes.spines.top': False,
    'axes.spines.right': False,
    'figure.facecolor': 'white',
    'axes.facecolor': 'white',
})

OUT_DIR = '/home/claude/portfolio/docs/editorial'
os.makedirs(OUT_DIR, exist_ok=True)


# ============================================================
# Load actual data (from SQL-validated CSVs)
# ============================================================
df_sales = pd.read_csv('/home/claude/portfolio/data/sales_transactions.csv')
df_branches = pd.read_csv('/home/claude/portfolio/data/branches.csv')
df_products = pd.read_csv('/home/claude/portfolio/data/products.csv')
df_principals = pd.read_csv('/home/claude/portfolio/data/principals.csv')

# Clean
df_sales = df_sales.dropna(subset=['quantity', 'revenue'])
df_sales = df_sales[(df_sales['quantity'] > 0) & (df_sales['revenue'] > 0)]
df_sales['branch_id'] = df_sales['branch_id'].str.strip()
df_sales = df_sales.drop_duplicates(subset=['transaction_id'])
df_sales['transaction_date'] = pd.to_datetime(df_sales['transaction_date'])
df_sales['year'] = df_sales['transaction_date'].dt.year
df_sales['month'] = df_sales['transaction_date'].dt.month
df_sales['gross_profit'] = df_sales['revenue'] - df_sales['cost']

df = (df_sales
      .merge(df_branches, on='branch_id', how='left')
      .merge(df_products, on='product_id', how='left')
      .merge(df_principals, on='principal_id', how='left',
             suffixes=('_product','_principal')))


# ============================================================
# CHART 1: Monthly Revenue YoY Comparison (Lebaran finding)
# ============================================================
fig, ax = plt.subplots(figsize=(10, 5.5), dpi=150)

monthly = df.groupby(['year','month'])['revenue'].sum().reset_index()
monthly['rev_M'] = monthly['revenue'] / 1e6

m23 = monthly[monthly['year']==2023].set_index('month')['rev_M']
m24 = monthly[monthly['year']==2024].set_index('month')['rev_M']

months = list(range(1,13))
month_labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

x = np.arange(len(months))
width = 0.4

ax.bar(x - width/2, m23.reindex(months).values, width, label='2023',
       color='#B0B0B0', edgecolor='none')
ax.bar(x + width/2, m24.reindex(months).values, width, label='2024',
       color=NAVY, edgecolor='none')

# Lebaran/Ramadan highlight (Mar–Apr)
ax.axvspan(1.5, 3.5, color='#FFE8B0', alpha=0.4, zorder=0)
ax.text(2.5, ax.get_ylim()[1]*0.96, 'Peak Lebaran',
        ha='center', va='top', fontsize=9, color=ACCENT, style='italic',
        fontweight='bold')

ax.set_xticks(x)
ax.set_xticklabels(month_labels)
ax.set_ylabel('Revenue (Million IDR)', fontsize=11)
ax.set_title('Monthly Revenue Trend: 2023 vs 2024',
             fontsize=13, fontweight='bold', loc='left', pad=15)
ax.legend(loc='upper left', frameon=False, fontsize=10)
ax.yaxis.grid(True, linestyle='-', linewidth=0.5, color=GRID, alpha=0.7)
ax.set_axisbelow(True)
ax.spines['left'].set_visible(False)

plt.tight_layout()
plt.savefig(f'{OUT_DIR}/01_monthly_yoy.png', dpi=150, bbox_inches='tight',
            facecolor='white')
plt.close()
print('✓ 01_monthly_yoy.png')


# ============================================================
# CHART 2: Pareto / ABC Analysis
# ============================================================
fig, ax1 = plt.subplots(figsize=(11, 5.5), dpi=150)

# 2024 revenue per product
prod_rev = (df[df['year']==2024]
            .groupby('product_name')['revenue'].sum()
            .sort_values(ascending=False) / 1e6)
prod_rev = prod_rev.head(18)  # top 18 SKUs to display

cum_pct = prod_rev.cumsum() / prod_rev.sum() * 100

# ABC class
def abc_class(pct):
    if pct <= 80: return 'A'
    elif pct <= 95: return 'B'
    else: return 'C'
classes = cum_pct.apply(abc_class)
colors_map = {'A': '#3DB87E', 'B': '#F4B942', 'C': '#E25C5C'}
bar_colors = [colors_map[c] for c in classes]

x = np.arange(len(prod_rev))
ax1.bar(x, prod_rev.values, color=bar_colors, edgecolor='none', width=0.7)
ax1.set_xticks(x)
ax1.set_xticklabels(prod_rev.index, rotation=45, ha='right', fontsize=8)
ax1.set_ylabel('Revenue (Million IDR)', fontsize=11)
ax1.yaxis.grid(True, linestyle='-', linewidth=0.5, color=GRID, alpha=0.7)
ax1.set_axisbelow(True)
ax1.spines['left'].set_visible(False)

# Cumulative line on secondary axis
ax2 = ax1.twinx()
ax2.plot(x, cum_pct.values, color=INK, linewidth=2, marker='o', markersize=4)
ax2.set_ylabel('Cumulative %', fontsize=11)
ax2.set_ylim(0, 105)
ax2.spines['top'].set_visible(False)
ax2.axhline(80, color=ACCENT, linewidth=1, linestyle='--', alpha=0.7)
ax2.text(len(x)-0.5, 82, '80%', color=ACCENT, fontsize=9, fontweight='bold')

# Legend
from matplotlib.patches import Patch
legend_elems = [
    Patch(facecolor='#3DB87E', label='Class A (top 80%)'),
    Patch(facecolor='#F4B942', label='Class B (next 15%)'),
    Patch(facecolor='#E25C5C', label='Class C (last 5%)'),
]
ax1.legend(handles=legend_elems, loc='upper right', frameon=False, fontsize=9)

ax1.set_title('Pareto Analysis: ABC Classification of Products (2024)',
              fontsize=13, fontweight='bold', loc='left', pad=15)

plt.tight_layout()
plt.savefig(f'{OUT_DIR}/02_pareto.png', dpi=150, bbox_inches='tight',
            facecolor='white')
plt.close()
print('✓ 02_pareto.png')


# ============================================================
# CHART 3: Branch Growth Year-over-Year (horizontal divergent)
# ============================================================
fig, ax = plt.subplots(figsize=(9, 5.5), dpi=150)

branch_year = df.groupby(['branch_name','year'])['revenue'].sum().unstack()
branch_year['growth_pct'] = (branch_year[2024] - branch_year[2023]) / branch_year[2023] * 100
branch_year = branch_year.sort_values('growth_pct', ascending=True)

# Slightly tweak some values to create variety (mix positive/negative for storyline)
# Use actual computed values
growth = branch_year['growth_pct']

colors = [SUCCESS if v >= 0 else ACCENT for v in growth.values]
ax.barh(range(len(growth)), growth.values, color=colors, edgecolor='none', height=0.7)
ax.set_yticks(range(len(growth)))
ax.set_yticklabels(growth.index, fontsize=10)
ax.axvline(0, color=INK, linewidth=0.8)
ax.set_xlabel('Growth % (2024 vs 2023)', fontsize=11)
ax.set_title('Branch Growth Year-over-Year', fontsize=13, fontweight='bold',
             loc='left', pad=15)
ax.xaxis.grid(True, linestyle='-', linewidth=0.5, color=GRID, alpha=0.7)
ax.set_axisbelow(True)
ax.spines['bottom'].set_visible(False)

# Value labels on bars
for i, v in enumerate(growth.values):
    if v >= 0:
        ax.text(v + 0.2, i, f'+{v:.1f}%', va='center', ha='left', fontsize=9,
                color=SUCCESS, fontweight='bold')
    else:
        ax.text(v - 0.2, i, f'{v:.1f}%', va='center', ha='right', fontsize=9,
                color=ACCENT, fontweight='bold')

plt.tight_layout()
plt.savefig(f'{OUT_DIR}/03_branch_growth.png', dpi=150, bbox_inches='tight',
            facecolor='white')
plt.close()
print('✓ 03_branch_growth.png')


# ============================================================
# CHART 4: Branch × Principal Achievement Matrix (heatmap)
# ============================================================
fig, ax = plt.subplots(figsize=(10, 5.5), dpi=150)

# Compute achievement % per branch×principal (target = 2023*1.15, actual = 2024 qty)
target = (df[df['year']==2023]
          .groupby(['branch_name','principal_name'])['quantity'].sum() * 1.15)
actual = (df[df['year']==2024]
          .groupby(['branch_name','principal_name'])['quantity'].sum())
ach_pct = (actual / target * 100).unstack()

# Replace NaN with 0
ach_pct = ach_pct.fillna(0)

import matplotlib.colors as mcolors
# Custom colormap: red < 90, yellow 90-100, green > 100
cmap = mcolors.LinearSegmentedColormap.from_list(
    'achievement', ['#C0392B', '#E67E22', '#F1C40F', '#82C99A', '#27AE60'])

im = ax.imshow(ach_pct.values, cmap=cmap, aspect='auto', vmin=70, vmax=140)

# Cell annotations
for i in range(ach_pct.shape[0]):
    for j in range(ach_pct.shape[1]):
        val = ach_pct.values[i, j]
        text_color = 'white' if (val < 90 or val > 120) else INK
        ax.text(j, i, f'{val:.0f}', ha='center', va='center',
                color=text_color, fontsize=10, fontweight='bold')

ax.set_xticks(range(ach_pct.shape[1]))
ax.set_xticklabels(ach_pct.columns, rotation=20, ha='right', fontsize=9)
ax.set_yticks(range(ach_pct.shape[0]))
ax.set_yticklabels(ach_pct.index, fontsize=10)

cbar = plt.colorbar(im, ax=ax, shrink=0.8, pad=0.02)
cbar.set_label('Achievement %', fontsize=10)

ax.set_title('Achievement Matrix: Branch × Principal (2024)\n(Numbers = % vs Target)',
             fontsize=13, fontweight='bold', loc='left', pad=15)

plt.tight_layout()
plt.savefig(f'{OUT_DIR}/04_achievement_matrix.png', dpi=150, bbox_inches='tight',
            facecolor='white')
plt.close()
print('✓ 04_achievement_matrix.png')


# ============================================================
# Print summary stats for use in PPT
# ============================================================
print('\n=== KEY NUMBERS FOR PPT ===')
print(f'Total clean transactions: {len(df_sales):,}')
print(f'Total revenue: Rp {df_sales["revenue"].sum()/1e9:.2f}B')
print(f'Total profit:  Rp {df_sales["gross_profit"].sum()/1e9:.2f}B')
print(f'Branches: {df_branches.shape[0]}')
print(f'SKUs: {df_products.shape[0]}')
print(f'Principals: {df_principals.shape[0]}')

# YoY April growth
apr_23 = df[(df['year']==2023)&(df['month']==4)]['revenue'].sum()
apr_24 = df[(df['year']==2024)&(df['month']==4)]['revenue'].sum()
print(f'April YoY growth: +{(apr_24-apr_23)/apr_23*100:.1f}%')

# Pareto
prod_rev_full = df.groupby('product_name')['revenue'].sum().sort_values(ascending=False)
cum = prod_rev_full.cumsum() / prod_rev_full.sum() * 100
n_for_80 = (cum <= 80).sum() + 1
top_share = prod_rev_full.iloc[0] / prod_rev_full.sum() * 100
print(f'SKUs needed for 80% revenue: {n_for_80}')
print(f'Top product share: {top_share:.1f}% ({prod_rev_full.index[0]})')

# Branch growth spread
print(f'\nBranch growth spread:')
print(branch_year['growth_pct'].sort_values(ascending=False))
spread = branch_year['growth_pct'].max() - branch_year['growth_pct'].min()
print(f'Spread: {spread:.1f} percentage points')
