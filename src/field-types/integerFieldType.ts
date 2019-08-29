import DataType from "../core/data-types/dataType.interface";
import FieldType from "./fieldType.interface";
import IntegerDataType from "../core/data-types/integerDataType";

export default class IntegerFieldType implements FieldType {

    getDataType(fieldDefinition: any): DataType {
        return new IntegerDataType();
    }

    getType(): string {
        return "integer"
    }

    validateDefinition(fieldDefinition: any): boolean {
        return !!fieldDefinition.name
    }
}