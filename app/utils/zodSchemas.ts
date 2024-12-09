import { z } from "zod";

export const onboardingSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  address: z.string().min(2, "Address is required"),
});

export const invoiceSchema = z.object({
  invoiceName: z.string().min(1, "Invoice Name is required"),
  total: z.number().min(1, "1$ is minimum"),

  status: z.enum(["PAID", "PENDING"]).default("PENDING"),

  date: z.string().min(1, "Date is required"),

  dueDate: z.number().min(0, "Due Date is required"),

  fromName: z.string().min(1, "Your name is required"),

  fromEmail: z.string().email("Invalid Email address"),

  fromAddress: z.string().min(1, "Your address is required"),

  clientName: z.string().min(1, "Client name is required"),

  clientEmail: z.string().email("Invalid Email address"),

  clientAddress: z.string().min(1, "Client address is required"),

  currency: z.string().min(1, "Currency is required"),

  invoiceNumber: z.number().min(1, "Minimum invoice number of 1"),

  note: z.string().optional(),

  invoiceItemDescription: z.string().min(1, "Description is required"),

  invoiceItemQuantity: z.number().min(1, "Qunatity min 1"),

  invoiceItemRate: z.number().min(1, "Rate min 1"),
});


export const partnerSchema = z.object({
  applicantName: z.string().min(1, "Applicant Name is required"),
  fatherName: z.string().min(1, "Father's Name is required"),
  fatherMobile: z.number().min(1, "Father's Mobile is required"),
  motherName: z.string().min(1, "Mother's Name is required"),
  motherMobile: z.number().min(1, "Mother's Mobile is required"),
  dob: z.string().min(1, "Date of Birth is required"),
  gender: z.string().min(1, "Gender is required"),
  maritalStatus: z.string().min(1, "Marital Status is required"),
  
  // Validating uploads for images and PDFs
  panUpload: z.string().min(1, "PAN Upload is required").refine(value => /\.(jpg|jpeg|png|pdf)$/i.test(value), {
    message: "PAN Upload must be an image (jpg, jpeg, png) or a PDF",
  }),
  educationUpload: z.string().min(1, "Education Upload is required").refine(value => /\.(pdf)$/i.test(value), {
    message: "Education Upload must be an PDF",
  }),
  photoUpload: z.string().min(1, "Photo Upload is required").refine(value => /\.(jpg|jpeg|png)$/i.test(value), {
    message: "Photo Upload must be an image (jpg, jpeg, png)",
  }),
  
  address: z.string().min(1, "Address is required"),
  address1: z.string().min(1, "Address Line 1 is required"),
  city: z.string().min(1, "City is required"),
  pinCode: z.number().min(1, "Pin Code is required"),
  state: z.string().min(1, "State is required"),
  mobile: z.number().min(1, "Mobile is required"),
  email: z.string().email("Invalid Email address"),
  
  bankName: z.string().min(1, "Bank Name is required"),
  accountNo: z.number().min(1, "Account Number is required"),
  ifsc: z.string().min(1, "IFSC Code is required"),
  accountType: z.string().min(1, "Account Type is required"),
  
  bankUpload: z.string().min(1, "Bank Upload is required").refine(value => /\.(jpg|jpeg|png|pdf)$/i.test(value), {
    message: "Bank Upload must be an image (jpg, jpeg, png) or a PDF",
  }),
  aadharUpload: z.string().min(1, "Aadhar Upload is required").refine(value => /\.(jpg|jpeg|png|pdf)$/i.test(value), {
    message: "Aadhar Upload must be an image (jpg, jpeg, png) or a PDF",
  }),
  chequeUpload: z.string().min(1, "Cheque Upload is required").refine(value => /\.(jpg|jpeg|png|pdf)$/i.test(value), {
    message: "Cheque Upload must be an image (jpg, jpeg, png) or a PDF",
  }),
  
  education: z.string().min(1, "Education is required"),
  workSpace: z.string().min(1, "Workspace is required"),
  active: z.string().min(1, "Active status is required"),
  socialMedia: z.string().min(1, "Social Media is required"),
  connectivity: z.string().min(1, "Connectivity is required"),
  
  table: z.string().min(1, "Table is required"),
  chair: z.string().min(1, "Chair is required"),
  printer: z.string().min(1, "Printer is required"),
  waterDispenser: z.string().min(1, "Water Dispenser is required"),
  refrigerator: z.string().min(1, "Refrigerator is required"),
  employee: z.string().min(1, "Employee is required"),
  cabinets: z.string().min(1, "Cabinets are required"),
  officeSize: z.string().min(1, "Office Size is required"),
  officeType: z.string().min(1, "Office Type is required"),
  consent: z.string().min(1, "Consent is required"),
});