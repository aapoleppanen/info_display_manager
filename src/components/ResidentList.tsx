import React, { useState } from 'react';
import { Group, Button, TextInput } from '@mantine/core';
import { ResidentInfo } from '../types';

type ResidentListProps = {
  floor: number;
  residents: ResidentInfo[];
  updateResident: (floor: number, resident: ResidentInfo, index: number) => void;
  deleteResident: (floor: number, index: number) => void;
};

const ResidentList: React.FC<ResidentListProps> = ({ floor, residents, updateResident, deleteResident }) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedResident, setEditedResident] = useState<ResidentInfo>({ residentName: '', houseNumber: '' });
  const [errors, setErrors] = useState<{ houseNumber?: string; residentName?: string }>({});

  const validateInputs = () => {
    const newErrors: { houseNumber?: string; residentName?: string } = {};
    if (!editedResident.houseNumber.trim()) {
      newErrors.houseNumber = 'House number cannot be empty';
    }
    if (!editedResident.residentName.trim()) {
      newErrors.residentName = 'Resident name cannot be empty';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const startEdit = (index: number, resident: ResidentInfo) => {
    setEditIndex(index);
    setEditedResident(resident);
  };

  const saveEdit = (index: number) => {
    if (validateInputs()) {
      updateResident(floor, editedResident, index);
      setEditIndex(null);
      setEditedResident({ residentName: '', houseNumber: '' });
    }
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditedResident({ residentName: '', houseNumber: '' });
    setErrors({});
  };

  return (
    <>
      {residents.map((resident, index) => (
        <Group key={index} >
          {editIndex === index ? (
            <>
              <TextInput
                value={editedResident.houseNumber}
                onChange={(e) => setEditedResident({ ...editedResident, houseNumber: e.target.value })}
                placeholder="House Number"
                size="xs"
                error={errors.houseNumber}
              />
              <TextInput
                value={editedResident.residentName}
                onChange={(e) => setEditedResident({ ...editedResident, residentName: e.target.value })}
                placeholder="Resident Name"
                size="xs"
                error={errors.residentName}
              />
              <Button size="xs" onClick={() => saveEdit(index)}>Save</Button>
              <Button size="xs" onClick={cancelEdit}>Cancel</Button>
            </>
          ) : (
            <>
              <span>{`House Number: ${resident.houseNumber}, Resident: ${resident.residentName}`}</span>
              <Button size="xs" onClick={() => startEdit(index, resident)}>Edit</Button>
              <Button size="xs" color="red" onClick={() => deleteResident(floor, index)}>Delete</Button>
            </>
          )}
        </Group>
      ))}
    </>
  );
};

export default ResidentList;
