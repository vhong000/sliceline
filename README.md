# Pizzahub

## To run the app:

1. Inside pizzahub folder, run `python manage.py runserver`
2. Click on the development server link and app should be loaded in browser.

## Git commands

`git checkout <user branch>`

### To Push Changes
1. Push the changes to own branch
 - `git status` to check status
 - `git add <file>` to add all modified files
 - `git commit -m <message>` to commit added files
 - `git push` to push added/commited files 
2. Merge and push from master branch to master remote
 - `git checkout master`
 - `git merge <user branch>`
 - `git push`
3. Go back to own branch
 - `git checkout <user branch>`

### To Fetch Changes
1. Make sure local branch is updated
 - `git add <files>`
 - `git commit -a -m <message>`
 - `git push`
2. Pull from Master branch
 - `git checkout master`
 - `git pull`
3. Merge with Master from own branch and push
 - `git checkout <user branch>`
 - `git merge master`
 - `git push`
