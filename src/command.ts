import { Command, flags } from "@oclif/command";
import { QA } from "./qa";
import { ResultSet, Converters  } from "qa-engine";
import chalk from "chalk";
import * as _ from "lodash";

export class QACommand extends Command {
    static description = "Execute test cases";

    static flags = {
        // add --version flag to show CLI version
        verbose: flags.boolean({ char: "v", description: "verbose mode" }),
        debug: flags.boolean({ char: "d", description: "debug - show steps" }),
        help: flags.help({ char: "h" }),
        target: flags.string({ char: "t", description: "use a target from options.targets" }),
        folder: flags.string({ char: "f", description: "file/folder containing features" }),
        config: flags.string({ char: "c", description: "config file" })
    };

    async run() {
        const { args, flags } = this.parse(QACommand);

        args && true;
        let qa = new QA();
        let options: any = {};

        let folder = flags.folder;

        // load scope from config file
        if (flags.config) {
            Converters.json_or_yaml (flags.config, (_err, json) => {
                options = json;
            });
        }

        // emit progress
        if (flags.verbose) {
            qa.engine.bus.on("feature", (e) => {
                console.log( chalk.yellow("feature: %s"), e.feature.title)
            });
            qa.engine.bus.on("scenario", (e) => {
                console.log( chalk.green("scenario: %s -> %o").padStart(2), e.scenario.title, e.scenario.annotations)
            });
        }

        if (flags.debug) {
            qa.engine.bus.on("step", (e) => {
                console.log( chalk.white("step: %s").padStart(4), e.step)
            });
        }

        qa.engine.bus.on("step:fail", (e) => {
            console.log( chalk.red("step: %s").padStart(4), e.step)
        });

        if (flags.target) {
            options.targets = options.targets || {};
            options.target = options.targets[flags.target];
        }

        // execute test cases
        let scope = qa.engine.scope(options);
        qa.engine.read(scope, folder).then((_results: ResultSet) => {
            flags.verbose && console.log( chalk.bold.green("QA Results: %o/ %o"), _results.total - _results.fails, _results.total);
            process.exit(_results.fails);
        }).catch((err: any) => {
            console.log( chalk.red("ERRORS! %o"), err);
        });
    }
}
