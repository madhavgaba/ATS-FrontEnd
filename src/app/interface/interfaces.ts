export interface ICategory {
  category: String;
  designation: Array<string>;
}

export interface IDesignation {}

export interface Iinterviewer {
  email: string;
  password: string;
  category: string;
  designation: string;
}

export interface IJobs {
  jobId: Number;
  category: String;
  designation: String;
  description: String;
  blockJobIDs: Number[];
  lastDate: String;
  paySalary: Number;
  location: String;
  bondDetail: String;
  experienceRequired: { year: Number; month: Number };
  skillsRequired: [{ skillName: String; skillLevel: String }];
  isComplete: Boolean;
  _id: string;
}

export interface candidateSignUp {
  name: String;
  email: String;
  password: String;
  phoneNumber: Number;
  experience: Number;
  education: {
    degree: String;
    college: String;
    completionDate: String;
  };
  previousEmployee: String;
  resume: String;
  video: String;
}

export interface login {
  user: {
    email: String;
    password: String;
    role: String;
  };
  token: string;
}

export interface IApplyJob {
  candidateId: Number;
  jobId: Number;
  success: boolean;
  message: String;
}

export interface Icandidate {
  email: String;
}

export interface applicantData {
  candidateId: String;
  interviewerId: String;
  status: String;
  candidateName: String;
  candidateEmail: String;
}

export interface ISchedule {
  candidateId: String;
  date: Date;
  interviewerId: String;
  jobId: String;
  remarks: String;
}

export interface JobId {
  jobId: String;
}

export interface InterviewerId {
  email: String;
}

export interface loginInterface {
  token: String;
  user: { email: String; password: string; _id: string; role: string };
}

export class appliedInfo {
  constructor(
    public candidateId: string,
    public jobId: string,
    public status: string
  ) {}
}

export interface userInfo {
  _id: string;
  name: string;
  email: string;
}

export interface otpData {
  userId: string;
  role: string;
  type: string;
  valueOtp: string;
  timestamp: Date;
}

export class genOtp {
  constructor(
    public userId: string,
    public role: string,
    public type: string
  ) {}
}

export interface editProfile {
  name: string;
  phoneNumber: number;
  email: string;
  password: string;
  education: {
    degree: string;
    completionDate: Date;
    college: string;
  };
  previousEmployee: string;
  experience: number;
  cgpa: string;
  resume: string;
  video: string;
  residence: {
    address: string;
    pincode: number;
    landmark: string;
  };
}

export interface application {
  _id: string;
  candidateId: { _id: string; name: string; email: string };
  jobId: { _id: string; category: string; designation: string };
  status: string;
}
