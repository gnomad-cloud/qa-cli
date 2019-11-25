import { Command, flags } from "@oclif/command";
export declare class QACommand extends Command {
    static description: string;
    static flags: {
        version: import("@oclif/parser/lib/flags").IBooleanFlag<void>;
        help: import("@oclif/parser/lib/flags").IBooleanFlag<void>;
        folder: flags.IOptionFlag<string>;
    };
    run(): Promise<void>;
}
