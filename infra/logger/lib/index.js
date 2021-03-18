"use strict";
//
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.LOG_LEVEL = void 0;
const winston_1 = require("winston");
const { Console } = winston_1.transports;
exports.LOG_LEVEL = process.env.LOG_LEVEL ?? "info";
exports.logger = winston_1.createLogger({
    level: exports.LOG_LEVEL,
    transports: [],
});
if (process.env.NODE_ENV !== "production") {
    exports.logger.add(new Console({
        format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple()),
    }));
}
else {
    exports.logger.add(new Console({
        format: winston_1.format.json(),
    }));
}
