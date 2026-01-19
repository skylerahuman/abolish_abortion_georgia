#!/bin/bash

# Deletions
echo "Deleting stale/merged branches..."
git push origin --delete palette-join-form-a11y-8893964631007756936 || true
git push origin --delete Content-Layout-Improvements || true
git push origin --delete GH-Pages-Update || true
git push origin --delete Home-Page-Tweaks || true
git push origin --delete Map-prep-for-go-live || true
git push origin --delete Overhaul || true
git push origin --delete Pages-Restructure || true
git push origin --delete Readme-Content-Update || true
git push origin --delete Refactoring || true
git push origin --delete design-refresh-slate-fonts-1634902770302558208 || true
git push origin --delete update-color-scheme-13525421562434836752 || true
git push origin --delete update-content-map-footer-10564783183656679240 || true
git push origin --delete refactor-vercel-deployment-17119735609702753931 || true
git push origin --delete branding-and-cta-update-2009557897866069180 || true
git push origin --delete Home-Page-Revisions || true
git push origin --delete Moving-Changes-Stashed || true
git push origin --delete Content-Changes-By-Skyler || true

# Renames
echo "Renaming branches..."

rename_branch() {
    OLD=$1
    NEW=$2
    echo "Renaming $OLD -> $NEW"
    git fetch origin $OLD:$OLD || return 1
    git checkout $OLD
    git checkout -b $NEW
    git push origin $NEW
    git push origin --delete $OLD
}

rename_branch "Join-Page-Completed" "feature/legal-page-plumb-line"
rename_branch "palette-donation-accessibility-16742724719693350934" "fix/donation-a11y"
rename_branch "bolt-map-optimization-1117787301708579639" "perf/map-cleanup-optimization"
rename_branch "bolt-optimize-scroll-handler-16264034461625607745" "perf/home-scroll-handler"
rename_branch "feature/support-page-609692219957798401" "feature/support-page-refactor"
rename_branch "fix/routes-and-bugs-4214844026927921459" "fix/vercel-build-warnings"
rename_branch "jules-core-palette-refactor-11141215857367699578" "refactor/core-palette"

echo "Cleanup complete!"
