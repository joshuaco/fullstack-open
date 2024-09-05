import { Entry, Gender, NewPatientEntry } from './types';

const isArray = (array: unknown): array is Array<Entry> => {
  return Array.isArray(array);
};

const isString = (string: unknown): string is string => {
  return typeof string === 'string' || string instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isSSN = (ssn: string): ssn is string => {
  // example ssn: 300179-77A
  return /^\d{6}-\d{2,4}.?$/.test(ssn);
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((value) => value.toString())
    .includes(param);
};

const parseName = (nameFromRequest: unknown): string => {
  if (!isString(nameFromRequest)) {
    throw new Error('Incorrect or missing name');
  }
  return nameFromRequest;
};

const parseDate = (dateFromRequest: unknown): string => {
  if (!isString(dateFromRequest) || !isDate(dateFromRequest)) {
    throw new Error('Incorrect or missing date');
  }
  return dateFromRequest;
};

const parseSSN = (ssnFromRequest: unknown): string => {
  if (!isString(ssnFromRequest) || !isSSN(ssnFromRequest)) {
    throw new Error('Incorrect or missing SSN');
  }
  return ssnFromRequest;
};

const parseGender = (genderFromRequest: unknown): Gender => {
  if (!isString(genderFromRequest) || !isGender(genderFromRequest)) {
    throw new Error('Incorrect or missing gender');
  }
  return genderFromRequest;
};

const parseOccupation = (occupationFromRequest: unknown): string => {
  if (!isString(occupationFromRequest)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupationFromRequest;
};

const parseEntries = (entriesFromRequest: unknown): Array<Entry> => {
  if (!isArray(entriesFromRequest)) {
    throw new Error('Incorrect or missing entries');
  }
  return entriesFromRequest;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Invalid or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object &&
    'entries' in object
  ) {
    const newPatient: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntries(object.entries)
    };
    return newPatient;
  }

  throw new Error('Incorrect data: some fields are missing.');
};

export default toNewPatientEntry;
