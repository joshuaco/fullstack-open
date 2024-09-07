import {
  HealthCheckEntry as HealthCheck,
  HealthCheckRating
} from '../../types';
import { Favorite } from '@mui/icons-material';

interface HealthCheckEntryProps {
  entry: HealthCheck;
}

const HealthCheckEntry = ({ entry }: HealthCheckEntryProps) => {
  const healthIconStyle = () => {
    if (entry.healthCheckRating === HealthCheckRating.Healthy) {
      return { color: '#00b300' };
    }
    if (entry.healthCheckRating === HealthCheckRating.LowRisk) {
      return { color: '#ff6d75' };
    }
    if (entry.healthCheckRating === HealthCheckRating.HighRisk) {
      return { color: '#ff3d47' };
    }
    return { color: '#ff3d47' };
  };

  return (
    <>
      <Favorite style={healthIconStyle()} />
    </>
  );
};

export default HealthCheckEntry;
