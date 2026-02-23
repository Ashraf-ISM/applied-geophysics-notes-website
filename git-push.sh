# 1. Go to your project root (adjust path if needed)
cd ~/Music/geophysics-hub-main

# 2. Initialize git (if not already)
git init

# 3. Create .gitignore (important)
cat <<EOL > .gitignore
node_modules
.env
dist
.vite
EOL

# 4. Add all files
git add .

# 5. Commit changes
git commit -m "Full-stack geophysics hub: Supabase auth, admin panel, protected routes"

# 6. Rename branch to main
git branch -M main

# 7. Add remote GitHub repository
git remote remove origin 2>/dev/null
git remote add origin https://github.com/Ashraf-ISM/geophysics-hub.git

# 8. Push to GitHub
git push -u origin main
# 9. Done
echo "Code pushed to GitHub repository successfully."