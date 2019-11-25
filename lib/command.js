"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const qa_1 = require("./qa");
const qa_engine_1 = require("qa-engine");
class QACommand extends command_1.Command {
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const { args, flags } = this.parse(QACommand);
            let qa = new qa_1.QA();
            let options = {};
            let scope = qa.engine.scope(options);
            let folder = args.folder;
            console.log("ARGS: %o", args);
            console.log("FLAGS: %o", flags);
            qa.engine
                .read(scope, folder)
                .then((_results) => {
                console.log("success");
            })
                .catch((err) => {
                console.log("FAILED! %o", err instanceof qa_engine_1.StepError);
            });
        });
    }
}
QACommand.description = "Execute test cases";
QACommand.flags = {
    // add --version flag to show CLI version
    version: command_1.flags.version({ char: "v" }),
    help: command_1.flags.help({ char: "h" }),
    // flag with a value (-n, --name=VALUE)
    folder: command_1.flags.string({ char: "f", description: "file/folder to run" })
};
exports.QACommand = QACommand;
//# sourceMappingURL=command.js.map