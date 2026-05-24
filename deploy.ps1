Write-Host "Creating GitHub repository..."
gh repo create portfolio --public --description "Ahmed Ibrahim Portfolio - AI Innovator and Full Stack Developer"

Write-Host "Setting up git..."
git config user.name "AhmedIbrahimofficial"
git config user.email "funandentertainmentwithus@gmail.com"
git remote remove origin 2>$null
git remote add origin git@github.com:AhmedIbrahimofficial/portfolio.git

Write-Host "Staging and committing..."
git add .
git commit -m "Ahmed Ibrahim Portfolio - Complete"

Write-Host "Pushing to GitHub..."
git push -u origin main --force

Write-Host ""
Write-Host "SUCCESS! Visit: https://github.com/AhmedIbrahimofficial/portfolio"
