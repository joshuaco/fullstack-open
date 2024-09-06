import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Gender, Patient } from '../../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import patientService from '../../services/patients';

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

  return (
    <div>
      <h2>
        {patient.name}
        {patient.gender === Gender.Male ? <MaleIcon /> : <FemaleIcon />}
      </h2>

      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>

      <div>
        {patient.entries.length > 0 ? <h3>Entries</h3> : <h3>No entries</h3>}

        {patient.entries.map((entry) => (
          <div key={entry.id}>
            <p>
              {entry.date} {entry.description}
            </p>
            <ul>
              {entry.diagnosisCodes?.map((diagnosis, index) => (
                <li key={index}>{diagnosis}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientInfo;
