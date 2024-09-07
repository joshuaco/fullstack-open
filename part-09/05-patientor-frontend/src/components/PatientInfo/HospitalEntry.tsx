import { HospitalEntry as Hospital } from '../../types';

interface HospitalEntryProps {
  entry: Hospital;
}

const HospitalEntry = ({ entry }: HospitalEntryProps) => {
  return (
    <>
      <p>date of discharge: {entry.discharge.date}</p>
      <p>
        <em>{entry.discharge.criteria}</em>
      </p>
    </>
  );
};

export default HospitalEntry;
