# Push Portofolio ke GitHub

Repo lokal sudah siap dengan:
- Remote `origin` = `https://github.com/filzadika-cell/fmcg-sales-portfolio.git`
- Branch `main`
- 1 commit awal (`Initial commit: FMCG Sales Analysis portfolio`)
- Beberapa file baru (PPTX editorial, dashboard mockup, panduan ini) yang belum di-commit

## Langkah 1 — Pastikan repo kosong di GitHub sudah dibuat

Repo `https://github.com/filzadika-cell/fmcg-sales-portfolio` sudah terdeteksi ada.
Jika BELUM dibuat / kosong, buka link ini dan klik **Create repository** (tanpa centang README/gitignore/license):

https://github.com/new?name=fmcg-sales-portfolio&visibility=public

## Langkah 2 — Buka PowerShell di folder portofolio

Tekan `Win + R` → ketik `powershell` → Enter. Lalu:

```powershell
cd "C:\Users\USER\Documents\Claude\FMCG sales data analytic\fmcg-sales-portfolio_1\portfolio"
```

## Langkah 3 — Commit perubahan baru + push

Copy-paste blok di bawah ini sebagai satu kesatuan:

```powershell
git add .
git commit -m "Add editorial PPTX, dashboard mockups, and GitHub push guide"
git push -u origin main
```

> Saat push pertama, browser akan otomatis terbuka untuk login GitHub. Login dengan akun `filzadika-cell`, izinkan akses, dan push akan selesai.

## Setelah berhasil

Cek hasilnya di: https://github.com/filzadika-cell/fmcg-sales-portfolio

## Update di masa depan

```powershell
git add .
git commit -m "Deskripsi perubahan"
git push
```

## Troubleshooting

- **"Updates were rejected"** → repo GitHub sudah punya commit. Jalankan:
  ```powershell
  git pull origin main --rebase
  git push
  ```
- **"Authentication failed"** → install [GitHub CLI](https://cli.github.com/) lalu jalankan `gh auth login`, atau pastikan Git Credential Manager terinstall.
- **"remote: Repository not found"** → repo belum dibuat di GitHub. Kembali ke Langkah 1.
