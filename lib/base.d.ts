import { CommonBuilderInterface, KeyMultiValueList } from "./interfaces";
export declare abstract class CommonBuilderBase<InputType> implements CommonBuilderInterface<InputType> {
    build(items: InputType): string[];
    abstract buildKeyList(items: InputType): KeyMultiValueList;
    protected buildPair(key: string, value: string): string;
    protected addPairToResult(key: string, value: string, result: KeyMultiValueList): void;
}
