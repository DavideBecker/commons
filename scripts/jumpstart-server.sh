#!/bin/bash

# Terminal colors
red=$(tput setaf 1 || tput AF 1)
green=$(tput setaf 2 || tput AF 2)
yellow=$(tput setaf 3 || tput AF 3)
blue=$(tput setaf 4 || tput AF 4)
magenta=$(tput setaf 5 || tput AF 5)
cyan=$(tput setaf 6 || tput AF 6)
reset=$(tput sgr0)

REGEX__ChallengeResponseAuthentication="ChallengeResponseAuthentication[[:space:]]+"
REGEX__PasswordAuthentication="PasswordAuthentication[[:space:]]+"
REGEX__UsePAM="UsePAM[[:space:]]+"
REGEX__PermitRootLogin="PermitRootLogin[[:space:]]+"
FOLDER__APACHE_SITES_AVAILABLE="/etc/apache2/sites-available"
PATH__SSH_CONFIG="/etc/ssh/sshd_config"
USER__APACHE="www-data"
REPOSITORY__LETS_ENCRYPT="ppa:certbot/certbot"
URL__NODEJS_SETUP="https://deb.nodesource.com/setup_12.x"

# Removes the hash at the start of a line
function uncomment {
    sudo sed -re "s/^(\#)($1)(.*?)/\2\3/" -i.`date -I` $2
}

# Sets an option in the SSH config file to "no"
function sshConfig_disable {
    uncomment $1 $PATH__SSH_CONFIG
    sudo sed -re "s/^($1)yes/\1no/" -i.`date -I` $PATH__SSH_CONFIG
}

# Sets an option in the SSH config file to "yes"
function sshConfig_enable {
    uncomment $1 $PATH__SSH_CONFIG
    sed -re "s/^(${1})no/\1\2yes/" -i.`date -I` $PATH__SSH_CONFIG
}


################################################################################
# Update packages
sudo apt update


################################################################################
# Add new user
    echo ""
    echo -n "How should the new user be called? > "
    read USERNAME

    # Add new user
    # Add user
    adduser $USERNAME
    # Make him sudo
    usermod -aG sudo $USERNAME
    echo ""
    echo "Added user $USERNAME"
    echo ""

    #####
    # Disable passwords & restart ssh
        # /etc/ssh/sshd_config
        # ChallengeResponseAuthentication no
        # PasswordAuthentication no
        # UsePAM no
        sshConfig_disable $REGEX__ChallengeResponseAuthentication
        sshConfig_disable $REGEX__PasswordAuthentication
        sshConfig_disable $REGEX__UsePAM
        sshConfig_disable $REGEX__PermitRootLogin

        systemctl restart sshd
        echo ""
        echo "Disabled password and root login. Make sure you enter a SSH key in the next step."
        echo "Otherwise you will lock yourself out of the server after disconnecting."
        echo ""
    #####


################################################################################
# Add add file for executing the rest in user context
cat >/home/$USERNAME/jumpstart.sh << 'EOT'
#!/bin/bash

# Terminal colors
red=$(tput setaf 1 || tput AF 1)
green=$(tput setaf 2 || tput AF 2)
yellow=$(tput setaf 3 || tput AF 3)
blue=$(tput setaf 4 || tput AF 4)
magenta=$(tput setaf 5 || tput AF 5)
cyan=$(tput setaf 6 || tput AF 6)
reset=$(tput sgr0)

function add_ssh_key {
    echo ""
    echo -n "Paste the SSH key you want to add to the user $USERNAME. >"
    read SSH_KEY
    echo $SSH_KEY >> ~/.ssh/authorized_keys
    echo ""

    echo "Added the key to the authorized_keys file"
    echo ""
}

function generate_ssl_cert {
    echo ""
    echo "Which domain do you want to add a certificate for? (google.de)"
    echo -n "Enter n to cancel "
    read SSL_DOMAIN
    if [$SSL_DOMAIN != 'n']; then
        sudo certbot --apache -d $SSL_DOMAIN
    fi
    echo ""
}

function ask_user {
    echo ""
    response="x"
    echo -n "$1 (y | n)"
    while [ "$response" != "y" ] && [ "$response" != "n" ]; do
        echo "> "
        read response
    done
    local  __result=$2
    eval $__result=$response
    echo ""
}

