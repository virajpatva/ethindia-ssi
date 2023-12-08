"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const moment_1 = require("moment");
const winston_1 = require("winston");
class Logging {
    constructor() {
        // define the logs level
        this.logLevel = "silly";
        // return the file name from absolute path for label in logs
        this.getLabel = (fileName) => {
            const parts = fileName.split("/");
            return parts[parts.length - 2] + "/" + parts.pop();
        };
        // return the file path for log file
        this.filePath = () => {
            const dir = __dirname + "/../../logs";
            if (!(0, fs_1.existsSync)(dir)) {
                (0, fs_1.mkdirSync)(dir);
            }
            return dir + `/logs_${(0, moment_1.utc)().format("YYYY-MM-DD")}_.log`;
        };
        // set file transport object
        this.fileOption = () => {
            return {
                level: this.logLevel,
                filename: this.filePath(),
                maxsize: 16777216, // Maximum size of a log file should be 16MB
                maxFiles: 64, // Maximum 64 file of 16 MB to be stored. i.e Max 1GB of logs can be stored
                handleExceptions: true,
                label: null, // Display file name
                json: false, // write error in json object or plain text
                timestamp: true,
                depth: "",
                colorize: false,
                // silent: true    // Uncomment to turn off logging
            };
        };
        // set console transport object
        this.consoleOption = () => {
            return {
                level: this.logLevel,
                handleExceptions: true,
                label: null, // Display file name
                json: false, // write error in json object or plain text
                timestamp: true,
                depth: false,
                colorize: true, // for colorized error (i.e red for error, green for info)
                // silent: true // Uncomment to turn off logging
            };
        };
        // create transport array
        this.transportList = () => {
            return [new winston_1.transports.Console(this.consoleOption()), new winston_1.transports.File(this.fileOption())];
        };
        this.logger = new winston_1.Logger({
            transports: this.transportList(),
            exceptionHandlers: this.transportList(),
        });
    }
    // public methods for external use
    error(fileName, method, uuid, msg, data = {}) {
        this.setLabel(fileName, method);
        this.logger.error(`${uuid} - ${msg}`, data ? data : "", "");
    }
    warn(fileName, method, uuid, msg, data = {}) {
        this.setLabel(fileName, method);
        this.logger.warn(`${uuid} - ${msg}`, data ? data : "", "");
    }
    info(fileName, method, uuid, msg, data = {}) {
        this.setLabel(fileName, method);
        this.logger.info(`${uuid} - ${msg}`, data ? data : "", "");
    }
    verbose(fileName, method, uuid, msg, data = {}) {
        this.setLabel(fileName, method);
        this.logger.verbose(`${uuid} - ${msg}`, data ? data : "", "");
    }
    debug(fileName, method, uuid, msg, data = {}) {
        this.setLabel(fileName, method);
        this.logger.debug(`${uuid} - ${msg}`, data ? data : "", "");
    }
    silly(fileName, method, uuid, msg, data = {}) {
        this.setLabel(fileName, method);
        this.logger.silly(`${uuid} - ${msg}`, data ? data : "", "");
    }
    setFileLevel(level) {
        this.logger.transports.file.level = level;
    }
    setConsoleLevel(level) {
        this.logger.transports.console.level = level;
    }
    setLabel(fileName, method = null) {
        let label = this.getLabel(fileName);
        label += method ? ` ~ ${method}` : "";
        this.logger.transports.console["label"] = label;
        this.logger.transports.file["label"] = label;
    }
}
const logger = new Logging();
exports.default = logger;
//# sourceMappingURL=logger.js.map