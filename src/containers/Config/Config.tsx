import { useState } from "react";
import { Box, Divider } from "@mantine/core";
import { ApartmentConfig, ResidentInfo } from "../../types";
import ResidentForm from "../../components/ResidentForm";
import ResidentList from "../../components/ResidentList";
import DeleteModal from "../../components/DeleteModal";

type Props = {
  config: ApartmentConfig;
  setConfig: React.Dispatch<React.SetStateAction<ApartmentConfig>>;
};

const Config = ({ config, setConfig }: Props) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState<{
    floor: number;
    index: number;
  } | null>(null);

  const handleAddOrUpdateResident = (
    floor: number,
    resident: ResidentInfo,
    index?: number
  ) => {
    setConfig((prevConfig) => {
      const updatedResidents = prevConfig[floor] ? [...prevConfig[floor]] : [];
      if (typeof index === "number") {
        updatedResidents[index] = resident;
      } else {
        updatedResidents.push(resident);
      }
      return { ...prevConfig, [floor]: updatedResidents };
    });
  };

  const handleDelete = () => {
    if (deleteInfo) {
      const { floor, index } = deleteInfo;
      setConfig((prevConfig) => ({
        ...prevConfig,
        [floor]: prevConfig[floor].filter((_, idx) => idx !== index),
      }));
      setDeleteModalOpen(false);
    }
  };

  return (
    <Box p={5}>
      <ResidentForm addResident={handleAddOrUpdateResident} />

      {Object.keys(config)
        .sort()
        .map((floorString) => {
          const floor = parseInt(floorString, 10);
          return (
            <Box key={floor} my={10} p={5}>
              <ResidentList
                floor={floor}
                residents={config[floor]}
                updateResident={handleAddOrUpdateResident}
                deleteResident={(floor, index) => {
                  setDeleteInfo({ floor, index });
                  setDeleteModalOpen(true);
                }}
              />
              <Divider />
            </Box>
          );
        })}

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onDeleteConfirm={handleDelete}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </Box>
  );
};

export default Config;
