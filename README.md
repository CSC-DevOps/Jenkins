# Jenkins

Hack to add jenkins image to bakerx registry.

```bash
$ mkdir -p ~/.bakerx/.persist/images/jenkins
$ wget https://github.com/CSC-DevOps/Images/releases/download/Spring2020/jenkins.box -O jenkins.box
$ tar -xvf jenkins.box -C ~/.bakerx/.persist/images/jenkins
# rename jenkins.ovf => box.ovf
mv ~/.bakerx/.persist/images/jenkins/jenkins.ovf ~/.bakerx/.persist/images/jenkins/box.ovf
```

Provision jenkins server.

```bash
$ bakerx run jenkins --ip 192.168.44.80 --memory 2048
```

