import { ApartmentConfig } from "../../types";
import PreviewClasses from "./Preview.module.css";

type Props = {
  config: ApartmentConfig;
};

const Preview = ({ config }: Props) => {
  return (
    <div className={PreviewClasses.container} >
      {
        Object.entries(config).map(([floor, residentInfo]) => (
          <div className={PreviewClasses.floorContainer}>
          <div>{floor}</div>
          {
            residentInfo.map(({ residentName, houseNumber }) => (
              <div className={PreviewClasses.residentInfo}>
                <div>{houseNumber}</div>
                <div>{residentName}</div>
              </div>
            ))
          }
          </div>
        ))
      }
    </div>
  );
}

export default Preview;
