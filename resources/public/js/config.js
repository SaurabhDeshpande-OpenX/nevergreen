function Config() {

    this.save = function (settings) {
        localStorage.setItem("cctray", settings.cctray)
    }

    this.load = function () {
        var projects = localStorage.getItem("includedProjects");
        return {
            cctray: localStorage.getItem("cctray"),
            includedProjects: projects == null ? null : projects.split(",")
        }
    }

    this.isReady = function () {
        return this.hasCctray() && localStorage.hasOwnProperty("includedProjects")
    }

    this.hasCctray = function () {
        return localStorage.hasOwnProperty("cctray")
    }
}
