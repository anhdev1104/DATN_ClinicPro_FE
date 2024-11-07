import {
  departmentDetailSchema,
  departmentSchema,
  managerSchema,
  newDepartmentSchema,
  newDepartmentSchemaResponse,
  updateDepartmentSchema,
} from '@/schema/department.schema';
import yup from '@/utils/locate';

export type Department = yup.InferType<typeof departmentSchema>;
export type Manager = yup.InferType<typeof managerSchema>;
export type DepartmentDetail = yup.InferType<typeof departmentDetailSchema>;
export type NewDepartmentProps = yup.InferType<typeof newDepartmentSchema>;
export type NewDepartmentResponseProps = yup.InferType<typeof newDepartmentSchemaResponse>;
export type UpdateDepartmentResponseProps = yup.InferType<typeof updateDepartmentSchema>;
