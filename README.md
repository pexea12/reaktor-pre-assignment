# Pre-assignment

Demo: [Demo](http://reaktor.jebetech.online/)

## Requirements

Node 12.13.1

## Run

`node server.js`

## Environment variables
- `STATUS_FILE_PATH`: default to `./status`
- `HOST`: default to `127.0.0.1`
- `PORT`: default to `3000`

## Instruction

On a Debian and Ubuntu systems, there is a file called /var/lib/dpkg/status that holds information about software packages that the system knows about. Write a small program in a programming language of your choice that exposes some key information about packages in the file via an HTML interface.

- The index page lists installed packages alphabetically with package names as links.
- When following each link, you arrive at a piece of information about a single package. The following information should be included:
  + Name
  + Description
  + The names of the packages the current package depends on (skip version numbers)
  + The names of the packages that depend on the current package
- The dependencies and reverse dependencies should be clickable and the user can navigate the package structure by clicking from package to package.
- The application must be available publicly on the internet. You can, for example, use Heroku to host it for free. Provide a link to the website in your job application.