REGEX__ChallengeResponseAuthentication="ChallengeResponseAuthentication[[:space:]]+"
REGEX__PasswordAuthentication="PasswordAuthentication[[:space:]]+"
REGEX__UsePAM="UsePAM[[:space:]]+"
REGEX__PermitRootLogin="PermitRootLogin[[:space:]]+"
FOLDER__APACHE_SITES_AVAILABLE="/etc/apache2/sites-available"
PATH__SSH_CONFIG="/etc/ssh/sshd_config"
USER__APACHE="www-data"
REPOSITORY__LETS_ENCRYPT="ppa:certbot/certbot"
URL__NODEJS_SETUP="https://deb.nodesource.com/setup_12.x"

################################################################################
# Add SSH Key to the newly created user
    mkdir ~/.ssh
    touch ~/.ssh/authorized_keys
    chmod 700 ~/.ssh
    chmod 600 ~/.ssh/authorized_keys
    echo ""
    echo "Creating SSH folders and setting restrictive permissions"
    echo ""
    add_ssh_key


################################################################################
# [Optional] Install Apache
    ask_user "Install Apache?" INSTALL_APACHE

    if [ $INSTALL_APACHE == "y" ]; then
        # Install Apache
        sudo apt install -y apache2
        sudo ufw allow 'Apache Full'
        sudo ufw allow 'Apache'

    #####
    # Optionally mount relevant apache folders to user directory
        echo "Do you want to mount apache folders to your home directory? (Recommended)"
        ask_user "This will allow you to edit apache configs without root permissions from within your user directory" MOUNT_APACHE_CONFIGS
        if [ $MOUNT_APACHE_CONFIGS == "y" ]; then
            # Mount apache folders
            apt install -y bindfs
            mkdir -p /home/$USER/apache/sites
            chown -Rf $USER:$USER /home/$USER/apache/sites
            chmod -Rf 770 /home/$USER/apache/sites
            echo "bindfs#$FOLDER__APACHE_SITES_AVAILABLE /home/$USER/apache/sites fuse force-user=$USER,force-group=$USER,create-for-user=$USER__APACHE,create-for-group=$USER__APACHE,create-with-perms=0770,chgrp-ignore,chown-ignore,chmod-ignore 0 0" | sudo tee /etc/fstab
            sudo mount /home/$USER/apache/sites
        fi
    #####

    #####
    # Optionally set up let's encrypt
        ask_user "Do you want to setup Let's Encrypt?" SETUP_LETS_ENCRYPT
        if [ $SETUP_LETS_ENCRYPT == "y" ]; then
            # Setup Let's Encrypt
            sudo add-apt-repository ppa:certbot/certbot
            sudo apt install -y python-certbot-apache
        fi
    #####

    #####
    # Optionally enable SSL proxy modules
        ask_user "Do you want to enable apache modules for an apache proxy?" ENABLE_PROXY_MODULES
        if [ $ENABLE_PROXY_MODULES == "y" ]; then
            # Mount apache folders
            sudo a2enmod proxy
            sudo a2enmod proxy_http
        fi
    #####
    fi


################################################################################
# [Optional] Install Node
    ask_user "Install NodeJS (v12)?" INSTALL_NODEJS

    if [ $INSTALL_NODEJS == "y" ]; then
        # Install Node
        curl -sL $URL__NODEJS_SETUP | sudo -E bash -
        sudo apt install -y nodejs
        node -v
        npm -v
    fi


################################################################################
# Setup firewall
    sudo ufw allow 'OpenSSH'
    sudo ufw enable
    sudo ufw app list
EOT


################################################################################
# Change ownership of the user jumpstart script
chown $USERNAME:$USERNAME /home/$USERNAME/jumpstart.sh


################################################################################
# Continue by executing the rest of the script as the new user
# This ensures some permissions and files are in a user context, not root
sudo -u $USERNAME /home/$USERNAME/jumpstart.sh


################################################################################
# Remove this file and the generated user script
# Goodbye cruel world
rm -- "$0"
rm /home/$USERNAME/jumpstart.sh


################################################################################
# Switch to new user
su - $USERNAME