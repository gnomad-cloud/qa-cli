import { Command, flags } from "@oclif/command";
import { QA } from "./qa";
import { ResultSet, Converters  } from "qa-engine";

export class QACommand extends Command {
    static description = "Execute test cases";

    static flags = {
        // add --version flag to show CLI version
        version: flags.version({ char: "v" }),
        help: flags.help({ char: "h" }),
        // flag with a value (-n, --name=VALUE)
        folder: flags.string({ char: "f", description: "file/folder containing features" }),
        config: flags.string({ char: "c", description: "config file" })
    };

    async run() {
        const { args, flags } = this.parse(QACommand);

        args && true;
        let qa = new QA();
        let options = {};

        let folder = flags.folder;
        if (flags.config) {
            Converters.json_or_yaml (flags.config, (_err, json) => {
                options = json;
            });
        }

        qa.engine.bus.on("feature", (e) => {
            console.log("feature: %s", e.feature.title)
        });
        qa.engine.bus.on("scenario", (e) => {
            console.log("scenario: %s -> %o", e.scenario.title, e.scenario.annotations)
        });
        qa.engine.bus.on("step", (e) => {
            console.log("step: %s", e.step)
        });

        let scope = qa.engine.scope(options);
        qa.engine.read(scope, folder)
            .then((_results: ResultSet) => {
                console.log("success: %o / %o", _results.total - _results.fails, _results.total);
            })
            .catch((err: any) => {
                console.log("FAILED! %o", err);
            });
    }
}
