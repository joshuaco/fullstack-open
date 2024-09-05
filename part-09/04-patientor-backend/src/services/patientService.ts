import patients from '../data/patients';
import { v4 as uuidv4 } from 'uuid';
import { NewPatientEntry, Patient, NonSensitivePatient } from '../types';

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const findByID = (id: string): Patient => {
  const patient = patients.find((p) => p.id === id);

  if (patient) return patient;
  throw new Error("Patient doesn't exists");
};

const addPatient = (patientEntry: NewPatientEntry): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patientEntry
  };

  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, findByID, addPatient };
