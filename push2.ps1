$token = "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ye"
git config user.name "AhmedIbrahimofficial"
git config user.email "funandentertainmentwithus@gmail.com"
git add .
git commit -m "Fix build errors and add real images to Explorations"
git remote remove origin 2>$null
git remote add origin "https://$token@github.com/AhmedIbrahimofficial/portfolio.git"
git push -u origin main --force
Write-Host "Push complete!"
