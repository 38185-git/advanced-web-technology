export interface components {
  schemas: {
    Course: {
      id: string;
      title: string;
      description: string;
      credits: number;
      isElective: boolean;
      likes: number;
    };
    Enrollment: {
      courseId: string;
      studentName: string;
      id: number;
    };
    EnrollmentIn: {
      courseId: string;
      studentName: string;
    };
  };
}
