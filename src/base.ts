
import { CommonBuilderInterface, KeyMultiValueList } from "./interfaces";


export abstract class CommonBuilderBase<InputType> implements CommonBuilderInterface<InputType>
{
    /**
     * build URL style key-value pairs from list of items
     * the values of the key-value pairs cannot be NULL or UNDEFINED. There is no way to encode
     * those values without not to be ambigous with empty string or string with content
     * NULL or UNDEFINED.
     *
     * Example 1: `foo=undefined` - Is original value `{foo: undefined}` or `{foo: 'undefined'}`?
     * Example 2: `foo=` - Is original value `{foo: undefined}`, `{foo: null}` or {foo: ''}?
     *
     * Cases in examples have to be done by some custom features (e.g. special filter for NULL
     * and/or UNDEFINED values).
     *
     * @param  {InputType} items set of items to be built
     * @return {string[]}        built items
     */
    build(items: InputType): string[]
    {
        const result: string[] = [];
        const keyList = this.buildKeyList(items);

        for (const key in keyList)
        {
            keyList[key].forEach(value => result.push(this.buildPair(key, value)));
        }

        return result;
    }

    /**
     * build key-multivalue list of items
     * @param  {QueryFilter}       query query definition
     * @return {KeyMultiValueList}       built items
     */
    abstract buildKeyList(items: InputType): KeyMultiValueList;

    /**
     * build URL like key-value pair
     * @param  {string} key   key
     * @param  {string} value value
     * @return {string}       key-value pair
     */
    protected buildPair(key: string, value: string): string
    {
        return [encodeURIComponent(key), encodeURIComponent(value)].join("=");
    }
}
