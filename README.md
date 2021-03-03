# Jenkins

## Setup

### Getting a Jenkins ready image.

🚧 Download jenkins image from Github Releases. This is a larger download, so be prepared to wait a few minutes. You also may want to run this step in another terminal...

``` bash | {type: 'command', stream: true}
bakerx pull jenkins CSC-DevOps/Images#Spring2020 
```

### Provision jenkins server.

Now that we have an image, let's provision a VM. Note that we are allocating a more memory. Jenkins can 

```bash | {type: 'command', stream: true, failed_when: 'exitCode!=0'}
bakerx run jenkins jenkins --ip 192.168.44.80 --memory 2048
```

Get initial admin password. Using the terminal, get into the VM `baker ssh jenkins`, and run:

``` bash 
sudo cat /var/lib/jenkins/secrets/initialAdminPassword 
```

``` | {type: 'terminal'} 
```

## Exploring Jenkins

➡️ Visit http://192.168.44.80:8080.

![Unlock](imgs/Unlock.png)

![Plugins](imgs/Plugins.png)

### Jenkins > Home Page

![Jenkins](imgs/Jenkins-HomePage.png)

### Jenkins > Project Types

![Projects](imgs/Jenkins-Projects.png)


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

![Pipeline-StageView](imgs/Pipeline-StageView.png)