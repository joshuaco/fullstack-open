import { Entry } from '../../types';
import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthCareEntry from './OccupationalHealthCareEntry';

interface EntryDetailsProps {
  entry: Entry;
}

const EntryDetails = ({ entry }: EntryDetailsProps) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntry entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckEntry entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthCareEntry entry={entry} />;
    default:
      const neverEntry: never = entry;
      return neverEntry;
  }
};

export default EntryDetails;
