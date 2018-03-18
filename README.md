# Resound

## Install

[Vagrant](http://www.vagrantup.com) is used to provide a common development environment, no matter which host OS you want to use (Windows/Mac/Linux).
Vagrant requires virtual machine software and by default uses [Virtual Box](https://www.virtualbox.org/wiki/Downloads), which is free.  Go to [Virtual Box](https://www.virtualbox.org/wiki/Downloads) to download and install it, then [download and install Vagrant](http://www.vagrantup.com/downloads.html).

Once these are installed, open the repository in your command line:

To start up the vagrant machine run:
```bash
    vagrant up
```
Then SSH into the vagrant machine
```bash
    vagrant ssh
```
Now you are inside the Vagrant machine.  Install Gulp with:
```bash
    sudo npm install gulp-cli -g
```
Install the Gulp plugins with:
```bash
    npm install
```
Then build Pug pages with Gulp by running:
```bash
    gulp
```
Go to [http://localhost:8080/](http://localhost:8080/) in your browser, and you should see your project directory.  Click any HTML file to view it.