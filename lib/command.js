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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const qa_1 = require("./qa");
const qa_engine_1 = require("qa-engine");
const chalk_1 = __importDefault(require("chalk"));
const _ = __importStar(require("lodash"));
// let debug = require("debug")("qa:cli");
class QACommand extends command_1.Command {
    constructor(argv, config) {
        super(argv, config);
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.handle().then(() => {
                    //            console.error("FAILED: %j", e);
                }).catch((_err) => {
                    //            console.error("FAILED: %j", e);
                });
            }
            catch (e) {
                //            console.error("FAILED: %j", e);
            }
        });
    }
    handle() {
        const { args, flags } = this.parse(QACommand);
        args && true;
        let qa = new qa_1.QA();
        let options = {};
        let folder = flags.folder || "./features";
        // load scope from config file
        if (flags.phrases) {
            console.log(chalk_1.default.blueBright("# Built-in phrases"));
            console.log(chalk_1.default.grey("These can be re-generated using `qa -p` "));
            _.each(qa.engine.getDocs(), doc => {
                console.log(chalk_1.default.blueBright("\n## %s"), doc.description);
                doc.phrases.forEach(phrase => {
                    if (phrase.indexOf("\n") > 0)
                        phrase = phrase.replace("\n", "\n\t...") + "\n";
                    console.log(chalk_1.default.gray("\t%s"), phrase);
                });
            });
            return Promise.reject(0);
        }
        // load scope from config file
        if (flags.config) {
            qa_engine_1.Converters.json_or_yaml(flags.config, (_err, json) => {
                options = json;
            });
        }
        // emit progress
        if (flags.verbose) {
            qa.engine.bus.on("feature", (e) => {
                console.log(chalk_1.default.yellow("Feature: %s"), e.feature.title);
            });
            qa.engine.bus.on("scenario", (e) => {
                console.log(chalk_1.default.yellow("Scenario: %s (%s steps)"), e.scenario.title, e.scenario.steps.length);
            });
        }
        if (flags.debug) {
            qa.engine.bus.on("step", (e) => {
                console.log(chalk_1.default.white("step: %s"), e.step);
            });
        }
        qa.engine.bus.on("step:fail", (e) => {
            console.log(chalk_1.default.red("step:fail: %s"), e.step);
        });
        if (flags.target) {
            options.targets = options.targets || {};
            options.target = options.targets[flags.target];
        }
        // configuration for tests
        let scope = qa.engine.scope(options);
        return new Promise((resolve, reject) => {
            // execute test cases
            qa.engine.read(scope, folder).then((_results) => {
                flags.debug && console.log("---".repeat(10));
                flags.verbose && console.log(chalk_1.default.bold.green("completed: %o / %o"), _results.total - _results.fails, _results.total);
                //            process.exit(_results.fails);
                resolve(0);
            }).catch((err) => {
                console.log(chalk_1.default.red("failed %o"), err);
                //            process.exit(1);
                reject(1);
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
    phrases: command_1.flags.boolean({ char: "p", description: "show known phrases" }),
    target: command_1.flags.string({ char: "t", description: "use a target from options.targets" }),
    folder: command_1.flags.string({ char: "f", description: "file/folder containing features" }),
    config: command_1.flags.string({ char: "c", description: "config file" })
};
exports.QACommand = QACommand;
//# sourceMappingURL=command.js.map