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
    printf "How should the new user be called? >"
    read USERNAME

    # Add new user
    # Add user
    adduser $USERNAME
    # Make him sudo
    usermod -aG sudo $USERNAME

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
    #####


################################################################################
# Add add file for user context
cat << 'EOF' >> /home/$USERNAME/jumpstart.sh
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
    echo -n "Paste the SSH key you want to add to the user $USERNAME. >"
    read SSH_KEY
    echo $SSH_KEY >> ~/.ssh/authorized_keys
}

function generate_ssl_cert {
    echo -n "Which domain do you want to add a certificate for? (google.de)"
    echo -n "Enter n to cancel"
    read SSL_DOMAIN
    if [$SSL_DOMAIN != 'n']; then
        sudo certbot --apache -d $SSL_DOMAIN
    fi
}

function ask_user {
    response="x"
    printf "$1 (y | n)"
    while [ "$response" != "y" ] && [ "$response" != "n" ]; do
        echo -n "> "
        read response
    done
    local  __result=$2
    eval $__result=$response
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
        # printf "Do you want to mount apache folders to your home directory? (Recommended)"
        # ask_user "This will allow you to edit apache configs without root permissions from within your user directory" MOUNT_APACHE_CONFIGS
        # if [ $MOUNT_APACHE_CONFIGS == "y" ]; then
        #     # Mount apache folders
        #     apt install -y bindfs
        #     mkdir apache
        #     sudo bindfs#$FOLDER__APACHE_SITES_AVAILABLE /home/$USER/apache/sites fuse force-user=$USER,force-group=$USER,create-for-user=$USER__APACHE,create-for-group=$USER__APACHE,create-with-perms=0770,chgrp-ignore,chown-ignore,chmod-ignore 0 0
        # fi
    #####

    #####
    # Optionally set up let's encrypt
        ask_user "Do you want to setup Let's Encrypt?" SETUP_LETS_ENCRYPT
        if [ $SETUP_LETS_ENCRYPT == "y" ]; then
            # Mount apache folders
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
EOF

################################################################################
# Switch to user
su - $USERNAME

################################################################################
# Remove this file
# Goodbye cruel world
rm -- "$0"