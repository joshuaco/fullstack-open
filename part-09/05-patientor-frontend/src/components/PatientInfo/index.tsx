import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Gender, Patient } from '../../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import patientService from '../../services/patients';
import BasicEntryDetails from './BasicEntryDetails';

const PatientInfo = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    if (id) {
      patientService.findById(id).then(setPatient);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!patient) {
    return <div>Loading...</div>;
  }

  const hasEntries = patient.entries.length > 0;

  return (
    <div>
      <h2>
        {patient.name}
        {patient.gender === Gender.Male ? <MaleIcon /> : <FemaleIcon />}
      </h2>

      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>

      {hasEntries ? (
        patient.entries.map((entry) => (
          <BasicEntryDetails entry={entry} key={entry.id} />
        ))
      ) : (
        <h3>No entries</h3>
      )}
    </div>
  );
};

export default PatientInfo;
