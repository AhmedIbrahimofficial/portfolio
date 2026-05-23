@echo off
git config user.name "AhmedIbrahimofficial"
git config user.email "funandentertainmentwithus@gmail.com"
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote remove origin 2>nul
git remote add origin https://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ye@github.com/AhmedIbrahimofficial/portfolio.git
git push -u origin main --force
echo DONE
