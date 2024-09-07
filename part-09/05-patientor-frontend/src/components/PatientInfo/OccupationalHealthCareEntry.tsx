import { OccupationalHealthcareEntry } from '../../types';

interface OccupationalHealthCareEntryProps {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthCareEntry = ({
  entry
}: OccupationalHealthCareEntryProps) => {
  return (
    <>
      <p>
        <b>{entry.employerName}</b>
      </p>
      {entry.sickLeave && <p>Sick Leave: {entry.sickLeave.endDate}</p>}
    </>
  );
};

export default OccupationalHealthCareEntry;
