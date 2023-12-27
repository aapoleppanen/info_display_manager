import React, { useState } from 'react';
import { Button, TextInput, NumberInput, Box, Flex } from '@mantine/core';
import { ResidentInfo } from '../types';

type ResidentFormProps = {
  addResident: (floor: number, resident: ResidentInfo) => void;
};

const ResidentForm: React.FC<ResidentFormProps> = ({ addResident }) => {
  const [resident, setResident] = useState<ResidentInfo>({ residentName: '', houseNumber: '' });
  const [floor, setFloor] = useState<number>(1);
  const [errors, setErrors] = useState<{ floor?: string; houseNumber?: string; residentName?: string }>({});

  const validateInputs = () => {
    const newErrors: { floor?: string; houseNumber?: string; residentName?: string } = {};
    if (!floor || floor < 1) {
      newErrors.floor = 'Please enter a valid floor number';
    }
    if (!resident.houseNumber.trim()) {
      newErrors.houseNumber = 'House number cannot be empty';
    }
    if (!resident.residentName.trim()) {
      newErrors.residentName = 'Resident name cannot be empty';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      addResident(floor, resident);
      setResident({ residentName: '', houseNumber: '' }); // Clear the form on successful submission
    }
  };

  return (
    <Flex justify="flex-start" align="flex-start" gap="md">
      <Box w={75}>
      <NumberInput
        label="Kerros"
        placeholder="Kerros"
        value={floor}
        onChange={(value) => setFloor(Number(value))}
        min={1}
        error={errors.floor}
        allowDecimal={false}
      />
      </Box>
      <TextInput
        label="House Number"
        placeholder="House Number"
        value={resident.houseNumber}
        onChange={(e) => setResident({ ...resident, houseNumber: e.target.value })}
        error={errors.houseNumber}
      />
      <TextInput
        label="Resident Name"
        placeholder="Resident Name"
        value={resident.residentName}
        onChange={(e) => setResident({ ...resident, residentName: e.target.value })}
        error={errors.residentName}
      />
      <Button onClick={handleSubmit} mt={24}>
        Add
      </Button>
    </Flex >
  );
};

export default ResidentForm;
