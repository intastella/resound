#update apt sources
sudo apt-get update

#install tools
sudo apt-get install -y apache2 curl git

#remove default hosting directory and link it to /vagrant
if ! [ -L /var/www ]; then
  sudo rm -rf /var/www
  sudo ln -fs /vagrant /var/www
fi

#set server name to avoid warning
sudo echo 'ServerName localhost' >> /etc/apache2/conf-available/servername.conf

#enable servername config
sudo a2enconf servername

#enable mod_rewrite
sudo a2enmod rewrite

#backup the default site
sudo mv /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/000-default.conf.bu

#set up new default site and enable htaccess
sudo echo  '<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined

    <Directory /var/www/>
      Options Indexes FollowSymLinks MultiViews
      AllowOverride All
      Order allow,deny
      allow from all
    </Directory>
</VirtualHost>' >> /etc/apache2/sites-available/000-default.conf

#restart the server
sudo apachectl restart

#install node from nodesource repo
#https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs

#auto cd into /vagrant on vagrant ssh
sudo echo 'cd /vagrant' >> /home/vagrant/.bash_profile
