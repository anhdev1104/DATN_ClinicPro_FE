import { departmentDetailSchema, departmentSchema, managerSchema } from '@/schema/department.schema';
import yup from '@/utils/locate';

export type Department = yup.InferType<typeof departmentSchema>;
export type Manager = yup.InferType<typeof managerSchema>;
export type DepartmentDetail = yup.InferType<typeof departmentDetailSchema>;
