const calculateBMI = (weight: number, height: number): string => {
  const heightInMeters = height * 0.01;
  const bmi = weight / (heightInMeters * heightInMeters);

  if (bmi < 16) {
    return 'Underweight (Severe Thinness)';
  }
  if (bmi >= 16 && bmi < 18.5) {
    return 'Underweight (Moderate Thinness)';
  }
  if (bmi >= 18.5 && bmi < 25) {
    return 'Normal (Healthy Weight)';
  }
  if (bmi >= 25 && bmi < 30) {
    return 'Overweight (Moderate Obesity)';
  }
  if (bmi >= 30 && bmi < 35) {
    return 'Overweight (Severe Obesity)';
  }
  if (bmi >= 35) {
    return 'Obese (Very Severe Obesity)';
  }
};

console.log(calculateBMI(95, 180));
