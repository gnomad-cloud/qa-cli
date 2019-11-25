import { Command, flags } from "@oclif/command";
export declare class QACommand extends Command {
    static description: string;
    static flags: {
        verbose: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        debug: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        help: import("@oclif/parser/lib/flags").IBooleanFlag<void>;
        target: flags.IOptionFlag<string>;
        folder: flags.IOptionFlag<string>;
        config: flags.IOptionFlag<string>;
    };
    run(): Promise<void>;
}
