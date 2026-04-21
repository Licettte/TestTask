import {DriverRecordBase} from "entities/driver-record/model/driver-record.base";

export type DriverRecord = DriverRecordBase & {
  id: string;
};
