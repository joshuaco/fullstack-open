import patients from '../data/patients';
import { v4 as uuidv4 } from 'uuid';
import { NewPatientEntry, Patient, PatientWithoutSSN } from '../types';

const getPatients = (): PatientWithoutSSN[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (patientEntry: NewPatientEntry): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patientEntry
  };

  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, addPatient };
