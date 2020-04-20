"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const qa_engine_1 = require("qa-engine");
class QA {
    constructor() {
        this.engine = new qa_engine_1.Engine({ started: Date.now() });
        new qa_engine_1.CommonDialect(this.engine);
        new qa_engine_1.FilesDialect(this.engine);
        new qa_engine_1.ProcessesDialect(this.engine);
        new qa_engine_1.ScriptingDialect(this.engine);
        new qa_engine_1.TCPDialect(this.engine);
        new qa_engine_1.VarsDialect(this.engine);
        new qa_engine_1.WebAPIDialect(this.engine);
        new qa_engine_1.X509Dialect(this.engine);
    }
}
exports.QA = QA;
//# sourceMappingURL=qa.js.map