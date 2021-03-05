# Jenkins

In this short workshop, we'll learn about Jenkins, how to configure it, some concepts related to build jobs and the server, and demostrate the process of creating a build job manually, and automatically with `jenkins-job-builder`.

``` | {type: 'youtube'}
https://www.youtube.com/embed/ZI4FHSlKb5c
```

## Setup

### Before you get started

Import this as a notebook or clone this repo locally. Also, ensure you [install latest version of docable](https://github.com/ottomatica/docable-notebooks/blob/master/docs/install.md)!

```bash
docable-server import https://github.com/CSC-DevOps/Jenkins
```

### Getting a Jenkins ready image.

🚧 Download jenkins image from Github Releases. This is a larger download (1.7GB), so be prepared to wait a few minutes. You also may want to run this step in another terminal...

``` bash | {type: 'command', stream: true}
bakerx pull jenkins CSC-DevOps/Images#Spring2021
```

ℹ️: This image was built using packer! See repository for [more details](https://github.com/CSC-DevOps/Images/tree/master/Jenkins).

### Provision jenkins server.

Now that we have an image, let's provision a VM. Note that we are allocating a more memory. 

```bash | {type: 'command', stream: true, failed_when: 'exitCode!=0'}
bakerx run jenkins jenkins --ip 192.168.44.80 --memory 2048
```

## Configuring Jenkins for Initial Use

Out-of-the-box, Jenkins isn't quite ready to use.

There are four major items that need to be configured.

1. **Login in with initial password.** To get the initial admin password. Using the terminal, get into the VM `bakerx ssh jenkins`, and run:

    ``` bash 
    sudo cat /var/lib/jenkins/secrets/initialAdminPassword 
    ```
    
    ➡️ Visit http://192.168.44.80:8080 and paste the password in the field.

   <img src="imgs/Unlock.png" alt="unlock" width="800"/>

``` | {type: 'terminal'} 
```

2. **Install plugins.** By default, Jenkins only provides a minimal set of functionality for supporting continuous integration. To get the best use out of Jenkins, several plugins should be installed. The setup wizard will install a set of recommended plugins, including plugins related to the newer "pipelines as code" style for setting up build jobs.

   <img src="imgs/Plugins.png" alt="plugins" width="800"/>

   When automated this step. You can take advantage of the ansible module for installing plugins:

   ```yml
   - name: Install plugins
       jenkins_plugin:
         name: build-pipeline-plugin
   ```

3. **Create admin user.** The initial admin password should only be used for initial setup of the server. Using the form, you can provide the details for the user.

    When automated this step, one way to do this is to place a groovy file in the Jenkins server at `/var/lib/jenkins/init.groovy.d/basic-security.groovy`.

```grovy | {type: 'info', range: {start: 10,end:10}}
#!groovy

import jenkins.model.*
import hudson.security.*

def instance = Jenkins.getInstance()

println "--> creating local user 'admin'"

def hudsonRealm = new HudsonPrivateSecurityRealm(false)
hudsonRealm.createAccount('admin','admin')
instance.setSecurityRealm(hudsonRealm)

def strategy = new FullControlOnceLoggedInAuthorizationStrategy()
instance.setAuthorizationStrategy(strategy)
instance.save()
```

4. **Instance configuration.** The last step involves setting up the jenkins url. One common thing to change is the port, because web applications sometimes like to bind to 8080, which jenkins is using! But for this workshop, this default is fine.

## Concepts in Jenkins

```|{type:'slides', width: 1280, height: 750}
https://docs.google.com/presentation/d/e/2PACX-1vSVUG6Vb2koRP-M-nkz7I61_rBXIMVdvFee17fX_m7Tn-fkBEesS3F2AY_PpkSI4S24DknXY4R2oiVR/embed?start=false&loop=false&delayms=3000"
```


## Exploring Jenkins

➡️ Visit http://192.168.44.80:8080.

### Creating a Freestyle Project

On the Jenkins Home Page click Jenkins > New Item. Enter a project name "free", then select Free Style Project, then click "Ok" on the bottom of the page.

Once the project is created, enter the following, inside Build > Add Build Step [Execute Shell]:

```
git clone https://github.com/CSC-DevOps/App
cd App
npm install
npm test
```

Hit `Save` on the bottom of the page. 

Next, on the project home page, manually trigger a build by clicking "Build Now".

![BuildHistory](imgs/BuildHistory.png)

### Using Jenkins Job Builder

Let's create a job using jenkins job builder.

```bash
vagrant@ubuntu-bionic:~$ jenkins-jobs --user admin --password admin update test-pipeline.yml 
WARNING:jenkins_jobs.config:Config file, /etc/jenkins_jobs/jenkins_jobs.ini, not found. Using default config values.
INFO:jenkins_jobs.cli.subcommand.update:Updating jobs in ['test-pipeline.yml'] ([])
INFO:jenkins_jobs.builder:Number of jobs generated:  1
INFO:jenkins_jobs.builder:Creating jenkins job test-pipeline
INFO:jenkins_jobs.cli.subcommand.update:Number of jobs updated: 1
INFO:jenkins_jobs.builder:Number of views generated:  0
INFO:jenkins_jobs.cli.subcommand.update:Number of views updated: 0
```

``` | {type: 'terminal'}
```

![Pipeline-StageView](imgs/Pipeline-StageView.png)


### Triggering a build with node.js

Including with the notebook, are "package.json" and "index.js", which include prototype code for triggering a jenkins build.

Let's install the `jenkins` package.

```bash | {type: 'command'}
npm install
```

Open [index.js](index.js) or print it out.

```bash | {type: 'command'}
cat index.js
```

Let's try triggering the build job.

```bash | {type: 'command'}
node index.js
```


