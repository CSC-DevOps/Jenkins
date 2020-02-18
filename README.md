# Jenkins

## Getting a Jenkins ready image.

If using latest bakerx:
```
$ bakerx --version
bakerx@0.6.8
virtcrud@18ae833
```

Download jenkins image from Github Releases.

```
bakerx pull CSC-DevOps/Images#Spring2020 jenkins
```

Otherwise if you have not updated bakerx, use this hack to add jenkins image to the bakerx registry. Note, you will want to run in Git Bash if on Windows:

```bash
$ mkdir -p ~/.bakerx/.persist/images/jenkins
$ wget https://github.com/CSC-DevOps/Images/releases/download/Spring2020/jenkins.box -O jenkins.box
$ tar -xvf jenkins.box -C ~/.bakerx/.persist/images/jenkins
```

Provision jenkins server.

```bash
$ bakerx run jenkins jenkins --ip 192.168.44.80 --memory 2048
```

Get initial admin password.

```
$ baker ssh jenkins
vagrant@ubuntu-bionic:~$ sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

## Exploring Jenkins

➡️ Visit http://192.168.44.80:8080.

![Unlock](imgs/Unlock.png)

![Plugins](imgs/Plugins.png)

### Jenkins > Home Page

![Jenkins](imgs/Jenkins-HomePage.png)

### Jenkins > Project Types

![Projects](imgs/Jenkins-Projects.png)
