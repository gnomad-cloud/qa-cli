import { Command, flags } from "@oclif/command";
import { QA } from "./qa";
import { ResultSet, StepError } from "qa-engine";

export class QACommand extends Command {
    static description = "Execute test cases";

    static flags = {
        // add --version flag to show CLI version
        version: flags.version({ char: "v" }),
        help: flags.help({ char: "h" }),
        // flag with a value (-n, --name=VALUE)
        folder: flags.string({ char: "f", description: "file/folder to run" })
    };

    async run() {
        const { args, flags } = this.parse(QACommand);

        let qa = new QA();
        let options = {};

        let scope = qa.engine.scope(options);

        let folder = args.folder;

        console.log("ARGS: %o", args);
        console.log("FLAGS: %o", flags);

        qa.engine
            .read(scope, folder)
            .then((_results: ResultSet) => {
                console.log("success");
            })
            .catch((err: any) => {
                console.log("FAILED! %o", err instanceof StepError);
            });
    }
}
