function actuator(
    actuatorInfoUrl) {

    document.addEventListener("readystatechange", function () {

        if (document.readyState === "complete") {
            onComplete()
        }
    })

    function onComplete() {

        find()
    }

    function find() {

        fetchGet(actuatorInfoUrl)
            .then(response => response.json())
            .then(info => afterFind(info))
    }

    function afterFind(info) {

        document.getElementById("git-commit-time").innerHTML = `${moment(new Number(info.git.commit.time) * 1000).format("MMMM Do, YYYY")} ${moment(new Number(info.git.commit.time) * 1000).format("h:mm:ss A UTC")}`;
    }
}
