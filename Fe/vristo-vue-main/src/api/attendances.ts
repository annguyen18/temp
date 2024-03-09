import DefaultService, { StatusResponse } from '@/api/defaultAxios';

interface FetchStudentsResponse extends StatusResponse {
  data: {
    id: string;
    fullName: string;
  }[];
}

interface FetchTeachersResponse extends StatusResponse {
  data: {
    id: string;
    salary: number;
    user: {
      authorities: unknown[],
      dateOfBirth: string;
      email: string;
      fullName: string;
      id: string;
      phoneNumber?: string;
      sex: boolean;
      status: number;
      username?: string;
    }
  }[];
}

interface CreateStudentPayloadType {
  fullName: string;
  dateOfBirth: string;
  phoneNumber: string;
  joinDate: string;
  parentName: string;
  parentPhoneNumber: string;
}

interface CreateStudentResponseType extends StatusResponse {
  data: CreateStudentPayloadType;
}

interface SaveAttendancePayloadType {
  id: {
    id: string;
    date: string;
  };
  present: boolean;
  teacherId: string | null;
}

export const getStudents = () => new Promise<FetchStudentsResponse>((resolve, reject) => {
  DefaultService.get('/admin/students/names-and-ids')
    .then((res: FetchStudentsResponse | PromiseLike<FetchStudentsResponse>) => resolve(res))
    .catch((error: { response: { data: any; }; }) => reject(error.response.data));
});

export const getTeachers = () => new Promise<FetchTeachersResponse>((resolve, reject) => {
  DefaultService.get('/admin/teachers')
    .then((res: FetchTeachersResponse | PromiseLike<FetchTeachersResponse>) => resolve(res))
    .catch((error: { response: { data: any; }; }) => reject(error.response.data));
});

export const createStudent = (payload: CreateStudentPayloadType) => new Promise<CreateStudentResponseType>((resolve, reject) => {
  DefaultService.post('/admin/students', payload)
    .then((res: CreateStudentResponseType) => resolve(res))
    .catch((error: { response: { data: any; }; }) => reject(error.response.data));
});

export const saveAttendances = (payload: SaveAttendancePayloadType[]) => new Promise<unknown>((resolve, reject) => {
  DefaultService.post('/admin/attendances', payload)
    .then((res: unknown) => resolve(res))
    .catch((error: { response: { data: any; }; }) => reject(error.response.data));
});