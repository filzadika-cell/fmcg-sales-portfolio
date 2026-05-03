"""
Generate realistic FMCG sales dummy data for portfolio project.
Output: 4 CSV files (branches, principals, products, sales_transactions)
"""
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random

np.random.seed(42)
random.seed(42)

# ============================================================
# 1. BRANCHES (Cabang) - 8 branches across Indonesia
# ============================================================
branches_data = {
    'branch_id': ['BR001', 'BR002', 'BR003', 'BR004', 'BR005', 'BR006', 'BR007', 'BR008'],
    'branch_name': ['Jakarta Pusat', 'Jakarta Timur', 'Bandung', 'Surabaya',
                    'Medan', 'Semarang', 'Makassar', 'Denpasar'],
    'region': ['Jabodetabek', 'Jabodetabek', 'Jawa Barat', 'Jawa Timur',
               'Sumatera', 'Jawa Tengah', 'Sulawesi', 'Bali-Nusra'],
    'manager': ['Budi Santoso', 'Andi Wijaya', 'Siti Nurhaliza', 'Ahmad Fauzi',
                'Rina Marlina', 'Dedi Setiawan', 'Hendra Pratama', 'Made Wirawan']
}
df_branches = pd.DataFrame(branches_data)

# ============================================================
# 2. PRINCIPALS (Mitra/Distributor) - 5 principals
# ============================================================
principals_data = {
    'principal_id': ['PR001', 'PR002', 'PR003', 'PR004', 'PR005'],
    'principal_name': ['Unilever Indonesia', 'Indofood Sukses Makmur',
                       'Wings Group', 'Mayora Indah', 'Nestle Indonesia'],
    'category': ['Personal Care', 'Food & Beverage', 'Home Care',
                 'Snacks & Beverage', 'Dairy & Nutrition'],
    'contract_start': ['2020-01-15', '2019-06-01', '2021-03-10',
                       '2020-09-20', '2022-02-01']
}
df_principals = pd.DataFrame(principals_data)

# ============================================================
# 3. PRODUCTS - 25 products (5 per principal)
# ============================================================
products_list = [
    # Unilever
    ('PD001', 'Sunsilk Shampoo 170ml', 'PR001', 'Personal Care', 18500, 22000),
    ('PD002', 'Pepsodent Pasta Gigi 190g', 'PR001', 'Personal Care', 12000, 15000),
    ('PD003', 'Lifebuoy Sabun 85g', 'PR001', 'Personal Care', 4500, 6000),
    ('PD004', 'Rexona Deodorant 50ml', 'PR001', 'Personal Care', 22000, 28000),
    ('PD005', 'Clear Shampoo 170ml', 'PR001', 'Personal Care', 19500, 24000),
    # Indofood
    ('PD006', 'Indomie Goreng', 'PR002', 'Instant Noodle', 2800, 3500),
    ('PD007', 'Indomie Soto', 'PR002', 'Instant Noodle', 2700, 3300),
    ('PD008', 'Chitato Original 68g', 'PR002', 'Snacks', 8500, 11000),
    ('PD009', 'Bumbu Racik Indofood', 'PR002', 'Seasoning', 1500, 2000),
    ('PD010', 'Pop Mie Ayam Bawang', 'PR002', 'Instant Noodle', 4800, 6500),
    # Wings
    ('PD011', 'So Klin Detergent 800g', 'PR003', 'Home Care', 16500, 20000),
    ('PD012', 'Daia Detergent 800g', 'PR003', 'Home Care', 15000, 18500),
    ('PD013', 'Ekonomi Pencuci Piring 780ml', 'PR003', 'Home Care', 11500, 14500),
    ('PD014', 'Mie Sedaap Goreng', 'PR003', 'Instant Noodle', 2700, 3300),
    ('PD015', 'Top Coffee Susu', 'PR003', 'Beverage', 1200, 1800),
    # Mayora
    ('PD016', 'Kopiko Permen 150g', 'PR004', 'Confectionery', 8500, 11000),
    ('PD017', 'Roma Kelapa 300g', 'PR004', 'Biscuit', 12000, 15500),
    ('PD018', 'Beng Beng Wafer', 'PR004', 'Confectionery', 2500, 3500),
    ('PD019', 'Torabika Cappuccino', 'PR004', 'Beverage', 1800, 2500),
    ('PD020', 'Energen Cereal Coklat', 'PR004', 'Beverage', 1500, 2200),
    # Nestle
    ('PD021', 'Milo 3in1 Sachet', 'PR005', 'Beverage', 2200, 3000),
    ('PD022', 'Nescafe Classic 200g', 'PR005', 'Beverage', 38000, 45000),
    ('PD023', 'Bear Brand Susu 189ml', 'PR005', 'Dairy', 9500, 12000),
    ('PD024', 'Dancow Fortigro 800g', 'PR005', 'Dairy', 78000, 92000),
    ('PD025', 'Koko Krunch Cereal 170g', 'PR005', 'Cereal', 28000, 34000),
]

