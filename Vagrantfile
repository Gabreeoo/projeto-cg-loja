Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/jammy64"

  config.vm.define "vm1" do |vm1|
    vm1.vm.hostname = "vm1-cliente"
    vm1.vm.network "private_network", ip: "192.168.56.10"
    vm1.vm.provider "virtualbox" do |vb|
      vb.memory = 1024
    end

    vm1.vm.provision "shell",
      inline: "apt-get update -y && apt-get install -y curl"
  end

  config.vm.define "vm2" do |vm2|
    vm2.vm.hostname = "vm2-api"
    vm2.vm.network "private_network", ip: "192.168.56.11"
    vm2.vm.provider "virtualbox" do |vb|
      vb.memory = 1024
    end

    vm2.vm.synced_folder ".", "/vagrant_data"

    vm2.vm.provision "shell", inline: <<~SHELL
      set -e
      apt-get update -y
      apt-get install -y ca-certificates curl
      curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
      apt-get install -y nodejs

      cd /vagrant_data
      npm ci --omit=dev

      cat > /etc/systemd/system/loja-api.service <<'SERVICE'
      [Unit]
      Description=API Loja de Doces
      After=network.target

      [Service]
      Type=simple
      WorkingDirectory=/vagrant_data
      ExecStart=/usr/bin/node /vagrant_data/index.js
      Restart=on-failure
      User=vagrant

      [Install]
      WantedBy=multi-user.target
      SERVICE

      systemctl daemon-reload
      systemctl enable --now loja-api
    SHELL
  end
end
