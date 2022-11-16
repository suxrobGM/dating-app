import {EnumType} from '@shared/types';

export class EnumUtils {
  static getEnumValues(enumType: Record<string, string | number>): EnumType[] {
    const enumValues: EnumType[] = [];
    const enumKeys = Object.keys(enumType);
    const enumLength = enumKeys.length/2;

    for (let i = enumLength; i < enumKeys.length; i++) {
      const key = enumKeys[i];
      enumValues.push({
        value: enumType[key],
        displayName: key,
      });
    }

    return enumValues;
  }
}
