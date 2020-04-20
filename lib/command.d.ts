import { Command, flags } from "@oclif/command";
export declare class QACommand extends Command {
    static description: string;
    static flags: {
        verbose: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        debug: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        help: import("@oclif/parser/lib/flags").IBooleanFlag<void>;
        phrases: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        target: flags.IOptionFlag<string>;
        folder: flags.IOptionFlag<string>;
        config: flags.IOptionFlag<string>;
    };
    constructor(argv: [], config: any);
    run(): Promise<void>;
    handle(): Promise<number>;
}
