$token = "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ye"
$headers = @{
    "Authorization" = "token $token"
    "Content-Type"  = "application/json"
}
$body = '{"name":"portfolio","description":"Ahmed Ibrahim Portfolio - AI Innovator & Full Stack Developer","private":false}'

Write-Host "Creating GitHub repository..."
$response = Invoke-RestMethod -Uri "https://api.github.com/user/repos" -Method POST -Headers $headers -Body $body -ErrorAction SilentlyContinue
if ($response.html_url) {
    Write-Host "Repo created: $($response.html_url)"
} else {
    Write-Host "Repo may already exist, continuing..."
}

Write-Host "Configuring git..."
git config user.name "AhmedIbrahimofficial"
git config user.email "funandentertainmentwithus@gmail.com"

Write-Host "Staging files..."
git add .

Write-Host "Committing..."
git commit -m "Initial portfolio commit"

Write-Host "Setting remote..."
git remote remove origin 2>$null
git remote add origin "https://$token@github.com/AhmedIbrahimofficial/portfolio.git"

Write-Host "Pushing to GitHub..."
git branch -M main
git push -u origin main --force

Write-Host "DONE! Check https://github.com/AhmedIbrahimofficial/portfolio"
