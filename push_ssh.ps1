git config user.name "AhmedIbrahimofficial"
git config user.email "funandentertainmentwithus@gmail.com"
git remote remove origin 2>$null
git remote add origin git@github.com:AhmedIbrahimofficial/portfolio.git
git add .
git commit -m "Fix build errors, add real images, white text" 2>$null
git push -u origin main --force
Write-Host "DONE!"
