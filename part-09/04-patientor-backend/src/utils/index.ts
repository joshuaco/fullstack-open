import { Entry, Gender } from '../types';

export const isArray = (array: unknown): array is Array<Entry> => {
  return Array.isArray(array);
};

export const isString = (string: unknown): string is string => {
  return typeof string === 'string' || string instanceof String;
};

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const isSSN = (ssn: string): ssn is string => {
  // example ssn: 300179-77A
  return /^\d{6}-\d{2,4}.?$/.test(ssn);
};

export const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((value) => value.toString())
    .includes(param);
};

export const parseName = (nameFromRequest: unknown): string => {
  if (!isString(nameFromRequest)) {
    throw new Error('Incorrect or missing name');
  }
  return nameFromRequest;
};

export const parseDate = (dateFromRequest: unknown): string => {
  if (!isString(dateFromRequest) || !isDate(dateFromRequest)) {
    throw new Error('Incorrect or missing date');
  }
  return dateFromRequest;
};

export const parseSSN = (ssnFromRequest: unknown): string => {
  if (!isString(ssnFromRequest) || !isSSN(ssnFromRequest)) {
    throw new Error('Incorrect or missing SSN');
  }
  return ssnFromRequest;
};

export const parseGender = (genderFromRequest: unknown): Gender => {
  if (!isString(genderFromRequest) || !isGender(genderFromRequest)) {
    throw new Error('Incorrect or missing gender');
  }
  return genderFromRequest;
};

export const parseOccupation = (occupationFromRequest: unknown): string => {
  if (!isString(occupationFromRequest)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupationFromRequest;
};

export const parseEntries = (entriesFromRequest: unknown): Array<Entry> => {
  if (!isArray(entriesFromRequest)) {
    throw new Error('Incorrect or missing entries');
  }
  return entriesFromRequest;
};
