"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.i18n = void 0;
const i18n_1 = __importDefault(require("i18n"));
exports.i18n = i18n_1.default;
i18n_1.default.configure({
    defaultLocale: 'en',
    directory: __dirname + '/../../../locales/', // JSON file location
    locales: ['en'], // array of locales
    cookie: 'node_boilerplate', // cookie from whicle locale settings will be parsed
    autoReload: true, // reload locales after change
    objectNotation: true
});
//# sourceMappingURL=index.js.map