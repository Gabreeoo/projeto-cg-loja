Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/jammy64"

  # VM1 - Nó de Controle
  config.vm.define "vm1" do |vm1|
    vm1.vm.hostname = "vm1-cliente"
    vm1.vm.network "private_network", ip: "192.168.56.10"
    vm1.vm.provider "virtualbox" do |vb|
      vb.memory = 1024
    end

    vm1.vm.provision "shell",
      inline: "apt-get update -y && apt-get install -y curl sshpass ansible"
  end

  # VM2 - Nó Gerenciado
  config.vm.define "vm2" do |vm2|
    vm2.vm.hostname = "vm2-api"
    vm2.vm.network "private_network", ip: "192.168.56.11"
    vm2.vm.provider "virtualbox" do |vb|
      vb.memory = 1024
    end
    
  end
end