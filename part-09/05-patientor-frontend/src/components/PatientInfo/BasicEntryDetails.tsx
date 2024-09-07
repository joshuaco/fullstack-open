/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Diagnosis, Entry } from '../../types';
import diagnosesService from '../../services/diagnoses';
import EntryDetails from './EntryDetails';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MonitorHeart from '@mui/icons-material/MonitorHeart';
import Work from '@mui/icons-material/Work';

interface BasicEntryDetailsProps {
  entry: Entry;
}

const BasicEntryDetails = ({ entry }: BasicEntryDetailsProps) => {
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);

  useEffect(() => {
    if (entry.diagnosisCodes) {
      diagnosesService.getAll().then(setDiagnosis);
    }
  }, []);

  const diagnosisInfo = diagnosis.filter((d) =>
    entry.diagnosisCodes?.includes(d.code)
  );

  const containerStyle = {
    border: '1px solid black',
    padding: '0 12px',
    borderRadius: '4px',
    marginBottom: '12px'
  };

  const typeIcon = () => {
    if (entry.type === 'Hospital') {
      return <LocalHospitalIcon />;
    }
    if (entry.type === 'HealthCheck') {
      return <MonitorHeart />;
    }
    if (entry.type === 'OccupationalHealthcare') {
      return <Work />;
    }
  };

  return (
    <div style={containerStyle}>
      <div>
        <p>
          <b style={{ display: 'flex', alignItems: 'center' }}>
            {entry.date} {typeIcon()}
          </b>
        </p>
        <p>
          <em>{entry.description}</em>
        </p>
        <p>diagnosed by {entry.specialist}</p>
      </div>

      <ul>
        {diagnosisInfo.map((diagnosis) => (
          <li key={diagnosis.code}>
            {diagnosis.code} {diagnosis.name}
          </li>
        ))}
      </ul>

      <EntryDetails entry={entry} />
    </div>
  );
};

export default BasicEntryDetails;
