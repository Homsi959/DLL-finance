import { UseFormReturn } from 'react-hook-form';
import { Address } from 'schema/serverTypes';
import { CounterpartyFormValues } from '../types';

export type FieldsControlProps = {
  control: UseFormReturn<CounterpartyFormValues>['control'];
  setValue?: UseFormReturn<CounterpartyFormValues>['setValue'];
};

export const emptyAddress: Address = {
  country: '',
  zipCode: '',
  kladrCode: '',
  regionCode: '',
  regionName: '',
  regionValue: '',
  settlementName: '',
  settlementValue: '',
  districtName: '',
  districtValue: '',
  cityName: '',
  cityValue: '',
  streetName: '',
  streetValue: '',
  houseName: '',
  houseValue: '',
  flatName: '',
  flatValue: '',
  bulkName: '',
  bulkValue: '',
  comment: '',
};

export const isEmpty = (address?: Address) => {
  return address === undefined || equals(address, emptyAddress);
};

export const equals = (left: Address, right: Address) => {
  return (
    left.kladrCode === right.kladrCode &&
    left.country === right.country &&
    left.zipCode === right.zipCode &&
    left.regionCode === right.regionCode &&
    left.regionName === right.regionName &&
    left.regionNameFull === right.regionNameFull &&
    left.regionValue === right.regionValue &&
    left.settlementName === right.settlementName &&
    left.settlementNameFull === right.settlementNameFull &&
    left.settlementValue === right.settlementValue &&
    left.districtName === right.districtName &&
    left.districtNameFull === right.districtNameFull &&
    left.districtValue === right.districtValue &&
    left.cityName === right.cityName &&
    left.cityNameFull === right.cityNameFull &&
    left.cityValue === right.cityValue &&
    left.streetName === right.streetName &&
    left.streetNameFull === right.streetNameFull &&
    left.streetValue === right.streetValue &&
    left.houseName === right.houseName &&
    left.houseNameFull === right.houseNameFull &&
    left.houseValue === right.houseValue &&
    left.blockName === right.blockName &&
    left.blockNameFull === right.blockNameFull &&
    left.blockValue === right.blockValue &&
    left.flatName === right.flatName &&
    left.flatNameFull === right.flatNameFull &&
    left.flatValue === right.flatValue &&
    left.bulkName === right.bulkName &&
    left.bulkNameFull === right.bulkNameFull &&
    left.bulkValue === right.bulkValue &&
    left.value === right.value &&
    left.comment === right.comment
  );
};
