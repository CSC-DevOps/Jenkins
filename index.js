const jenkins = require('jenkins')({ baseUrl: 'http://admin:admin@192.168.44.80:8080', crumbIssuer: true, promisify: true });

async function getBuildStatus(job, id) {
    try {
        let build = await jenkins.build.get(job, id);
        return build.result;
    } catch (err) {
        console.error(err.message);
        return false;
    }
}

async function waitForBuild(job, id, timeout) {
    var start = Date.now();

    while (true) {
        try {
            let build = await jenkins.build.get(job, id);
            if (build.result) return true;
            console.log('==> build is still running, waiting 200ms...')
            await new Promise(resolve => setTimeout(resolve, 500));
        } catch (err) {
            console.error(err.message);
            return false;
        }
        if (Date.now() - start > timeout) return false;
    }
}

async function triggerBuild(job) {
    try {
        let item = await jenkins.job.build(job);
        return item;
    } catch (err) {
        console.error(err.message);
        return undefined;
    }
}

(async () => {
    let id = await triggerBuild('test-pipeline');
    await waitForBuild('test-pipeline', id, 600)
})()
