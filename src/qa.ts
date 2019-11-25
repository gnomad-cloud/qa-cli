

import { Engine, CommonDialect, ProcessesDialect, FilesDialect, VarsDialect, ScriptingDialect, WebAPIDialect, X509Dialect,TCPDialect } from "qa-engine";



export class QA {
    engine: Engine;

    constructor() {
        this.engine = new Engine({ started: Date.now() });

        new X509Dialect(this.engine);
        new CommonDialect(this.engine);
        new FilesDialect(this.engine);
        new ProcessesDialect(this.engine);
        new ScriptingDialect(this.engine);
        new TCPDialect(this.engine);
        new VarsDialect(this.engine);
        new WebAPIDialect(this.engine);
    
    }

    
}