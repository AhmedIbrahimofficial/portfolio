git config user.name "AhmedIbrahimofficial"
git config user.email "funandentertainmentwithus@gmail.com"

# Add GitHub to known hosts first
$knownHostsPath = "$env:USERPROFILE\.ssh\known_hosts"
$githubKey = "github.com ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOMqqnkVzrm0SdG6UOoqKLsabgH5C9okWi0dh2l9GKJl"
if (-not (Test-Path $knownHostsPath)) { New-Item -ItemType File -Path $knownHostsPath -Force }
$existing = Get-Content $knownHostsPath -ErrorAction SilentlyContinue
if ($existing -notcontains $githubKey) {
    Add-Content -Path $knownHostsPath -Value $githubKey
    Write-Host "GitHub added to known hosts"
}

git remote remove origin 2>$null
git remote add origin git@github.com:AhmedIbrahimofficial/portfolio.git
git add .
git commit -m "Portfolio: Ahmed Ibrahim - Full Stack & AI Developer" 2>$null
git push -u origin main --force
Write-Host "DONE! Check github.com/AhmedIbrahimofficial/portfolio"
