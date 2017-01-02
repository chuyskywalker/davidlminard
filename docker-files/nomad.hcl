# A nomad job for the site

job "davidlminard" {
    type = "service"
    datacenters = [ "dc1" ]
    group "davidlminard" {
        count = 1
        task "davidlminard" {
            driver = "docker"
            config {
                image = "registry.service.consul/dlm"
            }
            resources {
                memory = 256
            }
        }
    }
}
