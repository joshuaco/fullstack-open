import { NewPatientEntry } from '../types';
import {
  parseDate,
  parseEntries,
  parseGender,
  parseName,
  parseOccupation,
  parseSSN
} from '.';

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