df_products = pd.DataFrame(products_list, columns=[
    'product_id', 'product_name', 'principal_id', 'category', 'cost_price', 'selling_price'
])

# ============================================================
# 4. SALES TRANSACTIONS - 24 months (Jan 2023 - Dec 2024)
# ============================================================
start_date = datetime(2023, 1, 1)
end_date = datetime(2024, 12, 31)
date_range = pd.date_range(start=start_date, end=end_date, freq='D')

# Branch performance multiplier (Jakarta & Surabaya are top performers)
branch_weight = {
    'BR001': 1.5, 'BR002': 1.3, 'BR003': 1.1, 'BR004': 1.4,
    'BR005': 0.9, 'BR006': 1.0, 'BR007': 0.8, 'BR008': 0.85
}

# Product popularity (Indomie & Sunsilk top sellers)
product_weight = {p[0]: random.uniform(0.5, 1.5) for p in products_list}
product_weight['PD006'] = 2.5  # Indomie Goreng - star product
product_weight['PD001'] = 2.0  # Sunsilk
product_weight['PD014'] = 2.2  # Mie Sedaap

transactions = []
trans_id = 1

# Inject some "data quality issues" deliberately for cleaning practice
DIRTY_DATA_RATE = 0.02  # 2% dirty rows

for date in date_range:
    # Seasonality: more sales in Ramadan (March-April), Christmas (Dec)
    month = date.month
    seasonal_mult = 1.0
    if month in [3, 4]:  # Ramadan boost
        seasonal_mult = 1.4
    elif month == 12:  # End of year
        seasonal_mult = 1.25
    elif month in [1, 2]:  # Slow months
        seasonal_mult = 0.85

    # Weekend boost
    if date.weekday() in [5, 6]:
        seasonal_mult *= 1.15

    # Year-over-year growth: 2024 ~12% bigger than 2023
    if date.year == 2024:
        seasonal_mult *= 1.12

    # Daily transactions: ~15-30 transactions per day across all branches
    n_trans_today = np.random.poisson(22)

    for _ in range(n_trans_today):
        branch_id = random.choices(
            list(branch_weight.keys()),
            weights=list(branch_weight.values())
        )[0]

        product_id = random.choices(
            list(product_weight.keys()),
            weights=list(product_weight.values())
        )[0]

        # Quantity: most transactions 1-50 units, some bulk 50-500
        if random.random() < 0.85:
            quantity = np.random.randint(1, 50)
        else:
            quantity = np.random.randint(50, 500)

        quantity = int(quantity * seasonal_mult)
        quantity = max(1, quantity)

        product_row = df_products[df_products['product_id'] == product_id].iloc[0]
        unit_price = product_row['selling_price']
        cost_price = product_row['cost_price']

        # Random discount 0-15%
        discount_pct = random.choice([0, 0, 0, 0.05, 0.10, 0.15])
        revenue = quantity * unit_price * (1 - discount_pct)
        cost = quantity * cost_price

        # Inject dirty data occasionally
        is_dirty = random.random() < DIRTY_DATA_RATE
        if is_dirty:
            dirty_type = random.choice(['null_qty', 'negative', 'duplicate', 'whitespace'])
            if dirty_type == 'null_qty':
                quantity = None
                revenue = None
            elif dirty_type == 'negative':
                quantity = -abs(quantity)
                revenue = -abs(revenue)
            # whitespace handled below

        trans = {
            'transaction_id': f'TRX{trans_id:07d}',
            'transaction_date': date.strftime('%Y-%m-%d'),
            'branch_id': branch_id if not (is_dirty and dirty_type == 'whitespace') else f' {branch_id} ',
            'product_id': product_id,
            'quantity': quantity,
            'unit_price': unit_price,
            'discount_pct': discount_pct,
            'revenue': round(revenue, 2) if revenue is not None else None,
            'cost': round(cost, 2)
        }
        transactions.append(trans)
        trans_id += 1

        # Add duplicates occasionally
        if is_dirty and dirty_type == 'duplicate':
            transactions.append(trans.copy())

df_sales = pd.DataFrame(transactions)

# Save all data
df_branches.to_csv('/home/claude/portfolio/data/branches.csv', index=False)
df_principals.to_csv('/home/claude/portfolio/data/principals.csv', index=False)
df_products.to_csv('/home/claude/portfolio/data/products.csv', index=False)
df_sales.to_csv('/home/claude/portfolio/data/sales_transactions.csv', index=False)

print("=" * 60)
print("DATA GENERATION COMPLETED")
print("=" * 60)
print(f"Branches:    {len(df_branches):>8,} rows")
print(f"Principals:  {len(df_principals):>8,} rows")
print(f"Products:    {len(df_products):>8,} rows")
print(f"Sales Trans: {len(df_sales):>8,} rows")
print(f"Date range:  {df_sales['transaction_date'].min()} to {df_sales['transaction_date'].max()}")
print(f"\nDirty data injected (~{DIRTY_DATA_RATE*100:.0f}%) for data cleaning practice")
