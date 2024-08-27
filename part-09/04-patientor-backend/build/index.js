"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ping_1 = __importDefault(require("./routes/ping"));
const PORT = 3001;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/ping', ping_1.default);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
