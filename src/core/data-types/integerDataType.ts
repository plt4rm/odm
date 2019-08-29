import DataType from "./dataType.interface";

export default class IntegerDataType implements DataType {

    config: any;

    constructor(config: any = {}) {
        this.config = config;
    }

    transform() {
        return {
            "type": "integer"
        };
    }

    format(value: number) {
        return value;
    }


}