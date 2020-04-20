import { Command, flags } from "@oclif/command";
import { QA } from "./qa";
import { ResultSet, Converters  } from "qa-engine";
import chalk from "chalk";
import * as _ from "lodash";
// let debug = require("debug")("qa:cli");

export class QACommand extends Command {
    static description = "Execute test cases";

    static flags = {
        // add --version flag to show CLI version
        verbose: flags.boolean({ char: "v", description: "verbose mode" }),
        debug: flags.boolean({ char: "d", description: "debug - show steps" }),
        help: flags.help({ char: "h" }),
        phrases: flags.boolean({ char: "p", description: "show known phrases" }),
        target: flags.string({ char: "t", description: "use a target from options.targets" }),
        folder: flags.string({ char: "f", description: "file/folder containing features" }),
        config: flags.string({ char: "c", description: "config file" })
    };

    constructor(argv:[], config: any){
        super(argv, config);
    }

    async run() {
        try {
            this.handle().then( ()=>{
//            console.error("FAILED: %j", e);
            }).catch( (_err) =>{
//            console.error("FAILED: %j", e);
            });
        } catch(e) {
//            console.error("FAILED: %j", e);
        }
    }

    handle():Promise<number> {

        const { args, flags } = this.parse(QACommand);

        args && true;
        let qa = new QA();
        let options: any = {};

        let folder = flags.folder || "./features";

        // load scope from config file
        if (flags.phrases) {
            _.each(qa.engine.getDocs(), doc => {
                console.log( chalk.blueBright("%s"),doc.description)
                doc.phrases.forEach(phrase => {
                    if (phrase.indexOf("\n")>0) phrase = phrase.replace("\n", "\n\t...")+"\n"
                    console.log( chalk.gray("\t%s"), phrase )
                });
        })
            // qa.engine.getDocs().forEach( doc => {
            //     // doc.phrases.forEach(phrase => {
            //     //     console.log( chalk.green("%s"), phrase)
            //     // });
            // })
            return Promise.reject(0);
        }
        
        // load scope from config file
        if (flags.config) {
            Converters.json_or_yaml (flags.config, (_err, json) => {
                options = json;
            });
        }

        // emit progress
        if (flags.verbose) {
            qa.engine.bus.on("feature", (e) => {
                console.log( chalk.yellow("Feature: %s"), e.feature.title)
            });
            qa.engine.bus.on("scenario", (e) => {
                console.log( chalk.yellow("Scenario: %s (%s steps)"), e.scenario.title, e.scenario.steps.length)
            });
        }

        if (flags.debug) {
            qa.engine.bus.on("step", (e) => {
                console.log( chalk.white("step: %s"), e.step)
            });
        }

        qa.engine.bus.on("step:fail", (e) => {
            console.log( chalk.red("step:fail: %s"), e.step)
        });

        if (flags.target) {
            options.targets = options.targets || {};
            options.target = options.targets[flags.target];
        }

        // configuration for tests
        let scope = qa.engine.scope(options);

        return new Promise( (resolve, reject) => {
            // execute test cases
            qa.engine.read(scope, folder).then((_results: ResultSet) => {
                flags.debug && console.log("---".repeat(10));
                flags.verbose && console.log( chalk.bold.green("completed: %o / %o"), _results.total - _results.fails, _results.total);
    //            process.exit(_results.fails);
                resolve(0);
            }).catch((err: any) => {
                console.log( chalk.red("failed %o"), err);
    //            process.exit(1);
                reject(1);
            });

        })
    }
}
