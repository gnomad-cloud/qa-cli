"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const qa_1 = require("./qa");
const qa_engine_1 = require("qa-engine");
const chalk_1 = __importDefault(require("chalk"));
class QACommand extends command_1.Command {
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const { args, flags } = this.parse(QACommand);
            args && true;
            let qa = new qa_1.QA();
            let options = {};
            let folder = flags.folder || "./features";
            // load scope from config file
            if (flags.config) {
                qa_engine_1.Converters.json_or_yaml(flags.config, (_err, json) => {
                    options = json;
                });
            }
            // emit progress
            if (flags.verbose) {
                qa.engine.bus.on("feature", (e) => {
                    console.log(chalk_1.default.yellow("%s"), e.feature.title);
                });
                qa.engine.bus.on("scenario", (e) => {
                    console.log(chalk_1.default.green("  %s -> %o").padStart(2), e.scenario.title, e.scenario.annotations);
                });
            }
            if (flags.debug) {
                qa.engine.bus.on("step", (e) => {
                    console.log(chalk_1.default.white("    %s").padStart(4), e.step);
                });
            }
            qa.engine.bus.on("step:fail", (e) => {
                console.log(chalk_1.default.red("    step: %s").padStart(4), e.step);
            });
            if (flags.target) {
                options.targets = options.targets || {};
                options.target = options.targets[flags.target];
            }
            // execute test cases
            let scope = qa.engine.scope(options);
            qa.engine.read(scope, folder).then((_results) => {
                flags.debug && console.log("---".repeat(10));
                flags.verbose && console.log(chalk_1.default.bold.green("QA Results: %o / %o"), _results.total - _results.fails, _results.total);
                process.exit(_results.fails);
            }).catch((err) => {
                console.log(chalk_1.default.red("ERRORS! %o"), err);
            });
        });
    }
}
QACommand.description = "Execute test cases";
QACommand.flags = {
    // add --version flag to show CLI version
    verbose: command_1.flags.boolean({ char: "v", description: "verbose mode" }),
    debug: command_1.flags.boolean({ char: "d", description: "debug - show steps" }),
    help: command_1.flags.help({ char: "h" }),
    target: command_1.flags.string({ char: "t", description: "use a target from options.targets" }),
    folder: command_1.flags.string({ char: "f", description: "file/folder containing features" }),
    config: command_1.flags.string({ char: "c", description: "config file" })
};
exports.QACommand = QACommand;
//# sourceMappingURL=command.js.map